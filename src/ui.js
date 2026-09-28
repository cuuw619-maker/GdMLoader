export function installUI(GDML){
  let opened=false;
  const root=document.createElement("div");
  root.id="gdml-ui";
  root.innerHTML=`<button class="gdml-fab" type="button" aria-label="GdMLoader"><img src="./assets/local/branding/MLLogo.png" alt="GdMLoader"></button><div class="gdml-overlay" aria-hidden="true"><section class="gdml-panel" role="dialog" aria-label="GdMLoader"><header class="gdml-panel-head"><div class="gdml-brand"><img src="./assets/local/branding/MLLogo.png" alt=""><div><b>GdMLoader</b><small>Geometry Dash Mod Loader</small></div></div><button class="gdml-close" type="button" aria-label="Close">×</button></header><nav class="gdml-tabs"><button class="active" data-tab="mods">Mods</button><button data-tab="levels">Levels</button><button data-tab="about">About</button></nav><main><div class="gdml-page active" data-page="mods"><div class="gdml-card"><b>GdMLoader</b><p>Модификации загружаются до запуска игры.</p><span class="gdml-status">Загрузка...</span></div></div><div class="gdml-page" data-page="levels"><div class="gdml-card"><b>Levels</b><p>Выбор уровней доступен через систему загрузчика.</p></div></div><div class="gdml-page" data-page="about"><div class="gdml-card"><b>GdMLoader 2.0</b><p>Web Mod Loader для Geometry Dash.</p><span>F6 — открыть загрузчик</span></div></div></main></section></div>`;
  document.body.append(root);
  const fab=root.querySelector(".gdml-fab"),overlay=root.querySelector(".gdml-overlay"),close=root.querySelector(".gdml-close");
  const setOpen=v=>{opened=v;root.classList.toggle("open",v);overlay.setAttribute("aria-hidden",String(!v));document.body.classList.toggle("gdml-modal-open",v);GDML.emit(v?"menuOpen":"menuClose","loader")};
  const open=()=>setOpen(true),closeMenu=()=>setOpen(false);
  fab.addEventListener("click",open);close.addEventListener("click",closeMenu);overlay.addEventListener("pointerdown",e=>{if(e.target===overlay)closeMenu()});
  root.querySelectorAll(".gdml-tabs button").forEach(b=>b.addEventListener("click",()=>{root.querySelectorAll(".gdml-tabs button").forEach(x=>x.classList.toggle("active",x===b));root.querySelectorAll(".gdml-page").forEach(x=>x.classList.toggle("active",x.dataset.page===b.dataset.tab))}));
  window.addEventListener("keydown",e=>{if(e.key==="F6"){e.preventDefault();opened?closeMenu():open()}if(e.key==="Escape"&&opened)closeMenu()});
  GDML.on("gameReady",()=>{root.classList.add("ready");const s=root.querySelector(".gdml-status");if(s)s.textContent=GDML.loaded.length?GDML.loaded.length+" mod(s) loaded":"No mods loaded"});
  GDML.ui={open,close:closeMenu,toggle:()=>setOpen(!opened),isOpen:()=>opened,state:{}};
  return GDML.ui;
}