// Obtener fecha actual
const hoy = new Date();
const mes = hoy.getMonth() + 1; // +1 porque empieza en 0
const dia = hoy.getDate();

// Navidad activa del 1 al 31 de diciembre
const navidadActiva = (mes === 12);

// Si es Navidad → activar decoraciones
if (navidadActiva) {
    activarDecoracionNavidad();
}

function activarDecoracionNavidad() {
    // Árbol
    const arbol = document.createElement("img");
    arbol.src = "https://i.imgur.com/gp9j6ri.png";
    arbol.className = "arbol";
    document.body.appendChild(arbol);

    // Papá Noel
    const santa = document.createElement("img");
    santa.src = "https://i.imgur.com/y4S5zbn.png";
    santa.className = "santa";
    document.body.appendChild(santa);

    // Guirnalda izquierda
    const g1 = document.createElement("img");
    g1.src = "https://i.imgur.com/zEhWPUt.png";
    g1.className = "guirnalda left";
    document.body.appendChild(g1);

    // Guirnalda derecha
    const g2 = document.createElement("img");
    g2.src = "https://i.imgur.com/zEhWPUt.png";
    g2.className = "guirnalda right";
    document.body.appendChild(g2);

    // Copos de nieve solo 10 sec
    activarNieve();
}

function activarNieve() {
    function crearCopo() {
        const copo = document.createElement("div");
        copo.classList.add("snowflake");
        copo.innerHTML = "❄";
        copo.style.left = Math.random() * 100 + "vw";
        copo.style.animationDuration = (6 + Math.random() * 4) + "s";
        document.body.appendChild(copo);

        setTimeout(() => copo.remove(), 10000);
    }

    const intervalo = setInterval(crearCopo, 200);

    setTimeout(() => {
        clearInterval(intervalo);
    }, 10000);
}
