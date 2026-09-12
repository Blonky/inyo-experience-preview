const editor=()=>`<div class="phone expanded profile-editor">${status()}${webBar(17)}<div class="editor-scroll"><h2>A little more you.</h2><p>Change anything. Leave the rest for later.</p><form id="profile-form"><div class="editor-photo"><img src="assets/maya.jpg" alt="Maya’s demo portrait"><div><b id="editor-name">Maya, 22</b><small>Your photo · Your call</small><button type="button" class="change-photo" data-change-photo>Change photo</button><input type="file" id="profile-photo" accept="image/jpeg,image/png,image/webp" hidden></div></div><label>Name<input name="name" value="Maya" required maxlength="35" autocomplete="off"></label><label>City<input name="city" value="New York" maxlength="50" autocomplete="off"></label><label>Looking for<select name="intent"><option>A relationship</option>Still figuring it out</option>Something casual</option></select></label><label>A little about you<textarea name="bio" maxlength="200">Cooking with music on. Long walks that were supposed to be short.</textarea></label><label>What helps you feel close?<textarea name="close" maxlength="160">Real conversation, and room for our own lives.</textarea></label><div class="save-line" aria-live="polite">Only you can edit this card.</div><button class="primary" type="submit">Save changes</button></form></div>${home}</div>`;
const backgroundThread=()=>stamp('Wednesday 8:20 PM')+msg('can we make this chat feel a little calmer',true)+msg('soft blue?')+msg('yes please',true)+`<div class="system-event" data-background-event="ice">Inyo changed the background.</div>`+msg('oh i like this',true)+msg('a little less loud in here :)');
const wallpapers=()=>chat(backgroundThread(),{cls:'wall-demo'});
const quietThread=(effects=false)=>stamp('Friday 9:12 PM')+msg(effects?'okay bring back the occasional confetti 😭':'can we skip the effects from now on?',true)+msg(effects?'hahaha okay. special occasions only':'yes ofc. i’ll keep my replies quieter')+msg('and no calls unless i ask',true)+msg('got it. i’ll wait for you to ask')+msg('thank you. i still want the enthusiasm though',true)+msg('oh you’re still getting a YAYYYY when it’s deserved');
screens.push(
 {title:'Your profile stays yours',note:'One editable card. Try changing the city or bio and saving. Demo state only; nothing goes to a server.',html:editor},
 {title:'An edit doesn’t restart the conversation',note:'The edit returns to Messages with a clear saved state. Your conversation continues where it left off.',html:()=>chat('<div class="profile-chat-context"></div><div class="stamp edit-stamp">Monday 9:46 AM</div>'+msg('can i update what my profile says?',true)+`<div class="cardwrap"><a class="profile-link" data-go="16" href="#screen-16"><div><b>Your Inyo profile</b><small class="link-host">joininyo.com</small></div><div class="link-thumbnail">${brand}</div></a>${attribution()}</div>`+msg('of course :) edit whatever you want')+'<div class="profile-save-return" hidden><div class="profile-receipt">'+receipt().replace('Your play is saved.','Your profile changes are saved.')+'</div>'+msg('got your updates. what else is on your mind?')+'</div>')},
 {title:'A calmer place to talk',note:'A background change appears as a system event. The scene controls live outside the phone.',html:wallpapers},
 {title:'A little surprise, when you ask',note:'Swipe to reveal the invisible-ink message. Playfulness is optional; important information is never hidden.',html:()=>chat(stamp('Thursday 7:03 PM')+msg('give us a question that isn’t “what do you do”',true)+msg('okay. one slightly more interesting question…')+`<div class="row tail"><button class="bubble ink" data-ink aria-label="Reveal playful question" aria-expanded="false"><span>what’s a very ordinary thing that makes you ridiculously happy?</span><i aria-hidden="true">Swipe to reveal</i></button></div>`+msg('this is cute. i’m stealing it',true)+msg('please do :)'))},
 {title:'Your pace. Your kind of Inyo.',note:'Ask for quieter replies in ordinary text. The agent changes its own behavior, not iOS Settings.',html:()=>chat(quietThread())}
);

