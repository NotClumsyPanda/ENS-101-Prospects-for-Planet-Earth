(function(){
let practiceLocked=false;
const baseStart=start,baseRender=render,basePick=pick,baseNext=next,baseMode=setMode,basePrevious=previousQuestion;
const button=document.createElement('button');button.type='button';button.className='primary';button.id='submitQuestion';button.textContent='Submit question';button.onclick=()=>{
 if(mode!=='practice'||practiceLocked||chosen===null)return;
 practiceLocked=true;
 const q=session[index];const correct=chosen===q.answer;
 const feedback=$('explain');feedback.replaceChildren();
 const card=document.createElement('div');card.className='pp-card';
 const heading=document.createElement('h3');heading.textContent=correct?'✓ Correct!':'✗ Not quite';
 heading.style.color=correct?'#14794e':'#b94b3d';
 const answer=document.createElement('p');answer.textContent='Correct answer: '+q.options[q.answer];
 const explanation=document.createElement('p');explanation.textContent=q.explanation;
 const context=document.createElement('p');context.textContent='Study focus: '+(q.topic||'Lecture '+q.lecture)+'. Consider what causes this process, its consequences, and how it connects to other Earth systems.';
 const article=document.createElement('a');article.href=q.sourceUrl;article.target='_blank';article.rel='noopener noreferrer';article.textContent='Further reading: '+q.sourceTitle;
 card.append(heading,answer,explanation,context,article);feedback.append(card);feedback.classList.remove('hide');
 [...$('options').children].forEach((b,i)=>{b.disabled=true;b.classList.toggle('correct',i===q.answer);b.style.background=i===q.answer?'#e5f6ed':i===chosen?'#ffede9':'white';b.style.borderColor=i===q.answer?'#55aa7c':i===chosen?'#d67b6f':'#dfe5e3'});
 button.classList.add('hide');$('next').classList.remove('hide');$('next').textContent=index===session.length-1?'Review practice results →':'Next question →';
 $('hint').textContent='Review the answer and explanation, then select Next question.';
};
const bottom=$('next').parentElement;bottom.insertBefore(button,$('next'));
function refresh(){
 button.classList.toggle('hide',mode!=='practice'||practiceLocked);
 button.disabled=chosen===null;
 if(mode==='practice'&&!practiceLocked){$('explain').classList.add('hide');$('next').classList.add('hide');$('hint').textContent='Choose an answer, then click Submit question to check it.'}
 if(mode==='exam'){$('next').classList.remove('hide');$('hint').textContent='Exam answers stay hidden until the final submission.'}
}
pick=function(i){if(mode==='practice'&&practiceLocked)return;basePick(i);if(mode==='practice'){$('explain').classList.add('hide');refresh()}};
render=function(){practiceLocked=false;baseRender();refresh()};
next=function(){if(mode==='practice'&&!practiceLocked){$('hint').textContent='Submit your answer before moving on.';return}baseNext()};
previousQuestion=function(){if(mode==='practice'&&index>0){basePrevious();practiceLocked=answers[session[index].id]!==undefined;if(practiceLocked){$('submitQuestion').classList.add('hide');$('next').classList.remove('hide');$('hint').textContent='This question was already answered. Continue to the next question.';[...$('options').children].forEach(b=>b.disabled=true)}return}basePrevious()};
start=function(missed){practiceLocked=false;baseStart(missed);refresh()};
setMode=function(m){baseMode(m);practiceLocked=false;refresh();$('modeHelp').textContent=m==='practice'?'Select an answer, click Submit question to reveal feedback, then click Next question.':'Move between questions freely; answers and explanations appear in the exam summary after Submit quiz.'};
refresh();
})();