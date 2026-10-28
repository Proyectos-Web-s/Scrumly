document.addEventListener("DOMContentLoaded", async () => {
    const contenedor = document.getElementById("menu-container");

    if (!contenedor) return;

    const menuFallback = `
        <div class="Barra-de-Navegacion">
            <a href="index.html" class="Enlace-Logo">
                <img src="IMG/Logo-SCRUMLY.jpeg" alt="SCRUMLY Logo" class="logo-SCRUMLY" />
            </a>
            <p class="Titulo-Barra">SCRUMLY</p>
            <i class="Hambu bi-list" id="boton-menu"></i>
            <div class="Menu" id="menu">
                <div class="Menu-Titulo">
                    <span>MENÚ</span>
                </div>
                <a href="index.html"><i class="bi bi-house"></i><span>Inicio</span></a>
                <div class="Item-Menu">
                    <div class="Titulo-Menu">
                        <i class="bi bi-patch-check"></i>
                        <span>Gestión de la Calidad<br>del Software</span>
                        <i class="bi bi-chevron-down"></i>
                    </div>
                    <div class="Submenu">
                        <a href="Gestion-de-Calidad-del-Software.html#inicio-calidad">Fundamentos</a>
                        <a href="Gestion-de-Calidad-del-Software.html#calidad-agil">Técnicas de Aseguramiento de la Calidad</a>
                        <a href="Gestion-de-Calidad-del-Software.html#herramientas-calidad">Herramientas de Calidad</a>
                    </div>
                </div>
                <div class="Item-Menu">
                    <div class="Titulo-Menu">
                        <i class="bi bi-bezier2"></i>
                        <span>Procesos de Desarrollo<br>de Software</span>
                        <i class="bi bi-chevron-down"></i>
                    </div>
                    <div class="Submenu">
                        <a href="Procesos-y-Desarrollo-de-Software.html#inicio-procesos">Ciclo de Vida del Desarrollo (SDLC)</a>
                        <a href="Procesos-y-Desarrollo-de-Software.html#modelo-cascada">Modelo en Cascada</a>
                        <a href="Procesos-y-Desarrollo-de-Software.html#modelo-v">Modelo en V</a>
                        <a href="Procesos-y-Desarrollo-de-Software.html#modelo-iterativo">Modelo Iterativo e Incremental</a>
                    </div>
                </div>
                <div class="Item-Menu">
                    <div class="Titulo-Menu">
                        <i class="bi bi-lightning-charge"></i>
                        <span>Metodologías Ágiles</span>
                        <i class="bi bi-chevron-down"></i>
                    </div>
                    <div class="Submenu">
                        <a href="Metodologias-Agiles.html#scrum">Scrum</a>
                        <a href="Metodologias-Agiles.html#kanban">Kanban</a>
                        <a href="Metodologias-Agiles.html#xp">XP (Extreme Programming)</a>
                        <a href="Metodologias-Agiles.html#comparativa">Comparador de metodologías</a>
                    </div>
                </div>
                <div class="Item-Menu">
                    <div class="Titulo-Menu">
                        <i class="bi bi-book"></i>
                        <span>Recursos y Aprendizajes</span>
                        <i class="bi bi-chevron-down"></i>
                    </div>
                    <div class="Submenu">
                        <a href="Recursos-y-Aprendizajes.html#glosario">Glosario</a>
                        <a href="Recursos-y-Aprendizajes.html#preguntas-frecuentes">Preguntas Frecuentes</a>
                        <a href="Recursos-y-Aprendizajes.html#enlaces-interes">Enlaces de Interés</a>
                        <a href="Recursos-y-Aprendizajes.html#ejercicios-practicos">Ejercicios y Casos Prácticos</a>
                        <a href="Recursos-y-Aprendizajes.html#encuesta-metodología">Encuesta sobre Metodologías</a>
                    </div>
                </div>
                <a href="Sobre-Nosotros.html"><i class="bi bi-people"></i><span>Sobre Nosotros</span></a>
                <a href="Contacto.html"><i class="bi bi-envelope"></i><span>Contacto</span></a>
            </div>
        </div>
    `;

    try {
        const respuesta = await fetch("menu.html");

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el menú.");
        }

        contenedor.outerHTML = await respuesta.text();
    } catch (error) {
        console.warn("Error al cargar el menú desde menu.html; usando fallback inline.", error);
        contenedor.outerHTML = menuFallback;
    }
});

document.addEventListener("click", (evento) => {
    const objetivo = evento.target;

    if (!(objetivo instanceof Element)) return;

    const botonMenu = objetivo.closest("#boton-menu");
    if (botonMenu) {
        document.getElementById("menu")?.classList.toggle("activo");
        return;
    }

    const tituloSubmenu = objetivo.closest(".Titulo-Menu");
    if (!tituloSubmenu) return;

    const itemMenu = tituloSubmenu.closest(".Item-Menu");
    if (!itemMenu) return;

    const submenu = itemMenu.querySelector(".Submenu");
    const flecha = tituloSubmenu.querySelector(".bi-chevron-down");

    document.querySelectorAll(".Item-Menu .Submenu").forEach((otroSubmenu) => {
        if (otroSubmenu !== submenu) {
            otroSubmenu.classList.remove("activo");
        }
    });

    document.querySelectorAll(".Titulo-Menu .bi-chevron-down").forEach((otraFlecha) => {
        if (otraFlecha !== flecha) {
            otraFlecha.classList.remove("girada");
        }
    });

    submenu?.classList.toggle("activo");
    flecha?.classList.toggle("girada");
});
