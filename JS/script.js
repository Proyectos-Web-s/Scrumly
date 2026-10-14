// Este archivo reúne las interacciones compartidas por las páginas de Scrumly.
// Cada bloque busca sus elementos en el HTML y solo se activa en las páginas que los contienen.

// Abre o cierra el menú principal al pulsar su botón.

const botonMenu = document.getElementById("boton-menu");
const menu = document.getElementById("menu");

if (botonMenu && menu) {
    botonMenu.addEventListener("click", () => {
        menu.classList.toggle("activo");
    });
}

// Abre el submenú del título pulsado y cierra los demás submenús abiertos.
function desplegar(elemento) {
    const itemMenu = elemento.closest(".Item-Menu");
    if (!itemMenu) return;

    const submenu = itemMenu.querySelector(".Submenu");
    const flecha = elemento.querySelector(".bi-chevron-down");

    // Mantiene abierto como máximo un submenú a la vez.
    document.querySelectorAll(".Item-Menu .Submenu").forEach((sub) => {
        if (sub !== submenu) {
            sub.classList.remove("activo");
        }
    });

    // Actualiza también la orientación visual de las flechas de los submenús.
    document.querySelectorAll(".Titulo-Menu .bi-chevron-down").forEach((icono) => {
        if (icono !== flecha) {
            icono.classList.remove("girada");
        }
    });

    if (submenu) {
        submenu.classList.toggle("activo");
    }

    if (flecha) {
        flecha.classList.toggle("girada");
    }
}

document.querySelectorAll(".Titulo-Menu").forEach((titulo) => {
    titulo.addEventListener("click", () => desplegar(titulo));
});

// Recorrido interactivo del SDLC: cada objeto contiene el contenido de una etapa
// y la clase de Bootstrap Icons que se muestra en su botón y en la tarjeta.
const botonesEtapaSDLC = document.querySelectorAll(".Boton-Etapa-SDLC");
const panelEtapaSDLC = document.querySelector("#panel-etapa-sdlc");

const etapasSDLC = [
    {
        nombre: "Requisitos",
        icono: "bi-clipboard2-check",
        descripcion: "Se identifican y documentan las necesidades del usuario y las funcionalidades que debe tener el sistema.",
        objetivo: "Determinar qué debe hacer el software.",
        detalle: "En esta etapa se conversa con usuarios, clientes y otras personas interesadas para entender qué problema debe resolver el sistema. Se documentan los requisitos funcionales, que describen tareas y respuestas esperadas, y los no funcionales, como seguridad, rendimiento y accesibilidad. También se aclaran prioridades, restricciones y criterios de aceptación. Validar esta información con las partes involucradas ayuda a evitar malentendidos y cambios costosos en las siguientes etapas."
    },
    {
        nombre: "Diseño",
        icono: "bi-vector-pen",
        descripcion: "Se define cómo se construirá el sistema. Se establece su arquitectura, componentes y relaciones.",
        objetivo: "Establecer la estructura y funcionamiento del software.",
        detalle: "A partir de los requisitos se define cómo se organizará y construirá el sistema: su arquitectura, componentes e interfaces. También se modelan los datos y flujos de uso, y se seleccionan tecnologías adecuadas. El diseño considera seguridad, rendimiento, accesibilidad y facilidad de mantenimiento. Diagramas, prototipos y decisiones técnicas ayudan a comparar alternativas, detectar riesgos y guiar al equipo durante la implementación."
    },
    {
        nombre: "Desarrollo",
        icono: "bi-code-slash",
        descripcion: "Se implementa el software a partir del diseño definido, escribiendo el código necesario para construir el sistema.",
        objetivo: "Transformar el diseño en un sistema funcional.",
        detalle: "El equipo convierte el diseño en código y construye las funciones por partes pequeñas. Los componentes siguen convenciones comunes y se integran mediante las interfaces acordadas. El control de versiones facilita la colaboración y revisión de cambios. Las revisiones de código y pruebas automatizadas ayudan a detectar defectos pronto y mantener una base clara. Cada incremento produce una versión ejecutable que puede verificarse antes de liberarla."
    },
    {
        nombre: "Pruebas",
        icono: "bi-clipboard2-check",
        descripcion: "Se comprueba el software para detectar errores y verificar que cumple con los requisitos establecidos.",
        objetivo: "Comprobar que el sistema funciona correctamente.",
        detalle: "Se compara el comportamiento del software con los requisitos para comprobar sus funciones y encontrar defectos. Las pruebas unitarias revisan piezas pequeñas; las de integración verifican la comunicación entre componentes; y las de sistema evalúan el producto completo. También pueden comprobarse seguridad, rendimiento, accesibilidad y facilidad de uso. Los resultados se registran, los defectos se priorizan y se corrigen. Luego se repiten las pruebas para asegurar que los cambios no afecten funciones existentes."
    },
    {
        nombre: "Despliegue",
        icono: "bi-rocket-takeoff",
        descripcion: "El software se instala y se pone a disposición de los usuarios para comenzar a utilizarlo.",
        objetivo: "Llevar el sistema al entorno donde será utilizado.",
        detalle: "Una vez aprobada la versión, se prepara la infraestructura y configuración para ponerla a disposición de los usuarios. Se coordinan ambientes, permisos y servicios; cuando hace falta, se respaldan o migran los datos y se automatiza la instalación. Antes y después del lanzamiento se comprueba que el sistema esté disponible. La publicación puede ser gradual para observar su comportamiento y limitar riesgos. También se planifica la supervisión y cómo volver a una versión anterior si surge un problema."
    },
    {
        nombre: "Mantenimiento",
        icono: "bi-wrench",
        descripcion: "Una vez que el sistema está en funcionamiento, se realizan correcciones, mejoras y modificaciones cuando aparecen nuevos requisitos o problemas.",
        objetivo: "Mantener y evolucionar el software.",
        detalle: "Después del lanzamiento se supervisa el sistema y se atienden problemas reportados o detectados en producción. El mantenimiento correctivo soluciona defectos; el adaptativo responde a cambios de plataformas o dependencias; y el evolutivo incorpora mejoras y nuevas necesidades. El equipo prioriza solicitudes y publica actualizaciones. Las correcciones de seguridad, la revisión del rendimiento y las pruebas de regresión ayudan a conservar la estabilidad durante la vida útil del software."
    }
];

