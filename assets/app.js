const $=s=>document.querySelector(s);
let lang="ar";
const dict={
 ar:{local:"مساحة عمل محلية",eyebrow:"مركز التعاون الذكي",headline:"ثلاثة عقول. مساحة واحدة.",intro:"حضّر أفكارك، وزّع الأسئلة، واجمع الإجابات حتى تتخذ قراراً أوضح.",notice:"نسخة S2 تعمل يدوياً عبر المواقع الرسمية — لا يوجد اتصال آلي أو API.",council:"المجلس",assistants:"المساعدون",openOfficial:"افتح الموقع الرسمي",chatDesc:"تحليل، تخطيط، وابتكار الحلول.",claudeDesc:"تفكير متأنٍ ومراجعة التفاصيل.",gemDesc:"زوايا إضافية وأفكار متنوعة.",promptLab:"مختبر الأوامر",preparePrompt:"جهّز سؤالك للمجلس",taskLabel:"شنو المهمة أو السؤال؟",taskPlaceholder:"اكتب الفكرة أو المشكلة بالتفصيل...",goalLabel:"الهدف",goalAnalyze:"تحليل ومقارنة",goalPlan:"خطة تنفيذ",goalReview:"مراجعة ونقد",goalCreate:"ابتكار وبناء",toneLabel:"أسلوب الإجابة",toneDetailed:"مفصل وعملي",toneConcise:"مختصر ومباشر",toneTechnical:"تقني ومتخصص",generate:"إنشاء أوامر المجلس",clear:"مسح",empty:"الأوامر المخصصة لكل مساعد راح تظهر هنا.",projectsEyebrow:"مساحات العمل",projects:"مشاريعك",library:"مكتبة الحيالي الرقمية",libraryDesc:"المتجر، الإدارة، وتجربة المستخدم.",turboDesc:"بوت التحميل وخدمات تيليغرام.",riftDesc:"عالم القتال والتقدم داخل Roblox.",midDesc:"قصص قصيرة سينمائية.",footer:"قرارك النهائي يبقى بيدك.",copy:"نسخ الأمر",copied:"تم النسخ",needTask:"اكتب المهمة أولاً."},
 en:{local:"Local workspace",eyebrow:"AI COLLABORATION CENTER",headline:"Three minds. One workspace.",intro:"Shape an idea, send focused prompts, and compare perspectives before deciding.",notice:"S2 uses the official assistants manually — no automated connection or API.",council:"THE COUNCIL",assistants:"Assistants",openOfficial:"Open official website",chatDesc:"Analysis, planning, and solution design.",claudeDesc:"Careful reasoning and detailed review.",gemDesc:"Fresh perspectives and diverse ideas.",promptLab:"PROMPT LAB",preparePrompt:"Prepare a council prompt",taskLabel:"What is the task or question?",taskPlaceholder:"Describe your idea or problem...",goalLabel:"Goal",goalAnalyze:"Analyze and compare",goalPlan:"Execution plan",goalReview:"Review and critique",goalCreate:"Create and build",toneLabel:"Response style",toneDetailed:"Detailed and practical",toneConcise:"Concise and direct",toneTechnical:"Technical and specialized",generate:"Generate council prompts",clear:"Clear",empty:"Personalized prompts for each assistant will appear here.",projectsEyebrow:"WORKSPACES",projects:"Your projects",library:"Al-Hayali Digital Library",libraryDesc:"Store, administration, and user experience.",turboDesc:"Download bot and Telegram services.",riftDesc:"Combat and progression world in Roblox.",midDesc:"Short cinematic stories.",footer:"The final decision is yours.",copy:"Copy prompt",copied:"Copied",needTask:"Please enter a task first."}
};
function setLang(){
 document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr";
 document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;if(dict[lang][k])el.textContent=dict[lang][k]});
 document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>el.placeholder=dict[lang][el.dataset.i18nPlaceholder]);
 $("#langBtn").textContent=lang==="ar"?"EN":"عربي";
}
$("#langBtn").addEventListener("click",()=>{lang=lang==="ar"?"en":"ar";setLang()});
function buildPrompts(){
 const task=$("#task").value.trim();if(!task){alert(dict[lang].needTask);return}
 const goal=$("#goal").selectedOptions[0].textContent,tone=$("#tone").selectedOptions[0].textContent;
 const common=lang==="ar"?`المهمة: ${task}\nالهدف: ${goal}\nأسلوب الإجابة: ${tone}\n\nحلّل المطلوب بعمق. وضّح الافتراضات، وقدّم إجابة عملية منظمة، واذكر المخاطر والنقاط غير المؤكدة. لا تخترع معلومات أو نتائج.`:`Task: ${task}\nGoal: ${goal}\nResponse style: ${tone}\n\nAnalyze the request carefully. State assumptions, provide a practical structured answer, and identify risks and uncertainties. Do not invent facts or results.`;
 const prompts=[["ChatGPT",common+(lang==="ar"?"\nاقترح حلولاً وخطوات قابلة للتنفيذ.":"\nSuggest solutions and actionable steps.")],["Claude",common+(lang==="ar"?"\nراجع المنطق والتفاصيل وابحث عن الثغرات والاعتراضات.":"\nReview the reasoning and details; identify gaps and counterarguments.")],["Gemini",common+(lang==="ar"?"\nقدّم زوايا بديلة وأفكاراً مبتكرة، وقارنها بالحلول المعتادة.":"\nOffer alternative perspectives and creative ideas, comparing them with conventional approaches.")]];
 $("#promptResults").replaceChildren();
 prompts.forEach(([name,p])=>{const card=document.createElement("article");card.className="prompt-card";const h=document.createElement("h3");h.textContent=name;const pre=document.createElement("pre");pre.textContent=p;const b=document.createElement("button");b.className="copy-btn";b.type="button";b.textContent=dict[lang].copy;b.addEventListener("click",()=>copyText(p,b));card.append(h,pre,b);$("#promptResults").append(card)});
 return {task,goal,tone};
}
async function copyText(value,button){
 try{await navigator.clipboard.writeText(value);if(button){button.textContent=dict[lang].copied;setTimeout(()=>button.textContent=dict[lang].copy,1400)}}
 catch{const area=document.createElement("textarea");area.value=value;document.body.append(area);area.select();try{document.execCommand("copy");if(button)button.textContent=dict[lang].copied}catch{alert("تعذر النسخ التلقائي. حدّد النص وانسخه يدوياً.")}area.remove()}
}
$("#generateBtn").addEventListener("click",buildPrompts);
$("#clearBtn").addEventListener("click",()=>{$("#task").value="";$("#promptResults").innerHTML='<div class="empty-state">'+dict[lang].empty+"</div>"});

