(function(){
'use strict';
const panel=document.createElement('aside');
panel.id='pp-reader';panel.setAttribute('aria-label','Article reading panel');panel.setAttribute('aria-hidden','true');
panel.innerHTML='<div class="pp-reader-header"><div><strong id="pp-reader-title">Article reader</strong><p>Read alongside your quiz</p></div><button type="button" id="pp-reader-close" aria-label="Close article panel">✕</button></div><div class="pp-reader-actions"><a id="pp-reader-external" target="_blank" rel="noopener noreferrer">↗ Open full article in new tab</a></div><div class="pp-reader-notice">Some publishers prevent articles from appearing inside other websites. If the page stays blank or shows an error, use “Open full article in new tab” above.</div><iframe id="pp-reader-frame" title="Study article" loading="lazy" referrerpolicy="no-referrer"></iframe>';
document.body.append(panel);
const frame=panel.querySelector('#pp-reader-frame'),external=panel.querySelector('#pp-reader-external'),title=panel.querySelector('#pp-reader-title');
function openReader(url,label){
 let parsed;try{parsed=new URL(url,location.href)}catch{return}
 if(!['https:','http:'].includes(parsed.protocol))return;
 external.href=parsed.href;title.textContent=label||parsed.hostname;
 frame.src=parsed.href;document.body.classList.add('pp-reader-open');
 panel.setAttribute('aria-hidden','false');
}
function closeReader(){document.body.classList.remove('pp-reader-open');panel.setAttribute('aria-hidden','true');frame.src='about:blank'}
panel.querySelector('#pp-reader-close').addEventListener('click',closeReader);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('pp-reader-open'))closeReader()});
document.addEventListener('click',e=>{
 const a=e.target.closest&&e.target.closest('a[href]');if(!a||panel.contains(a)||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;
 if(!a.closest('#quiz,#finish,#pp-bookmarks'))return;
 const url=a.getAttribute('href');if(!/^https?:\/\//i.test(url))return;
 e.preventDefault();openReader(url,a.textContent.trim().replace(/^(Explore:|Further reading:|Read more:)\s*/i,''));
});
})();