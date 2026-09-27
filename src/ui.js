const LEVEL_NAMES={1:"Stereo Madness",2:"Back On Track",3:"Polargeist",4:"Dry Out",5:"Base After Base",6:"Cant Let Go",7:"Jumper",8:"Time Machine",9:"Cycles",10:"xStep",11:"Clutterfunk",12:"Theory of Everything",13:"Electroman Adventures",14:"Clubstep",15:"Electrodynamix",16:"Hexagon Force",17:"Blast Processing",18:"Theory of Everything 2",19:"Geometrical Dominator",20:"Deadlocked",21:"Fingerdash",22:"Dash",99:"The Challenge",100:"Practice / Test"};

export function installUI(GDML){
  const state={reduced:localStorage.getItem("gdml.reduced")==="1"};
  const root=document.createElement("div");root.id="gdml-ui";
  root.innerHTML=\`<div class="gdml-backdrop" aria-hidden="true"></div><section class="gdml-menu" aria-hidden="true" role="dialog" aria-label="GdMLoader">
  <header class="gdml-header"><div class="gdml-brand"><img src="./assets/local/branding/MLLogo.png" alt="GdMLoader"><div><strong>GdMLoader</strong><small>2.0</small></div></div><button class="gdml-close" aria-label="Закрыть">×</button></header>
  <nav class="gdml-tabs"><button data-tab="mods" class="active">Моды</button><button data-tab="levels">Уровни</button><button data-tab="settings">Настройки</button></nav>
  <main><div data-page="mods" class="gdml-page active"><div class="gdml-card gdml-hero"><b>GdMLoader</b><p>Модлоадер встроен непосредственно в игровое окно. Никаких отдельных страниц или меню в углу.</p><span>Загружено модов: <strong data-mod-count>0</strong></span></div><button class="gdml-btn github" type="button">GitHub</button><div class="gdml-card gdml-muted">F6 — открыть / закрыть меню загрузчика</div></div>
  <div data-page="levels" class="gdml-page"><div class="gdml-level-head"><input class="gdml-search" placeholder="Поиск уровня или ID…" autocomplete="off"><span data-level-count></span></div><div class="gdml-levels"></div></div>
  <div data-page="settings" class="gdml-page"><label class="gdml-toggle"><span><b>Уменьшить анимации</b><small>Отключает анимации интерфейса загрузчика</small></span><input data-setting="reduced" type="checkbox" \${state.reduced?"checked":""}></label><div class="gdml-card gdml-rights"><b>Права и атрибуция</b><p>Geometry Dash и связанные материалы принадлежат RobTop Games. GdMLoader — сторонний фанатский модлоадер для веб-версии.</p></div></div></main></section>\`;
  document.body.append(root);
  const menu=root.querySelector(".gdml-menu"),backdrop=root.querySelector(".gdml-backdrop"),closeBtn=root.querySelector(".gdml-close"),pages=[...root.querySelectorAll(".gdml-page")],tabs=[...root.querySelectorAll("[data-tab]")];
  const open=()=>{menu.classList.add("open");backdrop.classList.add("open");menu.setAttribute("aria-hidden","false");backdrop.setAttribute("aria-hidden","false");GDML.menu.open("loader")};
  const close=()=>{menu.classList.remove("open");backdrop.classList.remove("open");menu.setAttribute("aria-hidden","true");backdrop.setAttribute("aria-hidden","true");GDML.menu.close("loader")};
  const toggle=()=>menu.classList.contains("open")?close():open();
  closeBtn.onclick=close;backdrop.onclick=close;
  tabs.forEach(t=>t.onclick=()=>{tabs.forEach(x=>x.classList.toggle("active",x===t));pages.forEach(p=>p.classList.toggle("active",p.dataset.page===t.dataset.tab));if(t.dataset.tab==="levels")renderLevels()});
  root.querySelector(".github").onclick=()=>window.open("https://github.com/cuuw619-maker/GdMLoader","_blank","noopener,noreferrer");
  root.querySelectorAll("[data-setting]").forEach(input=>input.onchange=()=>{const k=input.dataset.setting;state[k]=input.checked;localStorage.setItem("gdml."+k,input.checked?"1":"0");if(k==="reduced")document.documentElement.classList.toggle("gdml-reduced",input.checked)});
  const list=root.querySelector(".gdml-levels"),search=root.querySelector(".gdml-search");
  function levels(){const files=Object.keys(GDML.assets?.files||{}).filter(x=>/^\\d+\\.txt$/i.test(x)).map(x=>+x.slice(0,-4)).sort((a,b)=>a-b);return [...new Set(files)]}
  function renderLevels(){const q=search.value.trim().toLowerCase(),ids=levels().filter(id=>(String(id)+" "+(LEVEL_NAMES[id]||"Custom level")).toLowerCase().includes(q));root.querySelector("[data-level-count]").textContent=ids.length+" уров.";list.innerHTML=ids.map(id=>\`<button class="gdml-level" data-id="\${id}"><span class="gdml-level-id">\${id}</span><span><b>\${LEVEL_NAMES[id]||"Custom level"}</b><small>Level data · \${id}.txt</small></span><i>›</i></button>\`).join("")||'<div class="gdml-empty">Уровни не найдены</div>';list.querySelectorAll(".gdml-level").forEach(b=>b.onclick=()=>{const id=+b.dataset.id,name=LEVEL_NAMES[id]||"Custom level";GDML.selectedLevel={id,name,file:id+".txt"};localStorage.setItem("gdml.selectedLevel",String(id));GDML.emit("levelSelect",GDML.selectedLevel);list.querySelectorAll(".gdml-level").forEach(x=>x.classList.remove("selected"));b.classList.add("selected")})}
  search.oninput=renderLevels;
  GDML.on("gameReady",()=>{root.querySelector("[data-mod-count]").textContent=GDML.loaded.length;document.documentElement.classList.toggle("gdml-reduced",state.reduced)});
  GDML.on("modLoaded",()=>root.querySelector("[data-mod-count]").textContent=GDML.loaded.length);
  document.addEventListener("keydown",e=>{if(e.key==="F6"&&GDML.started){e.preventDefault();e.stopPropagation();toggle()}if(e.key==="Escape"&&menu.classList.contains("open")){e.preventDefault();close()}},true);
  document.documentElement.classList.toggle("gdml-reduced",state.reduced);
  return {open,close,toggle,renderLevels,state};
}