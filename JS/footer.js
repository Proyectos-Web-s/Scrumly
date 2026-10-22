// Carga el pie compartido y conserva una versión local si el archivo no está disponible.
document.addEventListener("DOMContentLoaded", async function () {
    const contenedor = document.getElementById("footer-container");

    if (!contenedor) return;

    const htmlFallback = `
        <footer class="footer-scrumly">
            <div class="footer-contenido">
                <div class="footer-marca">
                    <h2>Scrumly.</h2>
                    <h3>Construí conocimiento. Creá software de calidad.</h3>
                    <p>
                        Un espacio para aprender sobre calidad del software
                        y metodologías de desarrollo.
                    </p>
                </div>

                <div class="footer-columna">
                    <h3>EXPLORÁ</h3>
                    <a href="index.html">Inicio</a>
                    <a href="Gestion-de-Calidad-del-Software.html">Gestión de la Calidad</a>
                    <a href="Procesos-y-Desarrollo-de-Software.html">Procesos de Desarrollo</a>
                    <a href="Metodologias-Agiles.html">Metodologías Ágiles</a>
                </div>

                <div class="footer-columna">
                    <h3>APRENDÉ</h3>
                    <a href="Recursos-y-Aprendizajes.html#glosario">Glosario</a>
                    <a href="Recursos-y-Aprendizajes.html#preguntas-frecuentes">Preguntas Frecuentes</a>
                    <a href="Recursos-y-Aprendizajes.html#ejercicios-practicos">Ejercicios y Casos Prácticos</a>
                    <a href="Recursos-y-Aprendizajes.html#enlaces-interes">Enlaces de Interés</a>
                </div>

                <div class="footer-columna footer-contacto">
                    <h3>CONTACTO</h3>
                    <p>¿Tenés alguna consulta o sugerencia?</p>
                    <a class="footer-enlace-contacto" href="Contacto.html">
                        Contactanos <span>→</span>
                    </a>
                </div>
            </div>

            <div class="footer-inferior">
                <p>© 2026 Scrumly · Proyecto educativo</p>
                <p>Desarrollado por el equipo Scrumly.</p>
            </div>
        </footer>
    `;

    try {
        const respuesta = await fetch("footer.html");

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el pie de página.");
        }

        contenedor.innerHTML = await respuesta.text();
    } catch (error) {
        console.warn("Error al cargar el footer desde footer.html; usando fallback inline.", error);
        contenedor.innerHTML = htmlFallback;
    }
});