// S2: all sessions and responses are stored locally in this browser's IndexedDB.
const DB_NAME="ai-council-hub",DB_VERSION=1,STORE="sessions";
let db=null,currentSessionId=null,sessions=[];
function openDatabase(){return new Promise((resolve,reject)=>{if(!("indexedDB"in window)){reject(new Error("IndexedDB is unavailable"));return}const request=indexedDB.open(DB_NAME,DB_VERSION);request.onupgradeneeded=()=>{const database=request.result;if(!database.objectStoreNames.contains(STORE))database.createObjectStore(STORE,{keyPath:"id"})};request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error)})}
function transact(mode,operation){return new Promise((resolve,reject)=>{const tx=db.transaction(STORE,mode),store=tx.objectStore(STORE);let result;try{result=operation(store)}catch(error){reject(error);return}tx.oncomplete=()=>resolve(result);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||new Error("Transaction aborted"))})}
const getAll=()=>new Promise((resolve,reject)=>{const request=db.transaction(STORE,"readonly").objectStore(STORE).getAll();request.onsuccess=()=>resolve(request.result||[]);request.onerror=()=>reject(request.error)});
const putSession=session=>transact("readwrite",store=>store.put(session));
const deleteSession=id=>transact("readwrite",store=>store.delete(id));
const makeId=()=>crypto.randomUUID?crypto.randomUUID():"s"+Date.now().toString(36)+Math.random().toString(36).slice(2);
function readEditor(){return {title:$("#sessionTitle").value.trim(),task:$("#task").value.trim(),goal:$("#goal").value,tone:$("#tone").value,answers:{ChatGPT:$("#answerChatGPT").value,Claude:$("#answerClaude").value,Gemini:$("#answerGemini").value},decision:{scores:readScores(),choice:$("#decisionChoice").value,next:$("#decisionNext").value.trim(),rationale:$("#decisionRationale").value.trim()},roundtable:{round1:{ChatGPT:$("#rtR1ChatGPT").value,Claude:$("#rtR1Claude").value,Gemini:$("#rtR1Gemini").value},round2:{ChatGPT:$("#rtR2ChatGPT").value,Claude:$("#rtR2Claude").value,Gemini:$("#rtR2Gemini").value}}}}
function writeEditor(s){currentSessionId=s?.id||null;$("#sessionTitle").value=s?.title||"";$("#task").value=s?.task||"";$("#goal").value=s?.goal||"analyze";$("#tone").value=s?.tone||"detailed";$("#answerChatGPT").value=s?.answers?.ChatGPT||"";$("#answerClaude").value=s?.answers?.Claude||"";$("#answerGemini").value=s?.answers?.Gemini||"";$("#decisionChoice").value=s?.decision?.choice||"";$("#decisionNext").value=s?.decision?.next||"";$("#decisionRationale").value=s?.decision?.rationale||"";writeScores(s?.decision?.scores);["ChatGPT","Claude","Gemini"].forEach(n=>{$("#rtR1"+n).value=s?.roundtable?.round1?.[n]||"";$("#rtR2"+n).value=s?.roundtable?.round2?.[n]||""});$("#reviewResult").hidden=true;$("#rtCouncilResult").hidden=true}
function safeDate(value){try{return new Date(value).toLocaleString(lang==="ar"?"ar-IQ":"en-US")}catch{return ""}}
function renderSessions(){
 const list=$("#sessionList");list.replaceChildren();$("#sessionCount").textContent=String(sessions.length);
 if(!sessions.length){const empty=document.createElement("div");empty.className="empty-state";empty.textContent="لا توجد جلسات محفوظة بعد.";list.append(empty);return}
 const term=($("#sessionSearch")?.value||"").trim().toLocaleLowerCase();sessions.filter(s=>!term||[s.title,s.task].join(" ").toLocaleLowerCase().includes(term)).sort((a,b)=>b.updatedAt-a.updatedAt).forEach(s=>{const item=document.createElement("article");item.className="session-item";const info=document.createElement("div"),title=document.createElement("strong"),meta=document.createElement("small");title.textContent=s.title||s.task.slice(0,65)||"جلسة بدون عنوان";meta.textContent=safeDate(s.updatedAt);info.append(title,meta);const actions=document.createElement("div");actions.className="session-actions";const load=document.createElement("button");load.type="button";load.textContent="فتح";load.addEventListener("click",()=>writeEditor(s));const del=document.createElement("button");del.type="button";del.className="danger";del.textContent="حذف";del.addEventListener("click",async()=>{if(!confirm("تحذف هذه الجلسة نهائياً من هذا الجهاز؟"))return;await deleteSession(s.id);if(currentSessionId===s.id)writeEditor(null);await refreshSessions()});actions.append(load,del);item.append(info,actions);list.append(item)})
}
async function refreshSessions(){sessions=await getAll();renderSessions()}
$("#saveSessionBtn").addEventListener("click",async()=>{const data=readEditor();if(!data.task){alert("اكتب المهمة أولاً قبل حفظ الجلسة.");return}const now=Date.now();const existing=sessions.find(s=>s.id===currentSessionId);const session={...data,id:currentSessionId||makeId(),createdAt:existing?.createdAt||now,updatedAt:now};await putSession(session);currentSessionId=session.id;await refreshSessions();$("#storageStatus").textContent="تم الحفظ محلياً ✓"});
$("#newSessionBtn").addEventListener("click",()=>{if(!confirm("بدء جلسة جديدة؟ تأكد من حفظ تغييرات الجلسة الحالية."))return;writeEditor(null);$("#storageStatus").textContent="جلسة جديدة — لم تُحفظ بعد"});
$("#reviewPromptBtn").addEventListener("click",()=>{const data=readEditor();const answers=Object.entries(data.answers).filter(([,v])=>v.trim());if(answers.length<2){alert("ألصق إجابتين على الأقل حتى تكون المراجعة المتبادلة مفيدة.");return}const text=`أنت منسق مجلس ذكاء اصطناعي. راجع المهمة وإجابات النماذج الثلاثة المتاحة مراجعة نقدية محايدة.\n\nالمهمة الأصلية:\n${data.task}\n\n${answers.map(([name,value])=>`إجابة ${name}:\n${value}`).join("\n\n---\n\n")}\n\nالمطلوب:\n1. استخرج نقاط الاتفاق والاختلاف بدقة.\n2. حدّد الادعاءات التي تحتاج تحققاً، ولا تعتبر تكرار الادعاء دليلاً على صحته.\n3. اكشف التناقضات والثغرات والافتراضات غير المعلنة.\n4. قيّم كل إجابة بحسب الدقة والاكتمال وقابلية التنفيذ، مع تبرير التقييم.\n5. اقترح أسئلة متابعة تكشف ما لم يُحسم.\n6. اكتب خلاصة موحدة، وميّز بوضوح بين الحقائق والآراء وما يحتاج تحققاً.\nلا تخترع مصادر أو نتائج، ولا تمنح نموذجاً الأفضلية لمجرد اسمه.`;$("#reviewText").textContent=text;$("#reviewResult").hidden=false});
$("#copyReviewBtn").addEventListener("click",e=>copyText($("#reviewText").textContent,e.currentTarget));
$("#exportBtn").addEventListener("click",async()=>{const payload={format:"ai-council-hub-backup",version:1,exportedAt:new Date().toISOString(),sessions:await getAll()};const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="ai-council-backup-"+new Date().toISOString().slice(0,10)+".json";a.click();URL.revokeObjectURL(url)});
$("#importBtn").addEventListener("click",()=>$("#importFile").click());
$("#importFile").addEventListener("change",async e=>{const file=e.target.files?.[0];if(!file)return;try{const data=JSON.parse(await file.text());if(data.format!=="ai-council-hub-backup"||!Array.isArray(data.sessions))throw new Error("صيغة الملف غير معروفة");let count=0;for(const raw of data.sessions){if(!raw||typeof raw!=="object"||typeof raw.task!=="string")continue;const s={id:typeof raw.id==="string"?raw.id:makeId(),title:typeof raw.title==="string"?raw.title:"",task:raw.task,goal:["analyze","plan","review","create"].includes(raw.goal)?raw.goal:"analyze",tone:["detailed","concise","technical"].includes(raw.tone)?raw.tone:"detailed",answers:{ChatGPT:String(raw.answers?.ChatGPT||""),Claude:String(raw.answers?.Claude||""),Gemini:String(raw.answers?.Gemini||"")},decision:{scores:raw.decision?.scores||{},choice:typeof raw.decision?.choice==="string"?raw.decision.choice:"",next:typeof raw.decision?.next==="string"?raw.decision.next:"",rationale:typeof raw.decision?.rationale==="string"?raw.decision.rationale:""},roundtable:{round1:raw.roundtable?.round1||{},round2:raw.roundtable?.round2||{}},createdAt:Number(raw.createdAt)||Date.now(),updatedAt:Number(raw.updatedAt)||Date.now()};await putSession(s);count++}await refreshSessions();alert("تم استيراد "+count+" جلسة.")}catch(error){alert("تعذر استيراد الملف: "+error.message)}finally{e.target.value=""}});
async function initS2(){try{db=await openDatabase();await refreshSessions()}catch(error){$("#storageStatus").textContent="التخزين المحلي غير متاح";$("#storageStatus").title=error.message;$("#saveSessionBtn").disabled=true;$("#exportBtn").disabled=true;$("#importBtn").disabled=true}}
initS2();
if("serviceWorker"in navigator&&location.protocol!=="file:")window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
setLang();