if (botonesEtapaSDLC.length && panelEtapaSDLC) {
    const tarjetaEtapa = panelEtapaSDLC.querySelector(".Tarjeta-Etapa-Volteable");
    const caraFrontal = panelEtapaSDLC.querySelector(".Cara-Etapa-Frontal");
    const caraPosterior = panelEtapaSDLC.querySelector(".Cara-Etapa-Posterior");

    // Cambia entre el resumen de la etapa y su cara con información ampliada.
    function mostrarCaraEtapa(mostrarDetalle) {
        if (!tarjetaEtapa || !caraFrontal || !caraPosterior) return;

        // La clase activa el giro; aria-hidden e inert ocultan la cara no visible también a tecnologías asistivas.
        tarjetaEtapa.classList.toggle("mostrar-detalle", mostrarDetalle);
        caraFrontal.setAttribute("aria-hidden", String(mostrarDetalle));
        caraFrontal.inert = mostrarDetalle;
        caraPosterior.setAttribute("aria-hidden", String(!mostrarDetalle));
        caraPosterior.inert = !mostrarDetalle;
    }

    // Selecciona una etapa, actualiza la tarjeta y reinicia el giro al lado del resumen.
    function seleccionarEtapaSDLC(indice) {
        const etapa = etapasSDLC[indice];
        const botonActivo = botonesEtapaSDLC[indice];
        if (!etapa || !botonActivo) return;

        // Sincroniza selección, apariencia y foco siguiendo el patrón de pestañas accesibles.
        botonesEtapaSDLC.forEach((boton, botonIndice) => {
            const activa = botonIndice === indice;
            boton.classList.toggle("activo", activa);
            boton.setAttribute("aria-selected", String(activa));
            boton.tabIndex = activa ? 0 : -1;
        });

        // Actualiza los textos y los íconos de ambas caras con los datos de la etapa seleccionada.
        panelEtapaSDLC.setAttribute("aria-labelledby", botonActivo.id);
        panelEtapaSDLC.querySelector(".Etiqueta-Panel-Etapa").textContent = `ETAPA ${String(indice + 1).padStart(2, "0")} DE 06`;
        panelEtapaSDLC.querySelector(".Titulo-Panel-Etapa").textContent = etapa.nombre;
        panelEtapaSDLC.querySelector(".Descripcion-Panel-Etapa").textContent = etapa.descripcion;
        panelEtapaSDLC.querySelector(".Texto-Objetivo-Etapa").textContent = etapa.objetivo;

        const iconoFrontal = panelEtapaSDLC.querySelector(".Icono-Panel-Etapa i");
        const iconoBoton = botonActivo.querySelector(".Icono-Boton-Etapa i");
        iconoFrontal.className = `bi ${etapa.icono}`;
        iconoBoton.className = `bi ${etapa.icono}`;

        caraPosterior.querySelector(".Detalle-Texto-Etapa").textContent = etapa.detalle;
        mostrarCaraEtapa(false);
    }

    botonesEtapaSDLC.forEach((boton, indice) => {
        boton.addEventListener("click", () => seleccionarEtapaSDLC(indice));
        boton.addEventListener("keydown", (evento) => {
            let nuevoIndice = indice;

            // Permite recorrer las etapas con flechas y saltar al inicio o al final con Home/End.
            if (evento.key === "ArrowRight") nuevoIndice = (indice + 1) % botonesEtapaSDLC.length;
            else if (evento.key === "ArrowLeft") nuevoIndice = (indice - 1 + botonesEtapaSDLC.length) % botonesEtapaSDLC.length;
            else if (evento.key === "Home") nuevoIndice = 0;
            else if (evento.key === "End") nuevoIndice = botonesEtapaSDLC.length - 1;
            else return;

            evento.preventDefault();
            botonesEtapaSDLC[nuevoIndice].focus();
            seleccionarEtapaSDLC(nuevoIndice);
        });
    });

    // El cursor muestra la cara informativa; al salir vuelve a la cara de resumen.
    tarjetaEtapa.addEventListener("pointerenter", () => mostrarCaraEtapa(true));
    tarjetaEtapa.addEventListener("pointerleave", () => mostrarCaraEtapa(false));

    seleccionarEtapaSDLC(0);
}