screens.push(...extras);
const params=new URLSearchParams(location.search),requested=Number(params.get('screen')),overview=params.has('overview');
const order=[1,24,2,3,4,5,6,7,17,16,21,8,9,10,11,12,13,14,25,22,23,18,19,20];
const single=params.has('screen')?(order.includes(requested)?requested:2):0;
const state={current:Math.max(1,Math.min(screens.length,Number(location.hash.match(/screen-(\d+)/)?.[1])||single||1)),effects:true,quietVisited:false,backgroundStage:'changed',applied:'ice',reactionTarget:null,returnFocus:null,inkTimer:null,profile:{name:'Maya',city:'New York'},voice:null};
if(!order.includes(state.current))state.current=2;
const tips={21:'Swipe through the photo stack. Tap a photo to open it, or tap “4 Photos” to see everyone.',22:'Try Fit check, collect a future, or make room for your people. Each session comes back to the conversation.',23:'Choose what fits. Skip anything. Your answers stay with this session.',24:'A detail can be corrected in the conversation. Tap the quoted reply to return to its source.',25:'Follow up on something that matters, then make room for the answer.',1:'Replay the welcome. Double-click or hold a message for tapbacks.',2:'Open the session card.',3:'A private Inyo link opens a small game. Return to Messages when you’re done.',4:'Tap a card or drag it into the scene. Keep two. Change your mind anytime.',5:'Pick the rhythm that fits. Your selection carries forward.',6:'Finish to return to the conversation.',7:'The saved receipt is simple. The conversation carries the meaning.',8:'Hold the profile to open its tapback menu.',9:'Heart the card. The introduction still needs the other person’s yes.',10:'The same care from Leo’s side.',11:'Inyo opens the door, then the two people take over.',12:'Vote for one, a few, or none. Add your own idea with Add Choice.',13:'Tap play for a sample voice. Tap “yes call me” to preview the call handoff.',14:'A remembered detail, not a generic “how did it go?”',16:'Edit a field and save. The confirmation returns to Messages.',17:'Open your profile, make a change, then come back.',18:'A request, a new background, a small notice. Replay to watch it happen.',19:'Swipe across the hidden message. It gently hides again after a moment.',20:'A simple text sets the tone. Inyo stays warm, even when you want less motion.'};
document.body.className=single?'single':overview?'overview':'experience';
const header=`<header class="page-head"><div class="topline">${brand}<span class="internal-label">Internal preview</span><nav aria-label="Presentation view"><button data-mode="experience" aria-pressed="${!overview}">Walkthrough</button><button data-mode="gallery" aria-pressed="${overview}">Overview</button></nav></div><div class="intro-copy"><h1>The Inyo experience.</h1></div></header>`;
const chapters=[[1,'01','A warm arrival'],[3,'02','A little self-discovery'],[17,'03','Your profile, your words'],[21,'04','Meet each other'],[12,'05','A little help along the way'],[22,'06','Keep learning together'],[18,'07','Make it feel like you']];
const rail=`<aside class="journey-rail"><div class="eyebrow" id="active-chapter"></div><h2 id="active-title"></h2><p id="active-tip"></p><p id="selection-summary" hidden aria-live="polite"></p><button class="conversation-play" data-play-conversation>Replay conversation</button><div class="scene-tools" id="background-tools" hidden><span>Show moment</span><div><button data-background-stage="before">Before</button><button data-background-stage="changed" aria-pressed="true">Changed</button><button data-background-stage="removed">Removed</button></div></div><div class="scene-tools" id="effects-tools" hidden><button data-motion-toggle>Show expressive replies</button></div><div class="step-controls"><button data-step="-1" aria-label="Previous scene">←</button><span id="step-count"></span><button data-step="1" aria-label="Next scene">→</button></div><nav class="chapter-list" aria-label="Chapters">${chapters.map(x=>`<button data-go="${x[0]}"><span>${x[1]}</span>${x[2]}</button>`).join('')}</nav></aside>`;
document.querySelector('#app').innerHTML=header+`<div class="experience-layout">${rail}<div class="gallery">`+order.map((n,i)=>{const s=screens[n-1];return single&&single!==n?'':`<article id="screen-${n}" class="${state.current===n?'current':''}"><h2 class="frame-title"><span>${String(i+1).padStart(2,'0')}</span>${s.title}</h2>${s.html()}</article>`}).join('')+'</div></div><div class="sr-only" id="announcement" aria-live="polite"></div>';
function announce(t){document.querySelector('#announcement').textContent=t;}
function dismiss(restore=true,keepAlbum=false){
 clearInterval(state.callTimer);
 const focus=state.returnFocus||state.reactionTarget;
 document.querySelectorAll('.reaction-menu,.reaction-shade,.modal-shade,.attach-menu,.call-preview'+(keepAlbum?'':',.album-dialog')).forEach(x=>x.remove());
 state.reactionTarget?.classList.remove('reacting');state.reactionTarget=null;state.returnFocus=null;
 if(!keepAlbum)document.querySelectorAll('.phone [inert]').forEach(x=>x.inert=false);
 if(restore&&focus?.isConnected)focus.focus({preventScroll:true});
}
function modal(phone,element,trigger){
 dismiss(false);state.returnFocus=trigger||document.activeElement;
 element.setAttribute('role','dialog');element.setAttribute('aria-modal','true');
 [...phone.children].forEach(x=>x.inert=true);if(element.classList.contains('attach-menu')){const shade=document.createElement('button');shade.className='modal-shade';shade.setAttribute('aria-label','Close apps');shade.addEventListener('click',()=>dismiss());phone.append(shade);}phone.append(element);[...element.querySelectorAll('button')].find(b=>b.getClientRects().length)?.focus();
}
function voiceDuration(audio){return '0:'+String(Math.ceil(Number.isFinite(audio.duration)?audio.duration:8)).padStart(2,'0');}
function resetVoice(){
 if(state.voice){state.voice.pause();state.voice.currentTime=0;}state.voice=null;
 document.querySelectorAll('.audio').forEach(x=>{x.classList.remove('playing');const b=x.querySelector('[data-voice]');b.textContent='▶';b.setAttribute('aria-label','Play sample voice note');b.setAttribute('aria-pressed','false');x.querySelector('[data-voice-time]').textContent=voiceDuration(x.querySelector('audio'));});
}
function concealInk(){clearTimeout(state.inkTimer);document.querySelectorAll('[data-ink]').forEach(b=>{b.classList.remove('revealed');b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','Reveal playful question');});}
function revealInk(button){
 concealInk();button.classList.add('revealed');button.setAttribute('aria-expanded','true');button.setAttribute('aria-label','Playful question revealed');
 state.inkTimer=setTimeout(concealInk,6500);
}
function go(n){n=Number(n);if(!order.includes(n))return;cancelPlayback();dismiss(false);resetVoice();concealInk();document.querySelectorAll('.confetti').forEach(x=>x.remove());if(single){location.search='?screen='+n;return;}state.current=n;if(n===17)syncProfileContext();if(n===20&&!state.quietVisited){state.quietVisited=true;setEffects(false);}document.querySelector('#background-tools').hidden=n!==18;document.querySelector('#effects-tools').hidden=n!==20;document.querySelectorAll('.gallery article').forEach(x=>x.classList.toggle('current',x.id==='screen-'+n));document.querySelector('#active-title').textContent=screens[n-1].title;document.querySelector('#active-tip').textContent=tips[n];document.querySelector('#selection-summary').hidden=n!==21;document.querySelector('[data-play-conversation]').hidden=![1,2,7,8,9,10,11,12,13,14,17,18,19,20,24,25].includes(n);syncDeck();document.querySelector('#step-count').textContent=(order.indexOf(n)+1)+' / '+order.length;const position=order.indexOf(n),chapter=chapters.filter(x=>order.indexOf(x[0])<=position).at(-1);document.querySelector('#active-chapter').textContent='Chapter '+chapter[1];document.querySelectorAll('.chapter-list button').forEach(x=>{const active=Number(x.dataset.go)===chapter[0];x.classList.toggle('active',active);if(active)x.setAttribute('aria-current','step');else x.removeAttribute('aria-current');});document.querySelector('[data-step="-1"]').disabled=position===0;document.querySelector('[data-step="1"]').disabled=position===order.length-1;history.replaceState(null,'','#screen-'+n);if(!document.body.classList.contains('experience'))document.querySelector('#screen-'+n).scrollIntoView({behavior:'smooth',block:'center'});requestAnimationFrame(()=>{const thread=document.querySelector('#screen-'+n+' .thread');if(thread){fillHistory(n);thread.scrollTop=thread.scrollHeight;}});announce(screens[n-1].title);}
function react(target){
 if(target.closest('.row.out')){const reaction=target.querySelector('.tapback');if(reaction)announce('Inyo reacted '+reaction.textContent+'. You can only change your own reactions.');return;}
 dismiss(false,!!target.closest('.album-dialog'));state.reactionTarget=target;state.returnFocus=target;target.classList.add('reacting');
 const phone=target.closest('.phone'),r=target.getBoundingClientRect(),pr=phone.getBoundingClientRect(),scale=pr.width/393;
 const old=(target.classList.contains('profile')?target.parentElement.querySelector('.heart'):target.querySelector('.tapback'))?.textContent;
 const shade=document.createElement('button');shade.className='reaction-shade';shade.setAttribute('aria-label','Close reactions');shade.addEventListener('click',()=>dismiss(true,!!state.reactionTarget?.closest('.album-dialog')));phone.append(shade);
 const menu=document.createElement('div');menu.className='reaction-menu';menu.setAttribute('role','dialog');menu.setAttribute('aria-modal','true');menu.setAttribute('aria-label','Choose a tapback');
 menu.style.top=Math.min(710,Math.max(150,(r.top-pr.top)/scale-65))+'px';
 menu.innerHTML=[['♥','Love'],['👍','Like'],['👎','Dislike'],['HA','Laugh'],['!!','Emphasize'],['?','Question']].map(x=>`<button data-reaction="${x[0]}" aria-label="${x[1]}" aria-pressed="${old===x[0]}">${x[0]}</button>`).join('')+`<button class="remove-reaction" data-reaction="remove" aria-label="Remove reaction" ${old?'':'disabled'}>×</button>`;
 phone.append(menu);menu.querySelector('[aria-pressed=true],button').focus();
}
function effect(phone){if(!state.effects||matchMedia('(prefers-reduced-motion: reduce)').matches){announce('Effects are off. The welcome text stays visible.');return;}phone.querySelector('.confetti')?.remove();const layer=document.createElement('div');layer.className='confetti';layer.setAttribute('aria-hidden','true');layer.innerHTML=Array.from({length:55},(_,i)=>`<i style="--x:${i*47%100}%;--delay:${i%11*.055}s;--rot:${i*71}deg;--color:${['#c8ab41','#d58a9a','#93b6b9','#a7bd84','#baa2c8'][i%5]}"></i>`).join('');phone.append(layer);setTimeout(()=>layer.remove(),2600);}
function updateSession(phone){const round=Number(phone.dataset.round),r=rounds[round];r.chosen=[...phone.querySelectorAll('.choice.selected')].map(x=>Number(x.dataset.choice));phone.querySelector('.count').textContent=r.chosen.length+' of '+r.limit+' selected';phone.querySelector('[data-next]').disabled=r.chosen.length!==r.limit;refreshGame(phone);}
const savedSessionPreview=document.querySelector('#screen-7 .thread')?.innerHTML;
function finishSession(){
 const chosen=rounds.flatMap(r=>r.chosen.map(i=>r.options[i][0]));
 const thread=document.querySelector('#screen-7 .thread');
 if(thread){
  const original=rounds.every((r,i)=>JSON.stringify([...r.chosen].sort())===JSON.stringify([[0,3],[2],[2]][i]));
  if(original&&savedSessionPreview)thread.innerHTML=savedSessionPreview;
  if(!original){thread.innerHTML=stamp('Monday 9:45 AM')+receipt()+msg(chosen.length?'you kept a few things that matter to you. which one would you want someone to understand first?':'we can leave those questions open. want to talk about something else?');
   if(chosen.length){const context=document.createElement('div');context.className='session-kept';context.textContent=chosen.join(' · ');thread.querySelector('.cardwrap').after(context);}
  }
 }
 go(7);
}
let pressTimer,pressStart,suppressTapUntil=0;
document.addEventListener('pointerdown',e=>{
 const t=e.target.closest('[data-reactable]');if(!t||e.target.closest('button,a')||e.button!==0)return;
 pressStart={x:e.clientX,y:e.clientY};clearTimeout(pressTimer);
 pressTimer=setTimeout(()=>{suppressTapUntil=performance.now()+550;react(t);},460);
});
document.addEventListener('pointermove',e=>{
 if(pressStart&&Math.hypot(e.clientX-pressStart.x,e.clientY-pressStart.y)>9)clearTimeout(pressTimer);
 if(e.buttons&&e.target.closest('[data-ink]'))revealInk(e.target.closest('[data-ink]'));
});
['pointerup','pointercancel'].forEach(event=>document.addEventListener(event,()=>{clearTimeout(pressTimer);pressStart=null;}));
document.addEventListener('contextmenu',e=>{const t=e.target.closest('[data-reactable]');if(t){e.preventDefault();react(t);}});
document.addEventListener('dblclick',e=>{const t=e.target.closest('[data-reactable]');if(t&&!t.classList.contains('album-card')&&!e.target.closest('button,a')){e.preventDefault();react(t);}});
document.addEventListener('click',e=>{
 if(showcaseClick(e))return;
 const target=e.target,button=target.closest('button,a');
 if(button?.dataset.go){e.preventDefault();if(button.classList.contains('skip')){const p=button.closest('.phone');p.querySelectorAll('.choice.selected').forEach(x=>{x.classList.remove('selected');x.setAttribute('aria-pressed','false')});updateSession(p);if(p.dataset.round==='2'){finishSession();return;}}go(button.dataset.go);return;}
 if(button?.dataset.step){go(order[Math.max(0,Math.min(order.length-1,order.indexOf(state.current)+Number(button.dataset.step)))]);return;}
 if(button?.dataset.mode){document.body.classList.toggle('experience',button.dataset.mode==='experience');document.body.classList.toggle('overview',button.dataset.mode==='gallery');document.querySelectorAll('[data-mode]').forEach(x=>x.setAttribute('aria-pressed',x===button));go(state.current);return;}
 if(button?.dataset.reaction){
  const t=state.reactionTarget;if(!t)return;const isProfile=t.classList.contains('profile');
  const old=isProfile?t.parentElement.querySelector('.heart'):t.querySelector('.tapback');
  const value=button.dataset.reaction,remove=value==='remove'||old?.textContent===value;old?.remove();
  if(!remove){const badge=document.createElement('span');badge.className=isProfile?'heart':'tapback';badge.dataset.value=value;badge.textContent=value;badge.setAttribute('aria-label',button.getAttribute('aria-label')+' reaction');(isProfile?t.parentElement:t).append(badge);}
  if(t.dataset.person){if(remove)delete showcaseState.reactions[t.dataset.person];else showcaseState.reactions[t.dataset.person]=value;if(!remove&&value==='♥'&&people[t.dataset.person])showcaseState.hearts.add(t.dataset.person);else showcaseState.hearts.delete(t.dataset.person);syncDeck();}
  if(t.dataset.profilePerson){const name=t.dataset.profilePerson,article=t.closest('article');
   if(article.id==='screen-9'){const rows=article.querySelectorAll('.thread>.row');rows[1].querySelector('.bubble').textContent=!remove&&value==='♥'?'yeah, i’d like to meet him':'i’ll leave it for now';rows[2].querySelector('.bubble').textContent=!remove&&value==='♥'?'got it. i’ll let you know if it’s mutual':'of course. take your time';}
   if(article.id==='screen-10'){const rows=article.querySelectorAll('.thread>.row');rows[1].querySelector('.bubble').textContent=!remove&&value==='♥'?'yeah i’d like to meet her':'let me think about it';const response=rows[2].querySelector('.bubble');response.textContent='no rush. i’ll wait for your yes';if(!remove&&value==='♥'){const name=document.createElement('span');name.dataset.profileName='';name.textContent=state.profile.name.toLowerCase();response.replaceChildren(name,document.createTextNode('’s interested too. i’ll make the intro'));}}
  }
  if(!isProfile)document.querySelectorAll('.bubble[data-reactable]').forEach(peer=>{if(peer===t||peer.dataset.reactable!==t.dataset.reactable)return;peer.querySelector('.tapback')?.remove();const badge=t.querySelector('.tapback');if(badge)peer.append(badge.cloneNode(true));});
  dismiss(true,!!t.closest('.album-dialog'));announce(remove?'Reaction removed':'Reaction added');return;
 }
 if(button?.classList.contains('choice')){
  const p=button.closest('.phone'),r=rounds[Number(p.dataset.round)],wasSelected=button.classList.contains('selected');
  if(r.limit===1)p.querySelectorAll('.choice.selected').forEach(x=>{x.classList.remove('selected');x.setAttribute('aria-pressed','false');});
  if(wasSelected)button.classList.remove('selected');else if(p.querySelectorAll('.choice.selected').length<r.limit)button.classList.add('selected');else announce('Choose up to '+r.limit+'. Deselect one to change your answer.');
  button.setAttribute('aria-pressed',button.classList.contains('selected'));updateSession(p);return;
 }
 if(button?.dataset.next){if(button.closest('.phone').dataset.round==='2')finishSession();else go(button.dataset.next);return;}
 if(button?.classList.contains('poll-option')){const selected=button.classList.toggle('chosen');button.setAttribute('aria-pressed',selected);button.querySelector('.poll-mark').textContent=selected?'✓':'';button.querySelector('.poll-votes').textContent=selected?'1':'';updatePollReply();return;}
 if(button?.hasAttribute('data-add-choice')){const form=button.nextElementSibling;form.hidden=!form.hidden;if(!form.hidden)form.querySelector('input').focus();return;}
 if(button?.dataset.effect){effect(button.closest('.phone'));return;}
 if(button?.hasAttribute('data-motion-toggle')){setEffects(!state.effects);return;}
 if(button?.hasAttribute('data-ink')){revealInk(button);return;}
 if(button?.dataset.backgroundStage){setBackgroundStage(button.dataset.backgroundStage);return;}
 if(button?.hasAttribute('data-voice')){
  const audio=button.closest('.audio').querySelector('audio');if(state.voice===audio){resetVoice();return;}resetVoice();state.voice=audio;
  button.textContent='Ⅱ';button.setAttribute('aria-label','Stop sample voice note');button.setAttribute('aria-pressed','true');button.closest('.audio').classList.add('playing');
  audio.onended=()=>{if(state.voice===audio)resetVoice();};audio.onerror=()=>{if(state.voice===audio){resetVoice();announce('Couldn’t play the voice note. Try again.');}};
  audio.ontimeupdate=()=>{if(state.voice===audio)button.closest('.audio').querySelector('[data-voice-time]').textContent='0:'+String(Math.ceil(Math.max(0,audio.duration-audio.currentTime))).padStart(2,'0');};
  audio.play().catch(()=>{if(state.voice===audio){resetVoice();announce('Couldn’t play the voice note. Try again.');}});return;
 }
 if(button?.hasAttribute('data-call')){
  const p=button.closest('.phone'),overlay=document.createElement('div');overlay.className='call-preview';overlay.setAttribute('aria-label','Inyo call preview');
  overlay.innerHTML=`${status()}${logo}<h2>Inyo</h2><p>Incoming call</p><div class="call-options" hidden><button data-call-option aria-pressed="false" aria-label="Mute preview">${mic}<span>mute</span></button><button data-call-option aria-pressed="false" aria-label="Speaker preview">${icon('<path d="M3 9h4l5-4v14l-5-4H3zM16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>')}<span>speaker</span></button></div><div class="incoming-actions"><button data-decline-call aria-label="Decline call preview">${icon('<path d="M3 16v-5c5-5 13-5 18 0v5h-5v-4a14 14 0 0 0-8 0v4z"/>')}<span>Decline</span></button><button data-answer-call aria-label="Answer call preview">${icon('<path d="M5 3h4l2 5-3 2a15 15 0 0 0 6 6l2-3 5 2v4c-1 5-8 1-12-3S0 4 5 3Z"/>')}<span>Accept</span></button></div><button class="end-call" hidden data-end-call aria-label="End call preview">${icon('<path d="M3 16v-5c5-5 13-5 18 0v5h-5v-4a14 14 0 0 0-8 0v4z"/>')}</button>${home}`;
  modal(p,overlay,button);return;
 }
 if(button?.hasAttribute('data-decline-call')){dismiss();return;}
 if(button?.hasAttribute('data-answer-call')){const phone=button.closest('.call-preview');phone.querySelector('.incoming-actions').hidden=true;phone.querySelector('.call-options').hidden=false;phone.querySelector('.end-call').hidden=false;phone.querySelector('p').textContent='00:00';state.callStarted=Date.now();state.callTimer=setInterval(()=>{const s=Math.floor((Date.now()-state.callStarted)/1000);phone.querySelector('p').textContent=String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');},1000);phone.querySelector('[data-call-option]').focus();return;}
 if(button?.hasAttribute('data-call-option')){button.setAttribute('aria-pressed',button.getAttribute('aria-pressed')!=='true');return;}
 if(button?.hasAttribute('data-end-call')){dismiss();return;}
 if(performance.now()<suppressTapUntil)return;
});
document.addEventListener('submit',e=>{
 if(e.target.classList.contains('poll-add-form')){e.preventDefault();const form=e.target,input=form.querySelector('input'),label=input.value.trim(),options=form.previousElementSibling.previousElementSibling;if(!label){input.setCustomValidity('Add an idea first.');input.reportValidity();return;}if(options.children.length>=12)return;const item=document.createElement('div');item.innerHTML=pollOption('');item.querySelector('.poll-label').textContent=label;options.append(item.firstElementChild);form.reset();form.hidden=true;form.previousElementSibling.disabled=options.children.length>=12;form.previousElementSibling.focus();announce('Choice added. Tap it to vote.');return;}
 if(e.target.id!=='profile-form')return;e.preventDefault();const form=e.target,save=form.querySelector('[type=submit]');if(save.disabled)return;
 const values=Object.fromEntries(new FormData(form));values.name=values.name.trim();values.city=values.city.trim();
 if(!values.name){form.elements.name.setCustomValidity('Add the name you want to share.');form.elements.name.reportValidity();return;}
 const previousPhoto=state.profilePhoto;state.profile=values;state.profilePhoto=showcaseState.photo||state.profilePhoto;
 if(state.profilePhoto)document.querySelectorAll('img').forEach(img=>{if(img.getAttribute('src')==='assets/maya.jpg'||img.dataset.editedPhoto){img.src=state.profilePhoto;img.dataset.editedPhoto='true';}});
 if(previousPhoto&&previousPhoto!==state.profilePhoto)URL.revokeObjectURL(previousPhoto);
 document.querySelector('#editor-name').textContent=values.name+', 22';
 document.querySelectorAll('[data-profile-person="Maya"]').forEach(card=>{card.querySelector('.profile-meta b').textContent=values.name+', 22';card.querySelector('.profile-meta>span').textContent=values.city;card.querySelector('.profile-bio').textContent=values.bio;card.querySelector('.profile-meta small').textContent=values.intent==='A relationship'?'Looking for a relationship':values.intent;});
 document.querySelectorAll('[data-profile-name]').forEach(x=>x.textContent=values.name.toLowerCase());
 const group=document.querySelector('#screen-11 .contact');if(group){group.textContent=values.name+', Leo & Inyo ';const chevron=document.createElement('span');chevron.className='chevron';chevron.textContent='›';group.append(chevron);}
 form.querySelector('.save-line').textContent='Changes saved.';const result=document.querySelector('.profile-save-return');if(result)result.hidden=false;
 go(17);announce('Profile changes saved');
});
document.addEventListener('input',e=>{if(e.target.name==='name'||e.target.closest('.poll-add-form'))e.target.setCustomValidity('');});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){dismiss(true,!!state.reactionTarget?.closest('.album-dialog'));return;}const menu=document.querySelector('.reaction-menu,.attach-menu,.call-preview,.album-dialog');if(menu&&e.key==='Tab'){const items=[...menu.querySelectorAll('button:not(:disabled)')].filter(b=>b.getClientRects().length),i=items.indexOf(document.activeElement);e.preventDefault();items[(i+(e.shiftKey?-1:1)+items.length)%items.length].focus();return;}if(e.target.closest('input,textarea,select'))return;if((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-reactable]')){e.preventDefault();react(e.target);return;}if(!single&&!menu&&!e.target.closest('.phone button')&&['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();const d=e.key==='ArrowLeft'?-1:1;go(order[Math.max(0,Math.min(order.length-1,order.indexOf(state.current)+d))]);}});
renderExploration();
updateAlbum();
syncDeck();
if(!single)go(state.current);
window.addEventListener('hashchange',()=>{const n=Number(location.hash.match(/screen-(\d+)/)?.[1]);if(n!==state.current)go(n===15?2:n);});
function updatePollReply(){const phone=document.querySelector('#screen-12 .phone'),labels=[...phone.querySelectorAll('.poll-option.chosen .poll-label')].map(x=>x.textContent),replies=phone.querySelectorAll('.thread>.row .bubble');replies[2].textContent=labels.length===0?'hmm. none of those yet':labels.length===1&&labels[0]==='Coffee + a walk'?'coffee and a walk. easy exit if it’s awkward lol':labels.length===1?labels[0].toLowerCase()+' sounds good':'i’d be up for '+labels.map(s=>s.toLowerCase()).join(' or ');replies[3].textContent=labels.length===0?'fair. what would make it feel less like a first date?':labels.length===1&&labels[0]==='Coffee + a walk'?'and you can keep walking if it isn’t':'send him those and see what he’s feeling :)';}
function setEffects(enabled){state.effects=enabled;document.body.classList.toggle('quiet-effects',!enabled);document.querySelectorAll('.confetti').forEach(x=>x.remove());const thread=document.querySelector('#screen-20 .thread');if(thread)thread.innerHTML=quietThread(enabled);const button=document.querySelector('[data-motion-toggle]');button.textContent=enabled?'Show quieter replies':'Show expressive replies';announce(enabled?'Inyo can use effects again':'Inyo will keep future replies quieter');}
function applyWall(){document.querySelectorAll('#screen-18 .phone,#screen-19 .phone,#screen-20 .phone').forEach(p=>{p.classList.add('wall-demo');p.dataset.background=state.applied;});}
function setBackgroundStage(stage){cancelPlayback();state.backgroundStage=stage;const thread=document.querySelector('#screen-18 .thread');thread.innerHTML=backgroundThread();if(stage==='before'){while(thread.querySelector('[data-background-event]')){const event=thread.querySelector('[data-background-event]');while(event.nextElementSibling)event.nextElementSibling.remove();event.remove();}}if(stage==='removed')thread.insertAdjacentHTML('beforeend',msg('actually can we go back to plain?',true)+'<div class="system-event" data-background-event="default">Inyo removed the background.</div>'+msg('of course'));state.applied=stage==='changed'?'ice':'default';applyWall();document.querySelectorAll('[data-background-stage]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.backgroundStage===stage));announce('Background scene: '+stage);}
applyWall();
// Consecutive messages share a visual group; only its last bubble has a tail.
document.querySelectorAll('.thread').forEach(thread=>{[...thread.children].forEach((row,i,all)=>{if(!row.classList.contains('row'))return;const next=all[i+1];if(next?.classList.contains('row')&&next.classList.contains('out')===row.classList.contains('out')){row.classList.remove('tail');row.classList.add('continued');}});});
const groupThread=document.querySelector('#screen-11 .thread');
if(groupThread){groupThread.classList.add('group-thread');groupThread.querySelectorAll('.speaker').forEach(label=>{const row=label.nextElementSibling;if(!row?.classList.contains('row'))return;row.classList.add('group-message');const img=document.createElement('img');img.className='sender-avatar';img.src=label.textContent==='Leo'?'assets/leo.jpg':'assets/inyo-logo.png';img.alt='';row.prepend(img);});}

// Keep the profile edit in the conversation that led to it.
function syncProfileContext(){const host=document.querySelector('.profile-chat-context');if(!host)return;const source=document.querySelector('#screen-7 .thread');let rows;if(source)rows=[...source.children].filter(x=>x.classList.contains('row')&&!x.classList.contains('receipt-wrap'));else{const temp=document.createElement('div');temp.innerHTML=screens[6].html();rows=[...temp.querySelector('.thread').children].filter(x=>x.classList.contains('row')&&!x.classList.contains('receipt-wrap'));}host.replaceChildren(...rows.slice(-5).map(x=>{const clone=x.cloneNode(true);return clone;}));}
syncProfileContext();
requestAnimationFrame(()=>document.querySelectorAll('article').forEach(a=>{const t=a.querySelector('.thread');if(t){fillHistory(Number(a.id.slice(7)));t.scrollTop=t.scrollHeight;}}));

// These are windows into one conversation, not bottom-aligned presentation slides.
function fillHistory(n){
 const previous={24:1,2:24,7:2,21:17,8:21,9:8,12:9,13:12,14:13,25:14,22:25,18:22,19:18,20:19};
 const thread=document.querySelector('#screen-'+n+' .thread');if(!thread||!thread.clientHeight||!previous[n])return;
 thread.querySelector(':scope>.transcript-history')?.remove();
 const height=()=>{const kids=[...thread.children].filter(x=>!x.hidden);return kids.reduce((h,x)=>h+x.offsetHeight+parseFloat(getComputedStyle(x).marginTop)+parseFloat(getComputedStyle(x).marginBottom),0)+Math.max(0,kids.length-1)*7+22;};
 if(height()>=thread.clientHeight)return;
 const history=document.createElement('div');history.className='transcript-history';thread.prepend(history);
 let prior=previous[n],count=0;
 while(prior&&count<10&&height()<thread.clientHeight){
  let source=document.querySelector('#screen-'+prior+' .thread');
  if(!source){const temp=document.createElement('div');temp.innerHTML=screens[prior-1].html();source=temp.querySelector('.thread');}
  const rows=source?[...source.children].filter(x=>x.classList.contains('row')&&!x.classList.contains('receipt-wrap')&&!x.querySelector('audio')):[];
  for(const row of rows.reverse()){
   if(height()>=thread.clientHeight||count>=10)break;
   const clone=row.cloneNode(true);clone.querySelectorAll('[id]').forEach(x=>x.removeAttribute('id'));clone.querySelectorAll('button:not([data-ink]),a').forEach(x=>{const span=document.createElement('span');span.className=x.className;span.innerHTML=x.innerHTML;x.replaceWith(span);});clone.querySelectorAll('[data-ink]').forEach(x=>x.classList.remove('revealed'));
   clone.querySelectorAll('[data-reactable]').forEach(x=>{x.removeAttribute('data-reactable');x.removeAttribute('tabindex');x.removeAttribute('role');x.removeAttribute('aria-description');});
   history.prepend(clone);count++;
  }
  prior=previous[prior];
 }
 if(!history.children.length)history.remove();
}

document.addEventListener('scroll',e=>{if(e.target.classList?.contains('thread'))e.target.classList.toggle('scrolled',e.target.scrollTop>0);},true);
