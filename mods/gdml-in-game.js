const LEVEL_NAMES={
1:"Stereo Madness",2:"Back On Track",3:"Polargeist",4:"Dry Out",5:"Base After Base",6:"Cant Let Go",
7:"Jumper",8:"Time Machine",9:"Cycles",10:"xStep",11:"Clutterfunk",12:"Theory of Everything",
13:"Electroman Adventures",14:"Clubstep",15:"Electrodynamix",16:"Hexagon Force",17:"Blast Processing",
18:"Theory of Everything 2",19:"Geometrical Dominator",20:"Deadlocked",21:"Fingerdash",22:"Dash"};

export default function(GDML){
  GDML.on("gameReady",()=>{
    const game=window.Phaser&&window.Phaser.GAMES&&window.Phaser.GAMES[0];
    if(!game||!game.scene)return;
    const boot=game.scene.getScene("BootScene");
    if(!boot)return;
    const W=game.config.width||1137,H=game.config.height||640;
    const logoPath="./assets/local/branding/MLLogo.png";
    const logoImage=new Image();logoImage.onload=()=>{try{game.textures.addImage("gdmlLogo",logoImage)}catch(e){console.warn("[GdMLoader] logo",e)}};logoImage.src=logoPath;
    let panel=null,button=null,busy=false;

    const makeText=(x,y,s,size)=>{
      return boot.add.text(x,y,s,{fontFamily:"Arial",fontSize:size+"px",fontStyle:"bold",color:"#ffffff",align:"center"}).setOrigin(.5);
    };
    const makeButton=(x,y,w,h,label,fn)=>{
      const g=boot.add.graphics();
      g.fillStyle(0x111827,.94);g.fillRoundedRect(x-w/2,y-h/2,w,h,10);
      g.lineStyle(2,0xffffff,.18);g.strokeRoundedRect(x-w/2,y-h/2,w,h,10);
      g.setInteractive(new Phaser.Geom.Rectangle(x-w/2,y-h/2,w,h),Phaser.Geom.Rectangle.Contains);
      g.on("pointerover",()=>g.setAlpha(.82)).on("pointerout",()=>g.setAlpha(1)).on("pointerup",fn);
      const t=makeText(x,y,label,17);
      return {g:g,t:t,destroy:()=>{g.destroy();t.destroy()}};
    };

    const close=()=>{
      if(!panel)return;
      panel.destroy(true);panel=null;
      if(button){button.g.setVisible(true);button.t.setVisible(true);}
      boot._menuActive=false;busy=false;
      GDML.emit("menuClose","gdml-levels");
    };

    const loadLevel=async id=>{
      if(busy)return;
      busy=true;
      try{
        const mapped=GDML.assets&&GDML.assets.files&&GDML.assets.files[id+".txt"];
        const url=mapped
          ?new URL(mapped,GDML.assets.base||"https://web-dashers.github.io/").href
          :new URL("assets/levels/"+id+".txt",GDML.assets&&GDML.assets.base||"https://web-dashers.github.io/").href;
        const res=await fetch(url,{cache:"no-store"});
        if(!res.ok)throw new Error("Level "+id+" HTTP "+res.status);
        const data=await res.text();
        const cache=boot.cache&&boot.cache.text;
        if(cache&&cache.add)cache.add("level_1",data);
        GDML.selectedLevel={id:id,name:LEVEL_NAMES[id]||"Custom level",file:id+".txt",data:data};
        localStorage.setItem("gdml.selectedLevel",String(id));
        close();
        GDML.emit("levelSelect",GDML.selectedLevel);
        boot.scene.start("GameScene");
      }catch(e){
        console.error("[GdMLoader] level load failed",e);
        busy=false;
      }
    };

    const open=()=>{
      if(panel)return;
      boot._menuActive=true;
      if(button){button.g.setVisible(false);button.t.setVisible(false);}
      panel=boot.add.container(0,0).setDepth(10000);
      const bg=boot.add.graphics();bg.fillStyle(0x05070d,0.97);bg.fillRect(0,0,W,H);panel.add(bg);
      const title=makeText(W/2,43,"GdMLoader",34);panel.add(title);
      if(game.textures.exists("gdmlLogo"))panel.add(boot.add.image(W/2-125,43,"gdmlLogo").setDisplaySize(42,42).setOrigin(.5).setDepth(10001));
      const sub=makeText(W/2,78,"LEVEL SELECT",14);sub.setAlpha(.65);panel.add(sub);
      const closeB=makeButton(W-55,45,70,42,"×",close);panel.add(closeB.g);panel.add(closeB.t);
      const ids=Object.keys(GDML.assets&&GDML.assets.files||{}).filter(x=>/^\d+\.txt$/i.test(x)).map(x=>+x.slice(0,-4)).filter(Number.isFinite).sort((a,b)=>a-b);
      const all=[...new Set(ids.length?ids:Object.keys(LEVEL_NAMES).map(Number))].slice(0,40);
      all.forEach((id,i)=>{
        const col=i%4,row=Math.floor(i/4),x=155+col*280,y=132+row*67;
        const b=makeButton(x,y,250,53,id+"  "+(LEVEL_NAMES[id]||"Custom level"),()=>loadLevel(id));
        panel.add(b.g);panel.add(b.t);
      });
      GDML.emit("menuOpen","gdml-levels");
    };

    button=makeButton(W/2,H-70,210,48,"GdMLoader",open);
    button.g.setDepth(9999);button.t.setDepth(10000);
    if(game.textures.exists("gdmlLogo")){const bi=boot.add.image(W/2-125,H-70,"gdmlLogo").setDisplaySize(34,34).setDepth(10000);button.logo=bi;}
    boot.input.keyboard.on("keydown-F6",()=>{if(boot.scene.isActive("BootScene"))open()});
  });
}