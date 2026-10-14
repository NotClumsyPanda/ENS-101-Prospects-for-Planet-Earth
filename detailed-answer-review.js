(function(){
'use strict';
const priorStart=start,priorRender=render,priorPick=pick,priorNext=next,priorPrev=previousQuestion,priorSetMode=setMode,priorSubmitQuiz=submitQuiz;
let checked=new Set();
const btn=document.getElementById('submitQuestion');
const optionsFor=(q)=>q.options;
const correctConcepts=new Map();
BANK.forEach(q=>{const key=q.options[q.answer].trim().toLowerCase();if(!correctConcepts.has(key))correctConcepts.set(key,[]);correctConcepts.get(key).push(q)});
function el(tag,text,cls){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n}
function explanationFor(q,i){
 if(i===q.answer)return q.explanation;
 const label=q.options[i],other=correctConcepts.get(label.trim().toLowerCase());
 const relevant=other&&other.find(x=>x.id!==q.id&&x.lecture===q.lecture);
 if(relevant){
   return 'This choice describes a different concept: '+relevant.explanation+' For this question, '+q.explanation;
 }
 return 'This choice does not correctly answer the question. '+q.explanation+' The key distinction is that the correct choice, “'+q.options[q.answer]+'”, fits the process or outcome described in the question, while “'+label+'” does not.';
}
function reviewCard(q,selected,number){
 const card=el('section',undefined,'pp-card pp-deep-review');
 if(number!==undefined)card.append(el('h3','Question '+number+' · Lecture '+q.lecture+': '+q.q));
 const status=el('h3',selected===undefined?'○ Unanswered':selected===q.answer?'✓ Correct':'✗ Incorrect');
 status.style.color=selected===q.answer?'#16794c':'#ad493e';card.append(status);
 if(selected!==undefined)card.append(el('p','Your answer: '+q.options[selected]));
 card.append(el('p','Correct answer: '+q.options[q.answer]));
 card.append(el('h4','Why this is correct'),el('p',q.explanation));
 if(selected!==undefined&&selected!==q.answer){card.append(el('h4','Why your answer is incorrect'),el('p',explanationFor(q,selected)))}
 const details=document.createElement('details');details.className='pp-answer-analysis';
 details.append(el('summary','Review all four answer choices'));
 q.options.forEach((option,i)=>{const row=el('div',undefined,'pp-choice-analysis');row.append(el('strong',String.fromCharCode(65+i)+'. '+option+' '+(i===q.answer?'✓':'')));row.append(el('p',explanationFor(q,i)));details.append(row)});
 card.append(details);
 const focus=el('p','Study connection: '+(q.topic||'Lecture '+q.lecture)+'. Focus on the causal mechanism, its consequences, and how this concept differs from the other options.');
 card.append(focus);
 if(q.sourceUrl){const a=el('a','Further reading: '+(q.sourceTitle||'Science reference'));a.href=q.sourceUrl;a.target='_blank';a.rel='noopener noreferrer';card.append(a)}
 return card;
}
function updateControls(){
 const q=session[index],done=q&&checked.has(q.id);
 btn.classList.toggle('hide',mode!=='practice'||done);
 btn.disabled=chosen===null;
 $('next').classList.toggle('hide',mode==='practice'&&!done);
 $('hint').textContent=mode==='practice'?(done?'Review the explanation, then click Next question.':'Choose an answer, then click Submit question to reveal feedback.'):'Your answers and explanations stay hidden until you submit the full exam.';
 if(mode==='practice'&&done){
  const area=$('explain');area.replaceChildren(reviewCard(q,answers[q.id]));area.classList.remove('hide');
  [...$('options').children].forEach((b,i)=>{b.disabled=true;b.style.background=i===q.answer?'#e5f6ed':i===answers[q.id]?'#ffede9':'white';b.style.borderColor=i===q.answer?'#55aa7c':i===answers[q.id]?'#d67b6f':'#dfe5e3'});
 }else{$('explain').replaceChildren();$('explain').classList.add('hide')}
}
btn.onclick=()=>{if(mode!=='practice'||chosen===null||checked.has(session[index].id))return;checked.add(session[index].id);updateControls()};
pick=function(i){if(mode==='practice'&&checked.has(session[index].id))return;priorPick(i);updateControls()};
render=function(){priorRender();updateControls()};
next=function(){if(mode==='practice'&&!checked.has(session[index].id)){ $('hint').textContent='Click Submit question before continuing.';return}priorNext()};
previousQuestion=function(){priorPrev();updateControls()};
start=function(missed){checked=new Set();priorStart(missed);updateControls()};
setMode=function(m){priorSetMode(m);if(m==='practice')checked=new Set();$('modeHelp').textContent=m==='practice'?'Select an answer, click Submit question, review correct and incorrect reasoning, then click Next.':'No answers are revealed during the exam. Submit Quiz to see your score and every question reviewed.';updateControls()};
submitQuiz=function(){
 priorSubmitQuiz();
 const controls=document.getElementById('pp-review-actions');if(!controls)return;
 controls.replaceChildren();
 controls.append(el('h3',mode==='exam'?'Exam summary and detailed answer review':'Practice summary and detailed answer review'));
 const correct=session.filter(q=>answers[q.id]===q.answer).length;
 const missed=session.length-correct;
 controls.append(el('p','Correct: '+correct+' | Incorrect or unanswered: '+missed+' | Accuracy: '+Math.round(100*correct/session.length)+'%'));
 controls.append(makeButton('Start new quiz',()=>start(false)),makeButton('Retry missed questions',()=>start(true)));
 session.forEach((q,i)=>controls.append(reviewCard(q,answers[q.id],i+1)));
};
updateControls();
})();