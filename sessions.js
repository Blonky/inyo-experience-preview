// Photo assets are authored artwork. Choices and reflections remain the user's own.
const worldArt=i=>`<span class="world-art world-${i}" aria-hidden="true"></span>`;
let fitPhotoUrl=null;
const fitLook=i=>i===0&&fitPhotoUrl?`<img class="fit-photo" src="${fitPhotoUrl}" alt="Your outfit photo">`:`<span class="fit-art" data-look="${i}" aria-hidden="true"></span>`;
const fitChoiceArt=(round,i)=>round===0?fitLook(i):'';
function composeScene(kind,collection){
 const picks=collection[0].chosen,labels=collection[0].options;
 const glyphs=kind==='friends'?['↝','✳','↗','∞']:['“','♡','✳','☾'];
 return `<div class="game-stage composed-scene ${kind}" data-drop-zone aria-label="Your scene. Drop a choice here.">${worldArt(kind==='friends'?2:0)}<div class="scene-caption">${kind==='friends'?'SAVE A SEAT':'MAKE YOURSELF AT HOME'}</div><div class="scene-tokens">${picks.map(i=>`<div class="scene-token token-${i}"><span>${glyphs[i]}</span><small>${labels[i][0]}</small></div>`).join('')}</div><div class="stage-picks">${picks.length?`${picks.length} little things that belong here`:'Tap a card to add something to your scene'}</div><span class="sr-only">${picks.map(i=>labels[i][0]).join(', ')}</span></div>`;
}
function fitStage(round,collection){
 if(!round)return `<div class="game-stage fit-intro"><span>THE EVERYDAY EDIT</span><button class="fit-upload" data-fit-upload>${fitPhotoUrl?'Use the sample looks':'Use my photo ↗'}</button><input id="fit-photo" type="file" accept="image/jpeg,image/png,image/webp" hidden><span data-fit-status role="status"></span></div>`;
 const look=collection[0].chosen[0],place=collection[1].chosen[0],world=[3,2,1][place??0];
 return `<div class="game-stage fit-scene"><div class="fit-scene-look">${look===undefined?'<span class="fit-unpicked">Your own look</span>':fitLook(look)}</div><div class="fit-scene-world">${worldArt(world)}<span>${round===1?(place===undefined?'PUT YOURSELF HERE':collection[1].options[place][0]):'YOUR NIGHT, YOUR CALL'}</span></div><span class="fit-plus">+</span></div>`;
}
function fitKeepsake(collection){
 const labels=collection.map(r=>r.chosen.length?r.options[r.chosen[0]][0]:null),look=collection[0].chosen[0],place=collection[1].chosen[0];
 return `<div class="fit-keepsake"><div class="keepsake-top"><span>inyo / the everyday edit</span><span>♡</span></div><div class="keepsake-photos"><div>${look===undefined?'<span class="fit-unpicked">Your own look</span>':fitLook(look)}</div><div>${place===undefined?'<span class="fit-unpicked">Somewhere good</span>':worldArt([3,2,1][place])}</div></div><h3>${labels[0]||'A little more you.'}</h3><p>${[labels[1],labels[2]].filter(Boolean).join(' · ')||'A few things left open. That counts too.'}</p><div class="keepsake-bottom"><span>an evening, on your terms</span><span>made by you ↗</span></div></div>`;
}
function renderFitResult(){
 const phone=document.querySelector('#screen-23 .phone');
 phone.outerHTML=`<div class="phone expanded game-session fit-result" data-game="fit">${status()}${webBar(22)}<div class="fit-result-body"><span class="round-label">THE EVERYDAY EDIT</span><h2>${explorations.fit.rounds.some(r=>r.chosen.length)?'Yeah. That’s you.':'Room to decide.'}</h2><p>A moodboard, not a verdict.<br>Keep what fits. Change what doesn’t.</p>${fitKeepsake(explorations.fit.rounds)}</div><div class="session-actions"><button class="primary" data-fit-return>Bring this back to Inyo <span>↗</span></button><button class="skip" data-fit-edit>Actually, let me change something</button></div>${home}</div>`;
}

document.addEventListener('click',e=>{const button=e.target.closest('[data-fit-upload]');if(!button)return;if(fitPhotoUrl){fitPhotoUrl=null;explorations.fit.rounds[0].options[0]=['Off-duty','Shirt, denim, a little burgundy.'];renderExploration();}else document.querySelector('#fit-photo').click();});
let fitPhotoRequest=0;
document.addEventListener('change',async e=>{
 if(e.target.id!=='fit-photo')return;const request=++fitPhotoRequest,file=e.target.files[0];if(!file)return;
 const status=document.querySelector('[data-fit-status]');
 if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>10*1024*1024){status.textContent='Choose a JPG, PNG or WebP under 10 MB.';e.target.value='';return;}
 const photo=new Image();status.textContent='Opening your photo…';
 try{const url=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(file);});photo.src=url;await photo.decode();if(request!==fitPhotoRequest||state.current!==23||showcaseState.exploration!=='fit'||showcaseState.round!==0){return;}fitPhotoUrl=url;explorations.fit.rounds[0].options[0]=['My own fit','From my camera roll.'];explorations.fit.rounds[0].chosen=[0];renderExploration();announce('Your outfit is ready.');}
 catch{if(status.isConnected)status.textContent='That photo couldn’t open. Try another one.';}
});