// Contenido de las normas de calidad. Cada elemento representa una característica desplegable.
const datosEstandares = {
    iso9126: {
        titulo: "ISO 9126",
        subtitulo: "Estándar retirado · 6 características de calidad del producto",
        descripcion: "ISO/IEC 9126 fue un estándar utilizado para definir un modelo de calidad de productos de software.",
        elementos: [
            { nombre: "Funcionalidad", descripcion: "Capacidad del sistema para cumplir funciones esperadas y satisfacer requisitos.", abierto: false },
            { nombre: "Fiabilidad", descripcion: "Capacidad del software para operar sin fallas y mantener el servicio estable.", abierto: false },
            { nombre: "Usabilidad", descripcion: "Facilidad con la que los usuarios pueden comprender, aprender y operar el sistema.", abierto: false },
            { nombre: "Eficiencia", descripcion: "Uso adecuado de recursos y tiempos de respuesta sin comprometer el rendimiento.", abierto: false },
            { nombre: "Mantenibilidad", descripcion: "Facilidad para analizar, corregir, adaptar y mejorar el software.", abierto: false },
            { nombre: "Portabilidad", descripcion: "Adaptabilidad, instalabilidad, coexistencia y reemplazabilidad del software.", abierto: false }
        ]
    },
    iso25000: {
        titulo: "ISO/IEC 25000",
        subtitulo: "Familia SQuaRE · ISO/IEC 25010: 2023 · 9 características",
        descripcion: "ISO/IEC 25000 es una familia de estándares orientada a la calidad del software y la medición de sistemas de software.",
        elementos: [
            { nombre: "Adecuación funcional", descripcion: "Grado en que un producto o sistema proporciona funciones que satisfacen las necesidades declaradas e implícitas.", abierto: false },
            { nombre: "Eficiencia de desempeño", descripcion: "Relación entre los recursos utilizados y el rendimiento alcanzado por el software.", abierto: false },
            { nombre: "Compatibilidad", descripcion: "Capacidad del sistema para intercambiar información y operar con otros productos o entornos.", abierto: false },
            { nombre: "Capacidad de interacción", descripcion: "Grado en que el software permite una interacción efectiva con los usuarios y otros sistemas.", abierto: false },
            { nombre: "Fiabilidad", descripcion: "Capacidad del sistema para mantener un nivel de rendimiento bajo condiciones establecidas.", abierto: false },
            { nombre: "Seguridad", descripcion: "Protección de la información y los datos frente a accesos no autorizados o situaciones de riesgo.", abierto: false },
            { nombre: "Mantenibilidad", descripcion: "Facilidad para modificar, corregir, mejorar o adaptar el software a cambios futuros.", abierto: false },
            { nombre: "Flexibilidad", descripcion: "Capacidad del producto para adaptarse a cambios de entorno, requisitos o contextos operativos.", abierto: false },
            { nombre: "Seguridad (safety)", descripcion: "Grado en que un producto, en un contexto de uso, evita riesgos para personas, procesos y sistemas.", abierto: false }
        ]
    }
};

const selector = document.querySelector(".Selector-Estandares");
const botonesEstandar = document.querySelectorAll(".Boton-Estandar");
const cuadroEstandar = document.querySelector(".Cuadro-Estandar");

// Genera el contenido del estándar elegido y conecta sus características desplegables.
function mostrarEstandar(clave) {
    const datos = datosEstandares[clave];
    if (!cuadroEstandar || !datos) return;

    // Reconstruye la tarjeta a partir de los datos del estándar seleccionado.
    cuadroEstandar.innerHTML = `
        <h2 class="Titulo-Estandar">${datos.titulo}</h2>
        <p class="Subtitulo-Estandar">${datos.subtitulo}</p>
        <p class="Texto-Estandar">${datos.descripcion}</p>
        ${datos.elementos.map((elemento) => `
            <div class="Caracteristica-Estandar ${elemento.abierto ? "activa" : ""}">
                <span>${elemento.nombre}</span>
                <i class="bi ${elemento.abierto ? "bi-chevron-up" : "bi-chevron-down"}"></i>
                <p>${elemento.descripcion}</p>
            </div>
        `).join("")}
    `;

    // Las características se crean dinámicamente, por eso sus eventos se conectan después de renderizarlas.
    const nuevasCaracteristicas = cuadroEstandar.querySelectorAll(".Caracteristica-Estandar");
    nuevasCaracteristicas.forEach((caracteristica) => {
        caracteristica.addEventListener("click", function () {
            const abrir = !caracteristica.classList.contains("activa");

            // Mantiene abierta como máximo una característica del estándar visible.
            nuevasCaracteristicas.forEach((otraCaracteristica) => {
                const activa = otraCaracteristica === caracteristica && abrir;
                const flecha = otraCaracteristica.querySelector("i");

                otraCaracteristica.classList.toggle("activa", activa);
                flecha?.classList.toggle("bi-chevron-up", activa);
                flecha?.classList.toggle("bi-chevron-down", !activa);
            });

            if (abrir) {
                // Espera al despliegue visual antes de desplazar la característica a la vista.
                setTimeout(() => {
                    caracteristica.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                }, 120);
            }
        });
    });
}