// S3: independent peer-review rounds. Each model receives the task and the other
// models' answers, but not its own answer, to reduce self-confirmation bias.
$("#peerReviewBtn").addEventListener("click",()=>{
 const task=$("#task").value.trim();
 if(!task){alert("اكتب المهمة أولاً.");return}
 const all={ChatGPT:$("#answerChatGPT").value.trim(),Claude:$("#answerClaude").value.trim(),Gemini:$("#answerGemini").value.trim()};
 const available=Object.entries(all).filter(([,answer])=>answer);
 if(available.length<2){alert("أدخل إجابتين على الأقل حتى نبدأ جولات التحكيم.");return}
 const output=$("#peerResults");output.replaceChildren();
 const instructions={
 ChatGPT:"قدّم تحليلاً منظماً، واختبر صحة الاستنتاجات وقابلية التنفيذ. لا تفترض أن الإجابة الأطول أفضل.",
 Claude:"دقّق في المنطق والافتراضات، وابحث عن الثغرات والتناقضات والمخاطر التي لم تُذكر.",
 Gemini:"ابحث عن زوايا بديلة وحلول غير مطروقة، واختبر الادعاءات التي تبدو متفقاً عليها دون دليل."
 };
 available.forEach(([reviewer])=>{
  const others=available.filter(([name])=>name!==reviewer);
  const prompt=`أنت ${reviewer} وتشارك في جولة تحكيم مستقلة ضمن مجلس ذكاء اصطناعي.\nالمهمة الأصلية:\n${task}\n\nراجع إجابات الأعضاء الآخرين فقط، ولا تستخدم إجابتك السابقة كدليل.\n\n${others.map(([name,answer])=>`إجابة ${name}:\n${answer}`).join("\n\n---\n\n")}\n\nمهمتك في هذه الجولة:\n- ${instructions[reviewer]}\n- اذكر نقاط القوة والضعف لكل إجابة مع شواهد من النص.\n- افصل بين الأخطاء المؤكدة والشكوك وما يحتاج إلى تحقق خارجي.\n- أعطِ حكماً مستقلاً: ما الذي يجب اعتماده، تعديله، أو رفضه؟\n- اقترح سؤال تحقق واحداً عالي القيمة.\nلا تختلق مصادر أو حقائق، ولا تجامل أي نموذج.`;
  const card=document.createElement("article");card.className="peer-card";
  const title=document.createElement("h4");title.textContent="جولة تحكيم: "+reviewer;
  const desc=document.createElement("p");desc.textContent="انسخ هذا الأمر إلى "+reviewer+" بعد فتح محادثة مناسبة.";
  const pre=document.createElement("pre");pre.textContent=prompt;
  const copy=document.createElement("button");copy.className="copy-btn";copy.type="button";copy.textContent="نسخ أمر التحكيم";
  copy.addEventListener("click",()=>copyText(prompt,copy));
  card.append(title,desc,pre,copy);output.append(card);
 });
 output.scrollIntoView({behavior:"smooth",block:"nearest"});
});
$("#sessionSearch")?.addEventListener("input",renderSessions);


