/* app.js - CEREBRO CENTRAL DE RENDER_FINAL */

// --- CONFIGURACIÓN ---
const USAR_STRAPI = false; 
const API_URL = "https://tu-strapi.com/api/articulos"; 

// --- 1. FUNCIÓN MAESTRA DE CARGA DE DATOS ---
async function obtenerDatos() {
    if (USAR_STRAPI) {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data; 
    } else {
        return new Promise(resolve => setTimeout(() => resolve(articulos), 10));
    }
}

// --- 2. DETECTOR DE PÁGINA ---
document.addEventListener('DOMContentLoaded', async () => {
    const datos = await obtenerDatos(); 

    if (document.getElementById('grid-container')) {
        iniciarHome(datos);
    } 
    
    if (document.getElementById('article-inject')) {
        iniciarArticulo(datos);
    }
});

// --- 3. LÓGICA DEL HOME (INDEX)---
function iniciarHome(listaArticulos) {
    const heroContainer = document.getElementById('hero-container');
    const gridContainer = document.getElementById('grid-container');
    const sectionTitle = document.getElementById('section-title');
    const navButtons = document.querySelectorAll('.nav-btn');

    window.renderizar = function(filtro = 'TODO') {
        heroContainer.innerHTML = '';
        gridContainer.innerHTML = '';
        gridContainer.className = 'grid'; 

        let filtrados = listaArticulos;
        if (filtro !== 'TODO') {
            filtrados = listaArticulos.filter(art => art.categoria === filtro);
            sectionTitle.innerText = `INDEX_${filtro}`;
        } else {
            sectionTitle.innerText = `INDEX_LATEST`;
        }

        filtrados.forEach(art => {
            const link = `articulo.html?id=${art.id}`;
            if (art.destacado && filtro === 'TODO') {
                heroContainer.innerHTML = `
                    <article class="hero">
                        <a href="${link}" class="hero-link">
                            <div class="hero-info">
                                <span class="card-meta">:: ${art.categoria} | ${art.fecha}</span>
                                <h1 class="hero-title">${art.titulo}</h1>
                                <p class="card-bajada" style="font-size:1.1rem;">${art.bajada}</p>
                                <div style="margin-top:20px; font-size:0.8rem; font-weight:700;">LEER INVESTIGACIÓN ></div>
                            </div>
                            <div><img src="${art.imagen}" class="hero-img" alt="Portada de la investigación: ${art.titulo}"></div>
                        </a>
                    </article>`;
            } else {
                // Acá agregamos la semántica <article> para SEO
                gridContainer.innerHTML += `
                    <article>
                        <a href="${link}" class="card">
                            <div class="card-img-container"><img src="${art.imagen}" class="card-img" alt="Miniatura de ${art.titulo}"></div>
                            <span class="card-meta">${art.categoria}</span>
                            <h2 class="card-title">${art.titulo}</h2>
                            <p class="card-bajada">${art.bajada}</p>
                        </a>
                    </article>`;
            }
        });
    };

    window.filtrar = function(categoria) {
        navButtons.forEach(btn => btn.classList.remove('active'));
        navButtons.forEach(btn => {
            if(btn.innerText.toUpperCase() === categoria) btn.classList.add('active');
        });
        window.renderizar(categoria);
    };

    window.mostrarEquipo = function() {
        heroContainer.innerHTML = '';
        gridContainer.innerHTML = '';
        sectionTitle.innerText = "STAFF_EDITORIAL";
        navButtons.forEach(btn => btn.classList.remove('active'));
        if (typeof equipo !== 'undefined') {
            gridContainer.className = 'team-grid';
            equipo.forEach(p => {
                // Acá agregamos el atributo 'alt' para accesibilidad
                gridContainer.innerHTML += `
                    <div class="team-card">
                        <a href="${p.link}" target="_blank"><img src="${p.foto}" class="team-img" alt="Foto de perfil de ${p.nombre}, ${p.rol}"></a>
                        <h3 class="team-name">${p.nombre}</h3>
                        <div class="team-role">${p.rol}</div>
                        <a href="${p.link}" target="_blank" class="team-link">VER PORTFOLIO ></a>
                    </div>`;
            });
        }
    };
    
    window.renderizar('TODO');
}