if (selector && botonesEstandar.length) {
    botonesEstandar.forEach((boton) => {
        boton.addEventListener("click", () => {
            botonesEstandar.forEach((btn) => btn.classList.remove("activo"));
            boton.classList.add("activo");

            // El selector usa una clase distinta para aplicar el estilo propio de ISO/IEC 25000.
            selector.classList.toggle("iso25000", boton.textContent.trim() === "ISO/IEC 25000");
            const clave = boton.textContent.trim() === "ISO/IEC 25000" ? "iso25000" : "iso9126";
            mostrarEstandar(clave);

            if (cuadroEstandar) {
                cuadroEstandar.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        });
    });

    mostrarEstandar("iso9126");
}

// Pestañas de Scrum: alternan entre Roles, Eventos y Artefactos.
const botonesPestana = document.querySelectorAll(".Boton-Pestana");
const panelesPestana = document.querySelectorAll(".Panel-Pestana");

// Cambia el grupo de contenido visible en la sección de Scrum.
function activarPestana(nombre) {
    // Marca el botón seleccionado y muestra únicamente el panel correspondiente.
    botonesPestana.forEach((boton) => {
        const activa = boton.dataset.tab === nombre;
        boton.classList.toggle("activo", activa);
        boton.setAttribute("aria-selected", String(activa));
    });

    panelesPestana.forEach((panel) => {
        const visible = panel.dataset.panel === nombre;
        panel.classList.toggle("activo", visible);
        panel.hidden = !visible;
    });
}

if (botonesPestana.length && panelesPestana.length) {
    botonesPestana.forEach((boton) => {
        boton.addEventListener("click", () => activarPestana(boton.dataset.tab));
    });

    activarPestana("roles");
}

// Pestañas de herramientas de calidad; aria-controls enlaza cada botón con su panel.
const botonesCategoriaHerramienta = document.querySelectorAll(".Boton-Herramienta");
const panelesHerramienta = document.querySelectorAll(".Panel-Herramienta");

// Activa la categoría enlazada con el botón recibido y oculta las demás categorías.
function activarCategoriaHerramienta(boton) {
    const panelId = boton.getAttribute("aria-controls");
    const panelActivo = panelId ? document.getElementById(panelId) : null;

    if (!panelActivo) return;

    // Mantiene una sola pestaña activa y enfocable en el grupo.
    botonesCategoriaHerramienta.forEach((otroBoton) => {
        const activo = otroBoton === boton;
        otroBoton.classList.toggle("activo", activo);
        otroBoton.setAttribute("aria-selected", String(activo));
        otroBoton.tabIndex = activo ? 0 : -1;
    });

    panelesHerramienta.forEach((panel) => {
        panel.hidden = panel !== panelActivo;
    });
}

botonesCategoriaHerramienta.forEach((boton, indice) => {
    boton.addEventListener("click", () => activarCategoriaHerramienta(boton));
    boton.addEventListener("keydown", (evento) => {
        let nuevoIndice = indice;

        // Añade navegación con teclado entre las categorías de herramientas.
        if (evento.key === "ArrowRight") nuevoIndice = (indice + 1) % botonesCategoriaHerramienta.length;
        else if (evento.key === "ArrowLeft") nuevoIndice = (indice - 1 + botonesCategoriaHerramienta.length) % botonesCategoriaHerramienta.length;
        else if (evento.key === "Home") nuevoIndice = 0;
        else if (evento.key === "End") nuevoIndice = botonesCategoriaHerramienta.length - 1;
        else return;

        evento.preventDefault();
        const nuevoBoton = botonesCategoriaHerramienta[nuevoIndice];
        nuevoBoton.focus();
        activarCategoriaHerramienta(nuevoBoton);
    });
});

const botonesMasHerramienta = document.querySelectorAll(".Boton-Mas-Herramienta");

// Expande o contrae la información adicional de cada tarjeta de herramienta.
botonesMasHerramienta.forEach((boton) => {
    boton.addEventListener("click", () => {
        const tarjeta = boton.closest(".Tarjeta-Herramienta");
        const detalleId = boton.getAttribute("aria-controls");
        const detalle = detalleId ? document.getElementById(detalleId) : null;
        const icono = boton.querySelector("i");
        const texto = boton.querySelector("span");

        if (!tarjeta || !detalle || !icono || !texto) return;

        const abierta = boton.getAttribute("aria-expanded") !== "true";
        boton.setAttribute("aria-expanded", String(abierta));
        tarjeta.classList.toggle("abierta", abierta);
        detalle.hidden = !abierta;
        texto.textContent = abierta ? "Ocultar" : "Ver más";
        icono.classList.toggle("bi-chevron-up", abierta);
        icono.classList.toggle("bi-chevron-down", !abierta);
    });
});

// Agrega apertura por clic, Enter o espacio a las tarjetas explicativas de modelos.
function configurarTarjetasInteractivas(selectorTarjeta) {
    document.querySelectorAll(selectorTarjeta).forEach((tarjeta) => {
        // Alterna el estado que CSS utiliza para mostrar u ocultar el contenido ampliado.
        function alternar() {
            const abierta = tarjeta.getAttribute("aria-expanded") === "true";
            tarjeta.setAttribute("aria-expanded", String(!abierta));
        }

        tarjeta.addEventListener("click", alternar);
        tarjeta.addEventListener("keydown", (evento) => {
            if (evento.key === "Enter" || evento.key === " ") {
                evento.preventDefault();
                alternar();
            }
        });
    });
}

// Aplica el mismo comportamiento a las tarjetas de los modelos en V e iterativo.
configurarTarjetasInteractivas(".Tarjeta-V-Diagrama");
configurarTarjetasInteractivas(".Tarjeta-Iterativa");

// Variantes de la línea de tiempo y de la tarjeta informativa para Sprints de 1 a 4 semanas.
// Cada duración define la actividad destacada y la secuencia de eventos/desarrollo.
const datosSprint = {
    1: {
        duracion: "1 semana",
        tarjetaActiva: {
            etiqueta: "INICIO DEL SPRINT",
            titulo: "Planificación",
            objetivo: "Definir el objetivo del Sprint y seleccionar el trabajo prioritario.",
            momento: "Inicio del Sprint",
            duracion: "Hasta 1 día"
        },
        lineaTiempo: [
            ["Planificación", "Se define el objetivo y el trabajo del Sprint."],
            ["Semana 1 · Desarrollo del incremento", "El equipo construye el incremento."],
            ["Daily", "El equipo inspecciona el progreso y adapta el plan."],
            ["Cierre · Incremento terminado", "Se completa un incremento usable."],
            ["Review", "Se inspecciona el resultado con los interesados."],
            ["Retrospectiva", "El equipo identifica mejoras para el próximo Sprint."]
        ]
    },
    2: {
        duracion: "2 semanas",
        tarjetaActiva: {
            etiqueta: "DURANTE EL SPRINT",
            titulo: "Daily",
            objetivo: "Revisar el progreso hacia el objetivo y detectar impedimentos.",
            momento: "Cada día del Sprint",
            duracion: "15 minutos"
        },
        lineaTiempo: [
            ["Planificación", "Se define el objetivo y el trabajo del Sprint."],
            ["Semana 1 · Desarrollo del incremento", "El equipo construye el incremento."],
            ["Daily", "El equipo inspecciona el progreso y adapta el plan."],
            ["Semana 2 · Desarrollo del incremento", "El equipo completa y verifica el incremento."],
            ["Daily", "El equipo inspecciona el progreso y adapta el plan."],
            ["Cierre · Incremento terminado", "Se completa un incremento usable."],
            ["Review", "Se inspecciona el resultado con los interesados."],
            ["Retrospectiva", "El equipo identifica mejoras para el próximo Sprint."]
        ]
    },
    3: {
        duracion: "3 semanas",
        tarjetaActiva: {
            etiqueta: "CIERRE DEL SPRINT",
            titulo: "Review",
            objetivo: "Inspeccionar el incremento y recoger información para adaptar el producto.",
            momento: "Al finalizar el Sprint, antes de la retrospectiva.",
            duracion: "Hasta 3 horas como referencia"
        },
        lineaTiempo: [
            ["Planificación", "Se define el objetivo y el trabajo del Sprint."],
            ["Semana 1 · Desarrollo del incremento", "El equipo construye el incremento."],
            ["Daily", "El equipo inspecciona el progreso y adapta el plan."],
            ["Semana 2 · Desarrollo del incremento", "El equipo construye y verifica nuevas funcionalidades."],
            ["Daily", "El equipo inspecciona el progreso y adapta el plan."],
            ["Semana 3 · Desarrollo del incremento", "El equipo completa el incremento del Sprint."],
            ["Daily", "El equipo inspecciona el progreso y adapta el plan."],
            ["Cierre · Incremento terminado", "Se completa un incremento usable."],
            ["Review", "Se inspecciona el resultado con los interesados."],
            ["Retrospectiva", "El equipo identifica mejoras para el próximo Sprint."]
        ]
    },
    4: {
        duracion: "4 semanas",
        tarjetaActiva: {
            etiqueta: "CIERRE DEL SPRINT",
            titulo: "Retrospectiva",
            objetivo: "Analizar cómo trabajó el equipo y definir mejoras para el próximo Sprint.",
            momento: "Después de la Review y antes del siguiente Sprint.",
            duracion: "1–3 horas recomendadas"
        },
        lineaTiempo: [
            ["Planificación", "Se define el objetivo y el trabajo del Sprint."],
            ["Semana 1 · Desarrollo del incremento", "El equipo construye el incremento."],
            ["Daily", "El equipo inspecciona el progreso y adapta el plan."],
            ["Semana 2 · Desarrollo del incremento", "El equipo construye y verifica nuevas funcionalidades."],
            ["Daily", "El equipo inspecciona el progreso y adapta el plan."],
            ["Semana 3 · Desarrollo del incremento", "El equipo completa nuevas funcionalidades."],
            ["Daily", "El equipo inspecciona el progreso y adapta el plan."],
            ["Semana 4 · Desarrollo del incremento", "El equipo termina y verifica el incremento."],
            ["Daily", "El equipo inspecciona el progreso y adapta el plan."],
            ["Cierre · Incremento terminado", "Se completa un incremento usable."],
            ["Review", "Se inspecciona el resultado con los interesados."],
            ["Retrospectiva", "El equipo identifica mejoras para el próximo Sprint."]
        ]
    }
};

// Referencias a los controles y contenedores que se actualizan al elegir una duración.
const botonesSprint = document.querySelectorAll(".Boton-Sprint");
const duracionSprint = document.querySelector("#Duracion-Sprint");
const lineaTiempoSprint = document.querySelector("#Timeline-Sprint");
const tarjetaInformacionSprint = document.querySelector("#Tarjeta-Sprint");

// Construye la línea de tiempo y la tarjeta informativa para la duración elegida.
function mostrarSprint(numero) {
    const sprint = datosSprint[numero];
    if (!sprint || !lineaTiempoSprint || !tarjetaInformacionSprint || !duracionSprint) return;

    // Actualiza la duración visible y prepara grupos para ordenar el contenido en inicio, semanas y cierre.
    duracionSprint.textContent = sprint.duracion;
    const grupos = [];
    let numeroSemana = 0;

    // Agrupa cada Daily con su semana y deja los eventos finales dentro de la sección de cierre.
    for (let indice = 0; indice < sprint.lineaTiempo.length; indice += 1) {
        const [titulo, descripcion] = sprint.lineaTiempo[indice];

        if (titulo === "Planificación") {
            grupos.push({ etiqueta: "Inicio", elementos: [[titulo, descripcion]] });
            continue;
        }

        if (titulo.startsWith("Semana")) {
            numeroSemana += 1;
            const elementos = [];
            const siguiente = sprint.lineaTiempo[indice + 1];

            if (siguiente && siguiente[0] === "Daily") {
                elementos.push(siguiente);
                indice += 1;
            }

            grupos.push({ etiqueta: `Semana ${numeroSemana} · Desarrollo del incremento`, elementos });
            continue;
        }

        if (titulo.startsWith("Cierre")) {
            grupos.push({ etiqueta: titulo, elementos: sprint.lineaTiempo.slice(indice + 1) });
        }
    }

    // Dibuja las secciones de la línea de tiempo y resalta el evento principal de esta duración.
    lineaTiempoSprint.innerHTML = grupos.map((grupo) => `
        <section class="Mini-Seccion-Sprint ${grupo.etiqueta.startsWith("Cierre") ? "Cierre-Sprint" : ""}">
            <h4>${grupo.etiqueta}</h4>
            ${grupo.elementos.map(([titulo]) => `
                <div class="Item-Sprint">
                    <button class="${
                        (numero === 1 && titulo === "Planificación") ||
                        (numero === 2 && titulo === "Daily") ||
                        (numero === 3 && titulo === "Review") ||
                        (numero === 4 && titulo === "Retrospectiva")
                            ? "activo"
                            : ""
                    }" type="button"><i class="bi ${titulo === "Planificación" ? "bi-calendar3" : titulo === "Daily" ? "bi-chat" : titulo === "Review" ? "bi-search" : "bi-arrow-repeat"}"></i>${titulo}</button>
                </div>
            `).join("")}
        </section>
    `).join("");

    // Elige el ícono adecuado para el evento mostrado en la tarjeta resumen.
    const iconoTarjeta = {
        Planificación: "bi-calendar3",
        Daily: "bi-chat",
        Review: "bi-search",
        Retrospectiva: "bi-arrow-repeat"
    }[sprint.tarjetaActiva.titulo];

    // Renderiza objetivo, momento y duración recomendada del evento destacado.
    tarjetaInformacionSprint.innerHTML = `
        <div class="Cabecera-Tarjeta-Sprint">
            <p class="Antetitulo-Scrum">${sprint.tarjetaActiva.etiqueta}</p>
            <i class="bi ${iconoTarjeta}" aria-hidden="true"></i>
        </div>
        <h3>${sprint.tarjetaActiva.titulo}</h3>
        <div class="Detalle-Sprint">
            <strong>Objetivo</strong>
            <p>${sprint.tarjetaActiva.objetivo}</p>
        </div>
        <div class="Detalle-Sprint">
            <strong>Momento</strong>
            <p>${sprint.tarjetaActiva.momento}</p>
        </div>
        <div class="Duracion-Sugerida-Sprint">
            <i class="bi bi-clock" aria-hidden="true"></i>
            <strong>Duración sugerida</strong>
            <p>${sprint.tarjetaActiva.duracion}</p>
        </div>
    `;

    // Sincroniza el estado visual y accesible de los botones de duración.
    botonesSprint.forEach((boton) => {
        const activo = Number(boton.dataset.sprint) === numero;
        boton.classList.toggle("activo", activo);
        boton.setAttribute("aria-selected", String(activo));
    });
}

