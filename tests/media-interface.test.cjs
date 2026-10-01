const test=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');const path=require('node:path');const {parseHTML}=require('linkedom');const root=path.join(__dirname,'..');
test('Music shortcuts preserve native buttons, navigation, forms and modifier shortcuts',()=>{
 const source=fs.readFileSync(path.join(root,'muzyka/muzyka.html'),'utf8');const {document}=parseHTML(source);
 const start=source.indexOf("document.addEventListener('keydown'",source.indexOf('setVolume(state.volume * 100);'));
 const end=source.indexOf('\n                });',start)+19;
 let handler,plays=0,next=0,changes=0;
 vm.runInNewContext(source.slice(start,end),{document:{addEventListener(_type,fn){handler=fn;}},state:{volume:.5,currentIndex:-1},togglePlay(){plays++;},nextTrack(){next++;},prevTrack(){},setVolume(){changes++;},toggleShuffle(){},toggleRepeat(){},toggleFavorite(){}});
 const input=document.createElement('textarea');document.body.append(input);
 const editable=document.createElement('div');editable.setAttribute('contenteditable','true');const child=document.createElement('span');editable.append(child);document.body.append(editable);
 for(const target of [document.getElementById('theme-toggle'),document.querySelector('.site-links a'),document.querySelector('button'),input,child])for(const code of ['Space','ArrowRight','ArrowUp'])handler({code,target,preventDefault(){assert.fail('must preserve native key');}});
 for(const key of ['repeat','ctrlKey','metaKey','altKey'])handler({code:'Space',target:document.body,[key]:true,preventDefault(){assert.fail('must preserve modified key');}});
 assert.equal(plays,0);assert.equal(next,0);assert.equal(changes,0);
 handler({code:'Space',target:document.body,preventDefault(){}});handler({code:'ArrowRight',target:document.body,preventDefault(){}});assert.equal(plays,1);assert.equal(next,1);
});
test('Film collection cards retain readable titles when remote posters fail, and use encoded URLs',()=>{
 const source=fs.readFileSync(path.join(root,'filmy/filmy glowna.html'),'utf8');const {document,Event}=parseHTML(source);
 const window={movieCollectionsData:{'Żółty film':[{image:'https://example.com/cover.jpg'}],Other:[{}]},movieCollectionsMeta:{'Żółty film':{title:'Żółty film'},Other:{title:'Drugi'}}};
 const context=vm.createContext({document,window,encodeURIComponent});for(const script of document.querySelectorAll('script:not([src])'))vm.runInContext(script.textContent,context);
 const cards=document.querySelectorAll('.movie-card');assert.equal(cards.length,2);assert.equal(cards[0].getAttribute('href'),'movies.html?series=%C5%BB%C3%B3%C5%82ty%20film');
 cards[0].querySelector('img').remove();assert.equal(cards[0].querySelector('.poster-fallback').textContent,'Żółty film');assert.equal(cards[1].querySelector('.poster-fallback').textContent,'Drugi');
 const input=document.getElementById('search');input.value='drugi';input.dispatchEvent(new Event('input'));assert.equal(document.querySelectorAll('.movie-card').length,1);
});
