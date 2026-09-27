const root=document.querySelector("#game");
const GDML=window.GDML={version:"1.0.0",root,loaded:[],hooks:new Map(),on(t,f){let a=this.hooks.get(t);if(!a)this.hooks.set(t,a=[]);a.push(f);return()=>a.splice(a.indexOf(f),1)},emit(t,...a){for(const f of this.hooks.get(t)||[])f(...a)}};
async function load(p){try{const m=await import("./mods/"+p);await(m.default||m.install)?.(GDML);GDML.loaded.push(p)}catch(e){console.error("[GDML] "+p,e)}}
(async()=>{let list=[];try{list=await(await fetch("./mods.json",{cache:"no-store"})).json()}catch(e){console.warn("[GDML] No mod list",e)}for(const p of list)if(typeof p==="string"&&p.endsWith(".js"))await load(p);GDML.emit("beforeGame");await import("./game.js");GDML.emit("gameReady")})();