if (botonesSprint.length) {
    botonesSprint.forEach((boton) => {
        boton.addEventListener("click", () => mostrarSprint(Number(boton.dataset.sprint)));
    });

    mostrarSprint(1);
}

// Fuente de términos y definiciones usada por el buscador del glosario.
const datosGlosario = [
    { termino: "Agile / Ágil", descripcion: "Enfoque de desarrollo que permite trabajar de manera iterativa, entregando incrementos de software y adaptándose a los cambios y al feedback." },
    { termino: "Artefacto", descripcion: "Elemento utilizado dentro de Scrum para ayudar a organizar y gestionar el trabajo del equipo. Entre ellos se encuentran el Product Backlog, Sprint Backlog e Incremento." },
    { termino: "Backlog", descripcion: "Lista de elementos de trabajo que deben ser gestionados y priorizados dentro de un proyecto." },
    { termino: "Bug", descripcion: "Error o defecto presente en un software que puede provocar un comportamiento incorrecto." },
    { termino: "Burndown", descripcion: "Gráfico utilizado para visualizar el trabajo pendiente y observar el avance durante un Sprint." },
    { termino: "Calidad de software", descripcion: "Grado en que un software cumple con los requisitos establecidos y las necesidades para las que fue desarrollado." },
    { termino: "Caso de uso", descripcion: "Descripción de una interacción entre un usuario o actor y un sistema para alcanzar un objetivo." },
    { termino: "Ciclo de vida", descripcion: "Conjunto de etapas por las que pasa un sistema durante su desarrollo y evolución." },
    { termino: "Daily Scrum", descripcion: "Reunión breve y diaria utilizada por el equipo para revisar el avance, organizar el trabajo y detectar impedimentos. En el material de Scrumly se establece una duración de entre 5 y 15 minutos como máximo." },
    { termino: "Desarrollador", descripcion: "Integrante del equipo Scrum encargado de realizar el trabajo necesario para construir el producto." },
    { termino: "Evento", descripcion: "Actividad definida dentro del marco Scrum que permite organizar y controlar el trabajo del equipo. Algunos eventos son la planificación, el Sprint, el Daily, la Review y la Retrospectiva." },
    { termino: "Especificación de requerimientos", descripcion: "Descripción detallada de los requerimientos que debe cumplir un sistema." },
    { termino: "Incremento", descripcion: "Resultado obtenido al finalizar un Sprint. Debe estar terminado, ser operativo y aportar utilidad al cliente." },
    { termino: "Iteración", descripcion: "Ciclo de desarrollo en el que se realiza trabajo para obtener una nueva versión o incremento del producto." },
    { termino: "Modelo en Cascada", descripcion: "Modelo de desarrollo que organiza las actividades del proceso en fases separadas y secuenciales, como requerimientos, diseño, implementación, pruebas y mantenimiento." },
    { termino: "Modelo en V", descripcion: "Modelo de desarrollo que relaciona las etapas de desarrollo con diferentes actividades de prueba y validación." },
    { termino: "Modelo incremental", descripcion: "Enfoque en el que el sistema se desarrolla mediante una serie de versiones o incrementos, y cada versión agrega funcionalidad a la anterior." },
    { termino: "Product Backlog", descripcion: "Pila del producto que contiene y prioriza los requisitos desde el punto de vista del cliente. Los requisitos pueden expresarse mediante historias de usuario." },
    { termino: "Product Owner", descripcion: "Rol de Scrum relacionado con las necesidades y prioridades del producto. Durante la planificación presenta las funcionalidades prioritarias y explica el valor que se espera obtener." },
    { termino: "Proceso de software", descripcion: "Conjunto de actividades relacionadas que se llevan a cabo para desarrollar, validar y evolucionar un sistema de software." },
    { termino: "Prueba de software", descripcion: "Actividad destinada a comprobar el funcionamiento del software y detectar posibles errores." },
    { termino: "Requerimiento", descripcion: "Descripción de un servicio, función o restricción que debe cumplir un sistema." },
    { termino: "Retrospectiva", descripcion: "Evento de Scrum en el que el equipo reflexiona sobre su forma de trabajo, identifica fortalezas y problemas y establece acciones de mejora para el siguiente Sprint." },
    { termino: "Revisión del Sprint", descripcion: "Evento en el que se analiza e inspecciona el incremento generado y se obtiene información para continuar el desarrollo del producto." },
    { termino: "Scrum", descripcion: "Marco de trabajo ágil que organiza el desarrollo mediante roles, artefactos y eventos, utilizando ciclos de trabajo llamados Sprints." },
    { termino: "Scrum Master", descripcion: "Rol responsable de ayudar a que se comprendan y respeten las reglas de Scrum, facilitar las prácticas ágiles y colaborar en la resolución de impedimentos." },
    { termino: "Sprint", descripcion: "Período de tiempo limitado durante el cual se construye un incremento del producto. El material utilizado para Scrumly recomienda que no supere las 4 semanas." },
    { termino: "Sprint Backlog", descripcion: "Pila del Sprint que contiene los trabajos que se realizarán durante un Sprint para generar el incremento previsto." },
    { termino: "Sprint Planning", descripcion: "Reunión que inicia el Sprint y en la que se determina qué se realizará y cómo se organizará el trabajo." },
    { termino: "Sprint Review", descripcion: "Revisión realizada al finalizar el Sprint para analizar el incremento generado y obtener información sobre el producto." },
    { termino: "Tester", descripcion: "Persona encargada de realizar actividades de prueba para comprobar el comportamiento del software y detectar errores." },
    { termino: "Test unitario", descripcion: "Prueba realizada sobre una unidad individual del software para verificar que funcione de acuerdo con su especificación." },
    { termino: "Usuario", descripcion: "Persona que utiliza o interactúa con el sistema." },
    { termino: "User Story / Historia de usuario", descripcion: "Descripción de una necesidad o funcionalidad desde la perspectiva del usuario. En Scrum, las historias de usuario pueden formar parte del Product Backlog." },
    { termino: "Validación", descripcion: "Proceso mediante el cual se comprueba que el sistema cumple con las necesidades y requisitos establecidos." },
    { termino: "Ventaja", descripcion: "Característica positiva de un modelo, proceso o herramienta que puede favorecer su utilización." }
];

