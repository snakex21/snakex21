const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { parseHTML } = require('linkedom');
const root = path.join(__dirname, '../..');
function loadGame(file, options = {}) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  const { document, Event, HTMLElement } = parseHTML(source);
  const draws = [], frames = new Map(), timers = new Map(), storage = new Map(Object.entries(options.storage || {})), events = {};
  let next = 1, now = 0;
  const context2d = canvas => new Proxy({canvas}, {get(target,key) {
    if (key in target) return target[key];
    if (/^create.*Gradient$/.test(key)) return () => ({addColorStop(){}});
    if (key === 'measureText') return s => ({width:String(s).length * 8});
    return (...args) => draws.push([key,...args]);
  }, set(target,key,value){target[key]=value;return true;}});
  const prepare = element => {
    if (element.tagName === 'CANVAS') { element.width = Number(element.getAttribute('width') || 300); element.height = Number(element.getAttribute('height') || 150); element.getContext = () => element.ctx ||= context2d(element); element.toDataURL = () => 'data:image/png;base64,'; }
    element.getBoundingClientRect = () => ({left:0,top:0,width:options.width || 400,height:options.height || 400,bottom:options.height || 400,right:options.width || 400});
    element.focus = () => { document.activeElement=element; };
    element.scrollIntoView = () => {};
    element.setPointerCapture = () => {};
    element.animate = () => ({onfinish:null,cancel(){}});
    return element;
  };
  for (const el of document.querySelectorAll('*')) prepare(el);
  const create = document.createElement.bind(document);
  document.createElement = (...args) => prepare(create(...args));
  const requestAnimationFrame = cb => {const id=next++;frames.set(id,cb);return id;};
  const timer = repeat => (cb,delay=0) => { const id=next++;timers.set(id,{cb,delay,repeat});return id; };
  const window = {innerWidth:options.width || 800,innerHeight:options.height || 800,document,performance:{now:()=>now},requestAnimationFrame,addEventListener(type,cb){(events[type] ||= []).push(cb);},getComputedStyle:()=>({})};
  const context = vm.createContext({document,window,console,Event,HTMLElement,Image:class{},navigator:{userAgent:'Test',vendor:''},performance:window.performance,
    location:{search:'',href:'https://example.test/'+file},URLSearchParams,
    alert(){},confirm:()=>true,
    Math:Object.assign(Object.create(Math),{random:options.random || (()=>0.5)}),
    localStorage:{getItem(key){if(options.blockStorage)throw Error('blocked');return storage.get(key)??null;},setItem(key,value){if(options.blockStorage)throw Error('blocked');storage.set(key,String(value));},removeItem(key){if(options.blockStorage)throw Error('blocked');storage.delete(key);}},
    requestAnimationFrame,cancelAnimationFrame:id=>frames.delete(id),setInterval:timer(true),setTimeout:timer(false),clearInterval:id=>timers.delete(id),clearTimeout:id=>timers.delete(id)
  });
  Object.assign(window,{setTimeout:context.setTimeout,clearTimeout:context.clearTimeout,setInterval:context.setInterval,clearInterval:context.clearInterval});
  const run = js => vm.runInContext(js,context,{timeout:2000});
  for(const node of document.querySelectorAll('script')) {
    const src=node.getAttribute('src');
    if(src) { if(!src.startsWith('../../') && !/^https?:/.test(src))run(fs.readFileSync(path.resolve(root,path.dirname(file),src),'utf8')); }
    else if(node.textContent.trim())run(node.textContent);
  }
  if (options.onload && window.onload) window.onload();
  return {document,Event,context,run,frames,timers,storage,draws,events,
    frame(time){now=time;const callbacks=[...frames.values()];frames.clear();for(const cb of callbacks)cb(time);},
    tick(delay){for(const[id,t]of[...timers])if(t.delay===delay&&timers.has(id)){if(!t.repeat)timers.delete(id);t.cb();}},
    fire(type,props={},target=document){const e=new Event(type,{bubbles:true,cancelable:true});for(const[k,v]of Object.entries(props))Object.defineProperty(e,k,{value:v});target.dispatchEvent(e);return e;},
    windowEvent(type,event={}){for(const cb of events[type]||[])cb(event);}
  };
}
module.exports={loadGame};