// --- 4. LÓGICA DEL ARTÍCULO (NOTA) ---
function iniciarArticulo(listaArticulos) {
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get('id');
    const container = document.getElementById('article-inject');

    const articulo = listaArticulos.find(art => art.id === articleId);

    if (articulo) {
        let rawText = articulo.cuerpo || '';

        // A. SISTEMA DE HERRAMIENTAS (Embeds Responsivos)
        rawText = rawText.replace(/\[\[HERRAMIENTA:(.+)\]\]/g, (match, archivo) => {
            return `<div class="interactive-embed" style="margin: 30px auto; max-width: 400px; width: 100%; border: 2px solid #000; background: #fff; box-sizing: border-box; box-shadow: 8px 8px 0 #ccc;"><iframe src="herramientas/${archivo}" style="width: 100%; border: none; display: block; overflow: hidden;" scrolling="no" onload="this.style.height=(this.contentWindow.document.body.scrollHeight+10)+'px';"></iframe></div>`;
        });
        
        // B. Efectos de Texto
        rawText = rawText.replace(/>>>\s*(.+)/g, 'TYPEWRITER_START$1TYPEWRITER_END');
        
        // C. Renderizado Markdown
        let htmlContent = marked.parse(rawText);
        htmlContent = htmlContent.replace(/TYPEWRITER_START(.*?)TYPEWRITER_END/g, '<div class="type-effect" data-text="$1"></div>');

        // D. Inyectar HTML Final
        container.innerHTML = `
            <div class="article-container">
                <header class="article-header">
                    <h1 class="article-title">${articulo.titulo}</h1>
                    <p class="article-bajada">${articulo.bajada}</p>
                    <span class="article-meta">:: ${articulo.categoria} | POR ${articulo.autor} | ${articulo.fecha}</span>
                </header>
                <img src="${articulo.imagen}" class="article-cover" alt="Portada">
                <div class="article-body">${htmlContent}</div>
                <div class="cafecito-wrapper">
                    <p class="cafecito-subtitle">/// SUSTENTABILIDAD DEL PROYECTO ///</p>
                    <a href="https://cafecito.app" target="_blank" class="cafecito-btn">INVITANOS UN CAFÉ_</a>
                </div>
                <div class="navigation-footer"><a href="index.html" class="back-btn">< VOLVER AL INICIO</a></div>
            </div>`;
        
        document.title = `${articulo.titulo} | RENDER_FINAL`;

        initObservers(); 
        activarLogicaInteractiva(); 
        cargarGraficoExterno();

    } else {
        container.innerHTML = `<div style="text-align:center; padding:100px;"><h1>404_</h1><p>Artículo no encontrado.</p><a href="index.html" class="back-btn">VOLVER</a></div>`;
    }
}

// --- 5. FUNCIONES AUXILIARES ---

function initObservers() {
    window.onscroll = function() {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        let bar = document.getElementById("myBar"); if (bar) bar.style.width = scrolled + "%";
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.classList.contains('type-effect') && !entry.target.classList.contains('typed')) {
                entry.target.classList.add('visible'); entry.target.classList.add('typed'); startTypewriter(entry.target);
            }
        });
    }, { threshold: 0.2 });
    document.querySelectorAll('.type-effect').forEach(el => observer.observe(el));
}

function startTypewriter(element) {
    const text = element.getAttribute('data-text'); element.innerText = ""; element.classList.add('cursor');
    let i = 0; function type() { if (i < text.length) { element.innerHTML += text.charAt(i); i++; setTimeout(type, 25); } else { element.classList.remove('cursor'); } } type();
}

function activarLogicaInteractiva() {
    document.querySelectorAll('.factor').forEach(f=>{
        f.addEventListener('click', ()=>{ abrirModal(f.dataset.title||f.innerText, f.dataset.text); });
    });
    
    document.querySelectorAll('[data-target]').forEach(el=>{
        let target=+el.dataset.target, count=0, inc=target/60;
        function upd(){ count+=inc; if(count<target){ el.innerText=Math.floor(count); requestAnimationFrame(upd); }else{ el.innerText=target; } }
        upd();
    });
    
    document.querySelectorAll('[data-items]').forEach(el=>{
        let items=el.dataset.items.split(","), out=document.createElement("div"); out.className="timeline-output"; el.after(out);
        items.forEach(i=>{ let [y,v]=i.split(":"); let b=document.createElement("div"); b.className="timeline-item"; b.innerText=y; b.onclick=()=>{out.innerText=y+": "+v;}; el.appendChild(b); });
    });
}

const modal = document.getElementById('infoModal');
const mTitle = document.getElementById('modalTitle');
const mText = document.getElementById('modalText');
window.abrirModal = function(t,x) { if(modal){ mTitle.innerText=t; mText.innerText=x; modal.classList.add('active'); }};
window.cerrarModal = function() { if(modal) modal.classList.remove('active'); };

function cargarGraficoExterno() {
    const gC = document.getElementById('grafico-3vidas');
    if (gC) fetch('grafico_tres-vidas-un-mismo-exilio.html').then(r=>r.ok?r.text():'Err').then(d=>{if(d!=='Err')gC.innerHTML=d});
}

function toggleAbout() { document.getElementById('about-overlay').classList.toggle('active'); }
function volverHome() { window.location.href = "index.html"; }

// --- 6. ESCUCHADOR DE MENSAJES (NUEVO) ---
// Esto permite que el iframe le diga al padre: "Agrandá el marco que ya calculé resultados"
window.addEventListener('message', function(e) {
    if (e.data.height) {
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            iframe.style.height = e.data.height + 'px';
        });
    }
}, false);