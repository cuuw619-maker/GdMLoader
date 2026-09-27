export function installUI(GDML){
  let opened=false;
  const api={
    open(){opened=true;GDML.emit("menuOpen","loader")},
    close(){opened=false;GDML.emit("menuClose","loader")},
    toggle(){opened?api.close():api.open()},
    isOpen(){return opened},
    state:{}
  };
  return api;
}
