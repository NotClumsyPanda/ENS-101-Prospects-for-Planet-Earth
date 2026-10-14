(function(){
'use strict';
const lessons=[
{title:'Introduction to Earth System Science',focus:'Earth systems interact through exchanges of matter and energy.',terms:['geosphere','hydrosphere','atmosphere','biosphere','cryosphere','biogeochemical cycles','feedback'],questions:['How can a change in one sphere affect two others?','What makes a feedback reinforcing or stabilizing?'],video:'NASA Earth system science explained'},
{title:'Earth System Sciences I',focus:'Earth materials, living systems, and physical processes are connected.',terms:['rock cycle','weathering','ecosystems','carbon cycle'],questions:['How does weathering connect rocks, water, and life?','What happens when a natural material cycle is disrupted?'],video:'USGS rock cycle weathering Earth science'},
{title:'Earth System Sciences II',focus:'Water moves between reservoirs and transports energy and materials.',terms:['water cycle','runoff','infiltration','groundwater','watersheds'],questions:['What changes when infiltration decreases?','How can land use affect downstream water quality?'],video:'NASA water cycle Earth science'},
{title:'Earth System Sciences III',focus:'Atmospheric circulation and exchanges shape conditions at Earth’s surface.',terms:['atmosphere','convection','pressure','radiation','circulation'],questions:['What drives large-scale atmospheric movement?','How are weather and climate different?'],video:'NOAA atmospheric circulation explained'},
{title:'Introduction to Climate Change',focus:'Climate is shaped by energy balance, natural variability, and human influence.',terms:['climate','weather','energy balance','albedo','feedback'],questions:['Why does a change in albedo affect temperature?','How can you distinguish a climate trend from weather variability?'],video:'NASA climate change evidence explained'},
{title:'Greenhouse Gases and Radiative Forcing',focus:'Greenhouse gases alter Earth’s outgoing infrared energy and its energy balance.',terms:['greenhouse effect','radiative forcing','carbon dioxide','methane','infrared radiation'],questions:['How do greenhouse gases influence outgoing infrared radiation?','Why do different greenhouse gases have different effects?'],video:'NASA greenhouse effect radiative forcing explained'},
{title:'Ocean and Cryosphere',focus:'Oceans store and transport heat; snow and ice interact with climate through energy and water exchanges.',terms:['ocean heat','sea ice','glaciers','thermal expansion','ocean acidification'],questions:['Why can warming oceans affect sea level?','How does declining ice cover change surface energy absorption?'],video:'NOAA ocean warming cryosphere climate'},
{title:'Climate Change: Past and Future',focus:'Past climate evidence and physical models help scientists investigate future climate scenarios.',terms:['climate proxies','ice cores','paleoclimate','climate models','scenarios'],questions:['How do ice cores provide evidence of past climate?','What can climate models tell us, and what are their limits?'],video:'NASA paleoclimate ice cores climate models'},
{title:'Climate Adaptation and Mitigation',focus:'Mitigation reduces causes of climate change; adaptation reduces vulnerability to its impacts.',terms:['mitigation','adaptation','resilience','emissions','risk'],questions:['How is reducing emissions different from preparing for floods?','Which actions can provide both adaptation and mitigation benefits?'],video:'NASA climate adaptation mitigation explained'}
];
const lectureOneVocabulary=[
['Geosphere','The solid Earth, including rocks, minerals, soil, landforms, and Earth’s interior.','Weathering of rock releases minerals into soil and water.'],
['Hydrosphere','All of Earth’s water in liquid, solid, and gaseous forms, including oceans, rivers, groundwater, ice, and water vapor.','Rain moves water from the atmosphere to rivers and groundwater.'],
['Atmosphere','The layer of gases surrounding Earth, where weather occurs and gases and energy are exchanged.','Plants absorb atmospheric carbon dioxide during photosynthesis.'],
['Biosphere','All living organisms and the regions of Earth where life exists, including ecosystems on land and in water.','Plant roots take up water and nutrients from soil.'],
['Cryosphere','The frozen part of Earth’s water system, including snow, glaciers, ice sheets, sea ice, and permafrost.','Melting glaciers transfer stored frozen water into rivers and oceans.'],
['Biogeochemical cycles','The movement and transformation of elements and compounds, such as carbon, nitrogen, phosphorus, and water, through living organisms and Earth’s physical systems.','Carbon moves from atmospheric CO₂ into plants, then to animals, soils, water, and back to the air.']
];
const sphereConnections=[
'Atmosphere ↔ Hydrosphere: evaporation adds water vapor to air; precipitation returns water to Earth’s surface.',
'Hydrosphere ↔ Geosphere: flowing water weathers rock, transports sediment, and infiltrates soil and rock.',
'Geosphere ↔ Biosphere: soil supplies minerals and habitat; organisms build soil and accelerate weathering.',
'Biosphere ↔ Atmosphere: photosynthesis takes up CO₂, while respiration and decomposition return CO₂.',
'Cryosphere ↔ Hydrosphere: freezing stores water as ice; melting releases water to streams and oceans.',
'Cryosphere ↔ Atmosphere: snow and ice reflect sunlight; changes in ice cover influence Earth’s energy balance.'
];
const section=document.createElement('section');section.id='pp-learning';section.className='pp-learning';section.innerHTML='<div class="pp-learning-head"><div><span class="pill">LEARNING STUDIO</span><h2>Lecture review & study lab</h2><p>Review key concepts, retrieve information from memory, watch topic videos, and revisit difficult lectures.</p></div><button class="outline" id="pp-learning-toggle" type="button">Open learning studio</button></div><div id="pp-learning-body" hidden><div class="pp-learning-toolbar"><label for="pp-learning-lecture">Review lecture</label><select id="pp-learning-lecture"></select><button class="outline" id="pp-learning-quiz" type="button">Practice this lecture →</button></div><p class="muted">Independent topic-based review, not a transcript or substitute for the original professor slides. Video buttons open YouTube search results, not a verified single video.</p><div id="pp-learning-content"></div></div>';
const layout=document.querySelector('.layout');layout.append(section);
const toggle=section.querySelector('#pp-learning-toggle'),body=section.querySelector('#pp-learning-body'),select=section.querySelector('#pp-learning-lecture'),content=section.querySelector('#pp-learning-content');
lessons.forEach((l,i)=>{const o=document.createElement('option');o.value=String(i);o.textContent='Lecture '+(i+1)+' · '+l.title;select.append(o)});
function el(tag,txt,cls){const x=document.createElement(tag);if(txt!==undefined)x.textContent=txt;if(cls)x.className=cls;return x}
function saved(){try{return JSON.parse(localStorage.getItem('pp_review_schedule')||'{}')}catch{return {}}}
function render(){
 const i=Number(select.value),l=lessons[i],schedule=saved(),record=schedule[i]||{level:0,next:0};
 content.replaceChildren();
 const intro=el('article',undefined,'pp-study-card');intro.append(el('h3','Core idea'),el('p',l.focus));content.append(intro);
 const grid=el('div',undefined,'pp-study-grid');const vocab=el('article',undefined,'pp-study-card');vocab.append(el('h3','Key terms to explain from memory'));
 l.terms.forEach(t=>{const p=el('p','• '+t);vocab.append(p)});grid.append(vocab);
 const retrieval=el('article',undefined,'pp-study-card');retrieval.append(el('h3','Active recall prompts'),el('p','Try answering out loud or on paper before revealing any notes.'));
 l.questions.forEach((q,j)=>{const details=el('details');details.append(el('summary',q),el('p','Use your lecture notes and the relevant quiz explanations to build an evidence-based answer. Explain the cause, the mechanism, and the consequence in your own words.'));retrieval.append(details)});
 grid.append(retrieval);content.append(grid);
 if(i===0){
  const glossary=el('article',undefined,'pp-study-card pp-glossary');
  glossary.append(el('h3','Lecture 1 vocabulary & definitions'),el('p','Study the meaning of each term and a real example of how it connects to another Earth system.'));
  lectureOneVocabulary.forEach(([term,definition,example])=>{
   const item=el('details');item.append(el('summary',term));
   item.append(el('p',definition),el('p','Example: '+example));glossary.append(item);
  });
  content.append(glossary);
  const interactions=el('article',undefined,'pp-study-card');
  interactions.append(el('h3','How Earth’s spheres interact'),el('p','Matter and energy move between Earth’s spheres. These connections mean a change in one system can affect the others.'));
  sphereConnections.forEach(x=>interactions.append(el('p','• '+x)));
  interactions.append(el('h3','Biogeochemical cycles and the biosphere'),el('p','Living organisms are active participants in nutrient cycles. Plants take up carbon and nutrients, animals transfer matter through food webs, and microbes return nutrients to soil, water, and air through decomposition. Carbon, nitrogen, and phosphorus are cycled between living and nonliving reservoirs.'));
  content.append(interactions);
 }
 const media=el('article',undefined,'pp-study-card');media.append(el('h3','Watch & connect'),el('p','Find a video on this lecture topic, pause halfway, and explain the process without looking.'));
 const link=el('a','▶ Search topic videos: '+l.video);link.href='https://www.youtube.com/results?search_query='+encodeURIComponent(l.video);link.target='_blank';link.rel='noopener noreferrer';link.className='pp-video-link';media.append(link);content.append(media);
 const method=el('article',undefined,'pp-study-card');method.append(el('h3','Study strategy: retrieve → explain → revisit'),el('p','1. Read the core idea for 1 minute. 2. Close the notes and answer both prompts from memory. 3. Check your lecture slides and quiz explanations. 4. Write a 2–3 sentence explanation of anything you missed. 5. Review again after a delay.'));
 const next=record.next?new Date(record.next).toLocaleDateString():'Not scheduled';method.append(el('p','Next scheduled review: '+next));
 const easy=el('button','I can explain it','outline'),hard=el('button','I need another review','outline');easy.type=hard.type='button';
 function scheduleReview(confident){const all=saved(),prev=all[i]||{level:0};const level=confident?Math.min(4,prev.level+1):0;const days=confident?[1,3,7,14,30][level]:1;all[i]={level,next:Date.now()+days*86400000};localStorage.setItem('pp_review_schedule',JSON.stringify(all));render()}
 easy.onclick=()=>scheduleReview(true);hard.onclick=()=>scheduleReview(false);const actions=el('div',undefined,'pp-review-buttons');actions.append(easy,hard);method.append(actions);content.append(method);
 const related=BANK.filter(q=>q.lecture===i+1);const practice=el('article',undefined,'pp-study-card');practice.append(el('h3','Connect to quiz practice'),el('p',related.length+' questions available for this lecture. Practice after reviewing to test what you remember.'));content.append(practice);
}
select.addEventListener('change',render);
toggle.onclick=()=>{body.hidden=!body.hidden;toggle.textContent=body.hidden?'Open learning studio':'Close learning studio';if(!body.hidden)render()};
section.querySelector('#pp-learning-quiz').onclick=()=>{$('lecture').value=String(Number(select.value)+1);start(false);document.getElementById('quiz').scrollIntoView({behavior:'smooth',block:'start'})};
render();
})();