// S4 decision workbench: transparent rubric, editable scores, and saved rationale.
function readScores(){
 const scores={};
 document.querySelectorAll(".score-card").forEach(card=>{
  const model=card.dataset.model;scores[model]={};
  card.querySelectorAll("[data-score]").forEach(input=>scores[model][input.dataset.score]=Number(input.value)||1);
 });
 return scores;
}
function writeScores(scores){
 document.querySelectorAll(".score-card").forEach(card=>{
  const values=scores?.[card.dataset.model]||{};
  card.querySelectorAll("[data-score]").forEach(input=>{
   const value=Number(values[input.dataset.score]);
   input.value=String(Number.isFinite(value)&&value>=1&&value<=5?value:3);
  });
 });
 updateScoreSummary();
}
function updateScoreSummary(){
 const models=["ChatGPT","Claude","Gemini"];
 const ranked=models.map(name=>{
  const values=Object.values(readScores()[name]||{});
  return {name,score:values.length?values.reduce((a,b)=>a+b,0)/values.length:0};
 }).sort((a,b)=>b.score-a.score);
 models.forEach(name=>{$("#total"+name).textContent=ranked.find(x=>x.name===name).score.toFixed(1)+" / 5"});
 $("#scoreBars").replaceChildren();
 ranked.forEach(item=>{
  const row=document.createElement("div");row.className="score-bar-row";
  const label=document.createElement("span");label.textContent=item.name;
  const track=document.createElement("div");track.className="score-track";
  const fill=document.createElement("i");fill.style.width=(item.score/5*100)+"%";track.append(fill);
  const value=document.createElement("b");value.textContent=item.score.toFixed(1);
  row.append(label,track,value);$("#scoreBars").append(row);
 });
 const max=ranked[0]?.score||0;
 const winners=ranked.filter(x=>Math.abs(x.score-max)<0.001);
 $("#scoreRecommendation").textContent=winners.length>1?"تعادل في أعلى تقييم: "+winners.map(x=>x.name).join(" و "):"أعلى متوسط تقييم: "+winners[0].name+" ("+max.toFixed(1)+"/5)";
 $("#scoreCaveat").textContent="المتوسط متساوي الأوزان للمعايير الأربعة؛ راجع الأدلة والمخاطر قبل الحسم.";
}
document.querySelectorAll(".score-card input[data-score]").forEach(input=>input.addEventListener("input",updateScoreSummary));
$("#copyDecisionBtn").addEventListener("click",()=>{
 const data=readEditor();
 const lines=["ملخص قرار مجلس الذكاء الاصطناعي","المهمة: "+data.task,"",
  ...Object.entries(data.decision.scores).map(([name,values])=>name+": "+(Object.values(values).reduce((a,b)=>a+b,0)/4).toFixed(2)+" / 5"),
  "القرار: "+(data.decision.choice||"غير محسوم"),
  "الخطوة التالية: "+(data.decision.next||"غير محددة"),
  "المبررات: "+(data.decision.rationale||"لا توجد ملاحظات"),
  "تنبيه: الدرجات تقديرات بشرية مساعدة وليست إثباتاً لصحة المعلومات.")
 .join("\n");
 copyText(lines,$("#copyDecisionBtn"));
});
writeScores();


