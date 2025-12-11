// decoraciones.js - añade decoraciones por fecha, y nieve 10s cuando corresponde
(function(){
  const root = document.getElementById('decor-root');
  const snowRoot = document.getElementById('snow-root');
  function addImg(src, cls, style={}){ const i = document.createElement('img'); i.src = src; i.className = 'decor ' + cls; Object.assign(i.style, style); root.appendChild(i); return i; }

  function startSnowOnce(){
    let int = setInterval(()=> {
      const f = document.createElement('div'); f.className='snowflake'; f.textContent='❄';
      f.style.left = Math.random()*100+'vw'; f.style.fontSize = (10+Math.random()*18)+'px';
      f.style.animationDuration = (4+Math.random()*5)+'s';
      snowRoot.appendChild(f);
      setTimeout(()=>{ f.remove() },11000);
    }, 120);
    setTimeout(()=> clearInterval(int), 10000);
  }

  // simple add tree & santa & guirnalda
  function addChristmas(){
    addImg('decoraciones/arbol.png','tree',{});
    addImg('decoraciones/papanoel.png','santa',{});
    addImg('decoraciones/guirnalda.png','guirnalda',{left:'12px'});
    addImg('decoraciones/guirnalda.png','guirnalda',{right:'12px'});
    startSnowOnce();
  }

  function addHalloween(){ addImg('https://i.imgur.com/5nK2b6u.png','guirnalda',{left:'8px',top:'60px'}); }
  function addValentine(){ addImg('https://i.imgur.com/1yG0i3k.png','guirnalda',{left:'40%',top:'8px'}); }
  function addEaster(){ addImg('https://i.imgur.com/3yq0g4M.png','guirnalda',{right:'12px',bottom:'12px'}); }

  // determine dates
  const now = new Date();
  const m = now.getMonth()+1;
  const d = now.getDate();

  // Christmas: Dec 1 - Dec 31
  if(m===12) addChristmas();

  // Halloween
  if(m===10 && d>=20) addHalloween();

  // Valentine's Feb 10-14
  if(m===2 && d>=10 && d<=14) addValentine();

  // Easter: approximate - use easterDate algorithm optional (skip to keep light)

  // Always keep small subtle tree if between Nov and Feb
  if( (m===11) || (m===12) || (m===1) || (m===2) ) {
    // ensure at least tree
    if(!document.querySelector('.decor.tree')) addImg('decoraciones/arbol.png','tree',{});
  }
})();