const campoGlosario = document.querySelector("#Buscador-Glosario");
const botonesLetra = document.querySelectorAll(".Boton-Letra");
const resultadosGlosario = document.querySelector("#Resultados-Glosario");

// Pasa el texto a minúsculas y elimina tildes para que las búsquedas sean más flexibles.
function normalizarTexto(texto) {
    return texto
        .toLocaleLowerCase("es")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

// Filtra los términos por texto y/o inicial, y agrupa los resultados por letra.
function mostrarResultadosGlosario(texto = "", letra = "") {
    if (!resultadosGlosario) return;

    const consulta = texto.trim();
    const tieneTerminoAceptable = /[\p{L}\p{N}]/u.test(consulta);

    // Pide palabras o números cuando la consulta contiene únicamente símbolos.
    if (consulta && !tieneTerminoAceptable) {
        campoGlosario?.setAttribute("aria-invalid", "true");
        resultadosGlosario.innerHTML = `<p class="Sin-Resultados Error-Busqueda-Glosario" role="alert"><strong>Ingresá términos aceptables</strong><br />Escribí una palabra o término con letras o números para buscar en el glosario.</p>`;
        return;
    }

    campoGlosario?.setAttribute("aria-invalid", "false");
    const busqueda = normalizarTexto(consulta);
    const resultados = datosGlosario.filter((elemento) => {
        const coincideTexto = !busqueda || normalizarTexto(`${elemento.termino} ${elemento.descripcion}`).includes(busqueda);
        const coincideLetra = !letra || normalizarTexto(elemento.termino).startsWith(normalizarTexto(letra));
        return coincideTexto && coincideLetra;
    });

    if (resultados.length) {
        // Agrupa cada resultado bajo su inicial para presentarlo por secciones.
        const grupos = resultados.reduce((acumulado, elemento) => {
            const letra = normalizarTexto(elemento.termino).charAt(0).toUpperCase();
            acumulado[letra] ??= [];
            acumulado[letra].push(elemento);
            return acumulado;
        }, {});

        resultadosGlosario.innerHTML = `
            <p class="Cantidad-Resultados">${resultados.length} términos</p>
            ${Object.entries(grupos).map(([letra, elementos]) => `
                <section class="Grupo-Letra">
                    <header class="Encabezado-Letra">
                        <span class="Inicial-Letra">${letra}</span>
                        <h2>LETRA ${letra}</h2>
                        <strong>${elementos.length} términos</strong>
                    </header>
                    <div class="Tarjetas-Resultados">
                        ${elementos.map((elemento) => `
                            <article class="Tarjeta-Glosario">
                                <i class="bi bi-journal-text"></i>
                                <h3>${elemento.termino}</h3>
                                <p>${elemento.descripcion}</p>
                            </article>
                        `).join("")}
                    </div>
                </section>
            `).join("")}
        `;
    } else {
        resultadosGlosario.innerHTML = `<p class="Sin-Resultados"><strong>Sin resultados</strong><br />No encontramos ningún término que coincida con tu búsqueda.</p>`;
    }
}

if (campoGlosario && botonesLetra.length && resultadosGlosario) {
    let letraActiva = "";

    // Al escribir, quita el filtro por letra y actualiza los resultados en tiempo real.
    campoGlosario.addEventListener("input", () => {
        letraActiva = "";
        botonesLetra.forEach((boton) => boton.classList.toggle("activo", boton.dataset.letra === ""));
        mostrarResultadosGlosario(campoGlosario.value, letraActiva);
    });

    botonesLetra.forEach((boton) => {
        const letra = boton.dataset.letra;
        // Deshabilita letras que no tienen términos asociados.
        const disponible = !letra || datosGlosario.some((elemento) => normalizarTexto(elemento.termino).startsWith(normalizarTexto(letra)));
        boton.disabled = !disponible;

        boton.addEventListener("click", () => {
            letraActiva = letra;
            campoGlosario.value = "";
            botonesLetra.forEach((otroBoton) => otroBoton.classList.toggle("activo", otroBoton === boton));
            mostrarResultadosGlosario("", letraActiva);
        });
    });

    mostrarResultadosGlosario();
}

// Preguntas frecuentes: mantiene abierta una sola respuesta a la vez.
const botonesPregunta = document.querySelectorAll(".Boton-Pregunta");

botonesPregunta.forEach((boton) => {
    boton.addEventListener("click", () => {
        const pregunta = boton.closest(".Pregunta-Frecuente");
        const listaPreguntas = pregunta?.closest(".Lista-Preguntas");

        if (!pregunta || !listaPreguntas) return;

        const abrir = !pregunta.classList.contains("abierta");
        listaPreguntas.querySelectorAll(".Pregunta-Frecuente").forEach((otraPregunta) => {
            const abierta = otraPregunta === pregunta && abrir;
            const botonPregunta = otraPregunta.querySelector(".Boton-Pregunta");
            const flecha = botonPregunta?.querySelector("i");

            otraPregunta.classList.toggle("abierta", abierta);
            botonPregunta?.setAttribute("aria-expanded", String(abierta));
            flecha?.classList.toggle("bi-chevron-up", abierta);
            flecha?.classList.toggle("bi-chevron-down", !abierta);
        });
    });
});

// Ejercicios prácticos: revela u oculta la solución orientativa de cada consigna.
const botonesSolucionEjercicio = document.querySelectorAll(".Boton-Solucion");

botonesSolucionEjercicio.forEach((boton) => {
    boton.addEventListener("click", () => {
        const solucionId = boton.getAttribute("aria-controls");
        const solucion = solucionId ? document.getElementById(solucionId) : null;
        const iconoEstado = boton.querySelector(".bi-chevron-down, .bi-chevron-up");
        const texto = boton.querySelector("span");

        if (!solucion || !iconoEstado || !texto) return;

        const abierta = boton.getAttribute("aria-expanded") !== "true";
        boton.setAttribute("aria-expanded", String(abierta));
        solucion.hidden = !abierta;
        texto.textContent = abierta ? "Ocultar solución" : "Mostrar solución";
        iconoEstado.classList.toggle("bi-chevron-up", abierta);
        iconoEstado.classList.toggle("bi-chevron-down", !abierta);
    });
});

// Niveles de prueba: muestra u oculta el detalle asociado a cada tarjeta.
const botonesDetalleNivel = document.querySelectorAll(".Boton-Detalle-Nivel");

botonesDetalleNivel.forEach((boton) => {
    boton.addEventListener("click", () => {
        const tarjeta = boton.closest(".Tarjeta-Nivel");
        const detalleId = boton.getAttribute("aria-controls");
        const detalle = detalleId ? document.getElementById(detalleId) : null;
        const icono = boton.querySelector("i");
        const texto = boton.querySelector("span");

        if (!tarjeta || !detalle || !icono || !texto) return;

        const abierto = boton.getAttribute("aria-expanded") !== "true";
        boton.setAttribute("aria-expanded", String(abierto));
        tarjeta.classList.toggle("abierta", abierto);
        detalle.hidden = !abierto;
        texto.textContent = abierto ? "Ocultar detalle" : "Ver detalle";
        icono.classList.toggle("bi-chevron-up", abierto);
        icono.classList.toggle("bi-chevron-down", !abierto);
    });
});