// S5: two-round manual AI Roundtable. Each step produces copy-ready prompts;
// the user pastes official-site responses back into this local workspace.
const rtNames=["ChatGPT","Claude","Gemini"];
const rtOriginal=()=>Object.fromEntries(rtNames.map(n=>[n,$("#answer"+n).value.trim()]));
const rtRead=(round)=>Object.fromEntries(rtNames.map(n=>[n,$("#rt"+round+n).value.trim()]));
function rtCards(target,prompts,buttonLabel){
 const root=$(target);root.replaceChildren();
 Object.entries(prompts).forEach(([name,prompt])=>{
  const card=document.createElement("article");card.className="peer-card";
  const title=document.createElement("h4");title.textContent=name+" · "+(buttonLabel||"أمر الجولة");
  const pre=document.createElement("pre");pre.textContent=prompt;
  const copy=document.createElement("button");copy.className="copy-btn";copy.type="button";copy.textContent="نسخ الأمر";
  copy.addEventListener("click",()=>copyText(prompt,copy));
  card.append(title,pre,copy);root.append(card);
 });
}
function rtNeedTask(){const task=$("#task").value.trim();if(!task){alert("اكتب المهمة أولاً.");return null}return task}
$("#rtStartBtn").addEventListener("click",()=>{
 const task=rtNeedTask();if(!task)return;
 const original=rtOriginal(),available=rtNames.filter(n=>original[n]);
 if(available.length<2){alert("أدخل إجابتين أصليتين على الأقل في غرفة الاجتماعات.");return}
 const prompts={};
 available.forEach(name=>{
  const peers=available.filter(n=>n!==name);
  prompts[name]=`أنت ${name} في مجلس نقاش من ثلاثة مساعدين. هذه الجولة الأولى من جولتين. كن مستقلاً وصريحاً.
المهمة: ${task}

إجابات الأعضاء الآخرين:
${peers.map(n=>"--- "+n+" ---\n"+original[n]).join("\n\n")}

المطلوب:
1) دقق الادعاءات والمنطق والخطوات العملية في إجابات الآخرين.
2) اذكر نقاط القوة والضعف مع اقتباس قصير أو تحديد موضع واضح.
3) اكشف المخاطر والافتراضات والمعلومات التي تحتاج تحققاً.
4) قدم تحسينات محددة، ولا تكرر كلامك لمجرد الاتفاق.
5) اختم بثلاث نقاط: ما أؤيده، ما أعترض عليه، وما أحتاج دليلاً عليه.
لا تدّع أنك تواصلت مع النماذج الأخرى، ولا تخترع مصادر أو نتائج.`;
 });
 rtCards("#rtRound1Prompts",prompts,"الجولة الأولى");
 $("#rtRound1Prompts").scrollIntoView({behavior:"smooth",block:"nearest"});
});
$("#rtSecondBtn").addEventListener("click",()=>{
 const task=rtNeedTask();if(!task)return;
 const original=rtOriginal(),reviews=rtRead("R1");
 const available=rtNames.filter(n=>original[n]&&reviews[n]);
 if(available.length<2){alert("أدخل مراجعتين على الأقل في نتائج الجولة الأولى، مع الإجابات الأصلية للنماذج.");return}
 const prompts={};
 available.forEach(name=>{
  const others=rtNames.filter(n=>n!==name&&reviews[n]);
  prompts[name]=`أنت ${name} في الجولة الثانية والأخيرة من مجلس نقاش. اقرأ النقد المتبادل، ثم راجع موقفك بإنصاف.
المهمة الأصلية: ${task}
إجابتك الأصلية:
${original[name]||"لم تقدم إجابة أصلية في هذه الجلسة."}

مراجعتك في الجولة الأولى:
${reviews[name]}

مراجعات الأعضاء الآخرين:
${others.map(n=>"--- مراجعة "+n+" ---\n"+reviews[n]).join("\n\n")}

المطلوب:
1) أجب عن الاعتراضات الجوهرية الموجهة إلى رأيك أو إجابتك.
2) صحح ما ثبت ضعفه، واذكر صراحةً ما غيرته ولماذا.
3) قيّم حجج الآخرين: ما الذي تقبله وما الذي ترفضه مع السبب.
4) اكتب توصيتك النهائية وخطوات تنفيذها ومخاطرها.
5) صنف المسائل إلى متفق عليها، مختلف عليها، وتحتاج تحققاً خارجياً.
6) لا تساوِ بين الآراء إذا كانت الأدلة متفاوتة، ولا تختلق معلومات.`;
 });
 rtCards("#rtRound2Prompts",prompts,"الجولة الثانية");
 $("#rtRound2Prompts").scrollIntoView({behavior:"smooth",block:"nearest"});
});
$("#rtCouncilBtn").addEventListener("click",()=>{
 const task=rtNeedTask();if(!task)return;
 const original=rtOriginal(),r1=rtRead("R1"),r2=rtRead("R2");
 const gathered=rtNames.filter(n=>r2[n]);
 if(gathered.length<2){alert("أدخل ردّين على الأقل من الجولة الثانية حتى يصدر المجلس توصية مشتركة.");return}
 const prompt=`أنت أمين المجلس ومقرر القرار النهائي في AI Council Hub. مهمتك صياغة توصية مجلس مشتركة بناءً على جولتين من النقاش، لا الدفاع عن نموذج بعينه.

المهمة الأصلية:
${task}

الإجابات الأصلية:
${rtNames.filter(n=>original[n]).map(n=>"--- "+n+" ---\n"+original[n]).join("\n\n")}

نتائج الجولة الأولى (النقد المتبادل):
${rtNames.filter(n=>r1[n]).map(n=>"--- "+n+" ---\n"+r1[n]).join("\n\n")}

نتائج الجولة الثانية (الرد والتقارب):
${gathered.map(n=>"--- "+n+" ---\n"+r2[n]).join("\n\n")}

أصدر تقريراً منظماً يتضمن:
1) التوصية المشتركة التي تحظى بأقوى دعم، ولماذا.
2) نقاط الاتفاق الحقيقي بين المشاركين.
3) نقاط الخلاف التي لم تُحل، مع عرض أقوى حجة لكل جانب.
4) جدولاً مختصراً: الادعاء، الدليل المتاح، درجة الثقة، وما يلزم للتحقق.
5) المخاطر والاعتراضات المتبقية وخطة تخفيفها.
6) خطة تنفيذ مرتبة حسب الأولوية، مع أول خطوة عملية.
7) قرار المجلس: يوصي بالتنفيذ / يوصي بتجربة محدودة / يوصي بالتأجيل لحين التحقق، مع شروط واضحة.
8) اذكر إن كانت البيانات غير كافية. لا تخترع تصويتاً أو إجماعاً أو مصادر. ميّز بين توصية المجلس وقرار المستخدم النهائي.`;
 $("#rtCouncilText").textContent=prompt;$("#rtCouncilResult").hidden=false;
 $("#rtCouncilResult").scrollIntoView({behavior:"smooth",block:"nearest"});
});
$("#rtCopyCouncilBtn").addEventListener("click",e=>copyText($("#rtCouncilText").textContent,e.currentTarget));
