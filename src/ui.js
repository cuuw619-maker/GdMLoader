const LEVEL_NAMES={
1:"Stereo Madness",2:"Back On Track",3:"Polargeist",4:"Dry Out",5:"Base After Base",6:"Cant Let Go",
7:"Jumper",8:"Time Machine",9:"Cycles",10:"xStep",11:"Clutterfunk",12:"Theory of Everything",
13:"Electroman Adventures",14:"Clubstep",15:"Electrodynamix",16:"Hexagon Force",17:"Blast Processing",
18:"Theory of Everything 2",19:"Geometrical Dominator",20:"Deadlocked",21:"Fingerdash",22:"Dash",
99:"The Challenge",100:"Practice / Test"};

export function installUI(GDML){
const state={reduced:localStorage.getItem("gdml.reduced")==="1",cleanBottom:localStorage.getItem("gdml.cleanBottom")==="1",fab:localStorage.getItem("gdml.fab")!=="0"};
const root=document.createElement("div");root.id="gdml-ui";
root.innerHTML=`
<button class="gdml-fab" aria-label="GdMLoader" title="GdMLoader"><span>GD</span></button>
<section class="gdml-panel" aria-hidden="true">
<header><div><strong>GdMLoader</strong><small>2.0</small></div><button class="gdml-x" aria-label="Close">×</button></header>
<nav class="gdml-tabs"><button data-tab="mods" class="active">Моды</button><button data-tab="levels">Уровни</button><button data-tab="settings">Настройки</button></nav>
<main>
<div data-page="mods" class="gdml-page active">
<div class="gdml-card"><b>Модлоадер</b><p>Моды загружаются из <code>mods/</code>. Сейчас подключено: <strong data-mod-count>0</strong>.</p></div>
<div class="gdml-actions"><button class="gdml-btn github">GitHub</button></div>
<div class="gdml-card gdml-muted">Версия загрузчика: 2.0.0</div>
</div>
<div data-page="levels" class="gdml-page">
<div class="gdml-level-head"><input class="gdml-search" placeholder="Поиск уровня или ID…"><span data-level-count></span></div>
<div class="gdml-levels"></div>
</div>
<div data-page="settings" class="gdml-page">
<label class="gdml-toggle"><span><b>Кнопка GdMLoader</b><small>Показывать плавающую кнопку</small></span><input data-setting="fab" type="checkbox" ${state.fab?"checked":""}></label>
<label class="gdml-toggle"><span><b>Уменьшить анимации</b><small>Отключает анимации интерфейса загрузчика</small></span><input data-setting="reduced" type="checkbox" ${state.reduced?"checked":""}></label>
<label class="gdml-toggle"><span><b>Чистый низ</b><small>Скрывает лишние DOM-элементы за пределами игры</small></span><input data-setting="cleanBottom" type="checkbox" ${state.cleanBottom?"checked":""}></label>
<div class="gdml-card gdml-rights"><b>Права и атрибуция</b><p>Geometry Dash и связанные материалы принадлежат RobTop Games. GdMLoader — сторонний фанатский модлоадер для веб-версии.</p></div>
</div>
</main>
<footer><a href="https://github.com/cuuw619-maker/GdMLoader" target="_blank" rel="noopener">cuuw619-maker / GdMLoader</a></footer>
</section>`;
document.body.append(root);
const fab=root.querySelector(".gdml-fab"),panel=root.querySelector(".gdml-panel"),pages=[...root.querySelectorAll(".gdml-page")],tabs=[...root.querySelectorAll("[data-tab]")];
const open=()=>{panel.classList.add("open");panel.setAttribute("aria-hidden","false")},close=()=>{panel.classList.remove("open");panel.setAttribute("aria-hidden","true")};
fab.onclick=e=>{e.preventDefault();e.stopPropagation();panel.classList.contains("open")?close():open()};root.querySelector(".gdml-x").onclick=close;
tabs.forEach(t=>t.onclick=()=>{tabs.forEach(x=>x.classList.toggle("active",x===t));pages.forEach(p=>p.classList.toggle("active",p.dataset.page===t.dataset.tab));if(t.dataset.tab==="levels")renderLevels()});
root.querySelector(".github").onclick=()=>window.open("https://github.com/cuuw619-maker/GdMLoader","_blank","noopener");
root.querySelectorAll("[data-setting]").forEach(input=>input.onchange=()=>{const k=input.dataset.setting;state[k]=input.checked;localStorage.setItem("gdml."+k,input.checked?"1":"0");if(k==="fab")fab.style.display=input.checked?"grid":"none";if(k==="reduced")document.documentElement.classList.toggle("gdml-reduced",input.checked);if(k==="cleanBottom")document.documentElement.classList.toggle("gdml-clean-bottom",input.checked)});
const list=root.querySelector(".gdml-levels"),search=root.querySelector(".gdml-search");
function levels(){const files=Object.keys(GDML.assets?.files||{}).filter(x=>/^\\d+\\.txt$/i.test(x)).map(x=>+x.slice(0,-4)).sort((a,b)=>a-b);return [...new Set(files)]}
function renderLevels(){const q=search.value.trim().toLowerCase(),ids=levels().filter(id=>(String(id)+" "+(LEVEL_NAMES[id]||"Custom level")).toLowerCase().includes(q));root.querySelector("[data-level-count]").textContent=ids.length+" уров.";list.innerHTML=ids.map(id=>`<button class="gdml-level" data-id="${id}"><span class="gdml-level-id">${id}</span><span><b>${LEVEL_NAMES[id]||"Custom level"}</b><small>Level data · ${id}.txt</small></span><i>›</i></button>`).join("")||'<div class="gdml-empty">Уровни не найдены</div>';list.querySelectorAll(".gdml-level").forEach(b=>b.onclick=()=>{const id=+b.dataset.id,name=LEVEL_NAMES[id]||"Custom level";GDML.selectedLevel={id,name,file:id+".txt"};localStorage.setItem("gdml.selectedLevel",String(id));GDML.emit("levelSelect",GDML.selectedLevel);b.classList.add("selected")})}
search.oninput=renderLevels;
GDML.on("gameReady",()=>{fab.style.display=state.fab?"grid":"none";document.documentElement.classList.toggle("gdml-reduced",state.reduced);document.documentElement.classList.toggle("gdml-clean-bottom",state.cleanBottom);root.querySelector("[data-mod-count]").textContent=GDML.loaded.length});
GDML.on("modLoaded",()=>root.querySelector("[data-mod-count]").textContent=GDML.loaded.length);
fab.style.display="none";document.addEventListener("keydown",e=>{if(e.key==="F6"&&GDML.started){e.preventDefault();panel.classList.contains("open")?close():open()}});
return {open,close,renderLevels,state};
}