// Runs the real shared game layer (assets/gry-kit/gry-kit.js) inside a vm context built by a test.
// Missing browser globals get inert stand-ins; the context gets the GryKit global like a page would.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../../assets/gry-kit/gry-kit.js'), 'utf8');
const computed = () => ({ position: 'static', display: 'block', zoom: '1', paddingLeft: '0', paddingRight: '0', paddingBottom: '0',
  marginTop: '0', marginBottom: '0', fontFamily: 'Inter, sans-serif', getPropertyValue: () => '' });
const matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
function installGryKit(context) {
  const win = context.window || (context.window = {});
  const defaults = { parent: win, innerWidth: 800, innerHeight: 800, scrollY: 0, devicePixelRatio: 1, matchMedia,
    getComputedStyle: computed, addEventListener() {}, removeEventListener() {}, scrollTo() {} };
  for (const [key, value] of Object.entries(defaults)) if (!(key in win)) win[key] = value;
  for (const key of ['getComputedStyle', 'matchMedia']) if (!(key in context)) context[key] = win[key];
  if (!('requestAnimationFrame' in context)) context.requestAnimationFrame = () => 0;
  if (!('setTimeout' in context)) context.setTimeout = () => 0;
  vm.runInContext(source, context);
  context.GryKit = win.GryKit;
  return context.GryKit;
}
module.exports = { installGryKit };
