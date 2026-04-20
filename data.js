// 1. LISTA DE ARTÍCULOS
const articulos = [
    // --- ARTÍCULO NUEVO: CALCULADORA (Con herramienta incrustada) ---
    {
        id: "art-8",
        titulo: "TU SUELDO EN METROS CUADRADOS",
        bajada: "La calculadora de la realidad inmobiliaria.",
        autor: "JANET USINGER",
        categoria: "DATOS",
        fecha: "18.02.26",
        imagen: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
        destacado: true, 
        cuerpo: `
**CRISIS HABITACIONAL**

En Argentina, los promedios mienten. Un alquiler en Palermo no vale lo mismo que en Paraná. Por eso, no vamos a usar bases de datos desactualizadas. **Vamos a usar tu realidad.**

Según los expertos, una persona **no debería destinar más del 40% de su ingreso** al alquiler para vivir dignamente. ¿Se cumple en tu caso?

---

### CALCULADORA DE ACCESO

Ingresá tus datos reales para visualizar qué tamaño de vivienda podrías alquilar hoy manteniendo tu economía sana.

[[HERRAMIENTA:calculadora-alquiler.html]]

**CONCLUSIÓN**

Si el cuadrado es rojo, el mercado te está expulsando. Si es azul, resistís. El derecho a la vivienda hoy se mide en centímetros.
        `
    },

    // --- ARTÍCULO 1: IGNACIO (Carga Externa para preservar textos) ---
    {
        id: "art-7",
        titulo: "TRES VIDAS, UN MISMO EXILIO",
        bajada: "La reconstrucción visual del viaje sin retorno de 1939.",
        autor: "IGNACIO SÁNCHEZ",
        categoria: "VISUAL",
        fecha: "14.02.26",
        imagen: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80",
        destacado: false, 
        cuerpo: `
**CRÓNICA VISUAL**

En marzo de 1939, miles de personas se agolparon en los puertos del Levante español.

>>> "No eligieron irse. Eligieron sobrevivir."

A continuación, la visualización de la travesía.

---

<div id="grafico-3vidas" style="min-height: 400px; display:flex; align-items:center; justify-content:center; background:#fcfcfc;">
    <span style="font-family:'Space Mono'; font-size:0.8rem; color:#999;">Cargando visualización...</span>
</div>

---

**CONCLUSIÓN**

Esta pieza visual es un recordatorio de que detrás de cada cifra, hay una biografía.
        `
    },
    // --- ARTÍCULO 2: DEUDA ECOLÓGICA ---
    {
        id: "art-1",
        titulo: "LA DEUDA ECOLÓGICA",
        bajada: "Analizamos 50 años de emisiones.",
        autor: "JANET USINGER",
        categoria: "DATOS",
        fecha: "12.02.26",
        imagen: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
        destacado: false,
        cuerpo: `
**INTRODUCCIÓN**

La provincia de Entre Ríos ha experimentado cambios drásticos.

>>> "No es un ciclo natural."

---
### 1. LOS PUNTOS CRÍTICOS
* Foco 1: Humedales.
* Foco 2: Zona Núcleo.
        `
    },
    {
        id: "art-2",
        titulo: "EL ALGORITMO DEL VOTO",
        bajada: "Cómo la IA está rediseñando las campañas.",
        autor: "JOSEFINA CHÁVES",
        categoria: "VISUAL",
        fecha: "10.02.26",
        imagen: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
        destacado: false,
        cuerpo: "Texto de prueba."
    },
    {
        id: "art-3",
        titulo: "MAPA DEL SUICIDIO",
        bajada: "Exploración interactiva de datos nacionales.",
        autor: "JANET USINGER",
        categoria: "CRÓNICAS",
        fecha: "08.02.26",
        imagen: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
        destacado: false,
        cuerpo: `
> No es un dato. Es una vida interrumpida.

---

## 1. EL NÚMERO

<div data-target="4410"></div>

<p style="text-align:center; font-size:0.8rem; color:#666;">
Casos registrados en 2021
</p>

---

## 2. EVOLUCIÓN

<div data-items="2019:4113,2020:4250,2021:4410,2022:4220"></div>

---

## 3. FACTORES (Hacé click para ver detalles)

<div class="factor" data-title="SALUD MENTAL" data-text="El 56% de los casos tenía un diagnóstico previo sin tratamiento adecuado.">
Salud Mental
</div>

<div class="factor" data-title="TERRITORIO" data-text="En zonas rurales aisladas, la tasa es un 20% mayor que en centros urbanos.">
Territorio
</div>

<div class="factor" data-title="ECONOMÍA" data-text="El desempleo prolongado aumenta el riesgo relativo en hombres mayores de 40 años.">
Empleo
</div>

---

Conclusión: los datos permiten entender. La interacción permite dimensionar.
`
    },
    {
        id: "art-4",
        titulo: "LA INFLACIÓN INVISIBLE",
        bajada: "Scrapeo de precios.",
        autor: "ÁNGELA TORRES",
        categoria: "DATOS",
        fecha: "05.02.26",
        imagen: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=800&q=80",
        destacado: false,
        cuerpo: "En producción."
    },
    {
        id: "art-5",
        titulo: "RÍOS DE PLÁSTICO",
        bajada: "El recorrido de los desechos.",
        autor: "IGNACIO SÁNCHEZ",
        categoria: "VISUAL",
        fecha: "03.02.26",
        imagen: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=800&q=80",
        destacado: false,
        cuerpo: "En producción."
    },
    {
        id: "art-6",
        titulo: "CÓDIGO URBANO",
        bajada: "Cómo se mueve la gente.",
        autor: "JOSEFINA CHÁVES",
        categoria: "CRÓNICAS",
        fecha: "01.02.26",
        imagen: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=800&q=80",
        destacado: false,
        cuerpo: "En producción."
    }
];

// 2. EQUIPO
const equipo = [
    { nombre: "IGNACIO SÁNCHEZ", rol: "Director Editorial", link: "https://linkedin.com", foto: "images/ignacio.jpeg" },
    { nombre: "JANET USINGER", rol: "Editora General & Interactividad", link: "https://www.linkedin.com/in/janetusinger", foto: "images/jan.jpg" },
    { nombre: "JOSEFINA CHÁVES", rol: "Ingeniera de Datos", link: "https://www.linkedin.com/in/josefinachaves?utm_source=share_via&utm_content=profile&utm_medium=member_ios", foto: "images/jo.jpeg" },
    { nombre: "ÁNGELA TORRES", rol: "Investigadora & Cronista", link: "https://twitter.com", foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" }
];