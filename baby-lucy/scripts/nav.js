//Manages client-side navigation between sections.
//Renders each section into a container div and keeps the nav bar in sync.
//Example: const nav = new NavigationManager('contenido')
export class NavigationManager {
    //Parameters:
    //  contenedorId: string with the id of the div where sections will be rendered
    constructor(contenedorId) {
        this.contenedorId = contenedorId;
        this.rutas = {};
    }
    //Registers a section with its render function.
    //Parameters:
    //  nombre: string with the section name (matches data-seccion on nav buttons)
    //  fn: async function that returns the HTML string for that section
    registrarRuta = (nombre, fn) => {
        this.rutas[nombre] = fn;
    };
    //What it does:
    //  Removes the active class from all nav buttons
    //  and adds it only to the button matching the current section.
    actualizarClaseActiva = (seccion) => {
        document.querySelectorAll('.nav__btn').forEach(btn => {
            btn.classList.remove('nav__btn--active');
        });
        const btnActivo = document.querySelector(`.nav__btn[data-seccion="${seccion}"]`);
        if (btnActivo) {
            btnActivo.classList.add('nav__btn--active');
        }
    };
    //What it does:
    //  Finds the render function registered for the given section name,
    //  injects the returned HTML into the container,
    //  and updates the active state of the nav buttons.
    //  If the section is not registered, shows a fallback message.
    cargarSeccion = async (nombre) => {
        const contenedor = document.getElementById(this.contenedorId);
            if (!contenedor) {
                console.error(`Error: No se encontró el contenedor #${this.contenedorId}`);
                return;
            }
        const renderFn = this.rutas[nombre];
            if (renderFn) {
                contenedor.innerHTML = await renderFn();
            }
            else{
            contenedor.innerHTML = `<p>Sección "${nombre}" no encontrada.</p>`;
            }
        this.actualizarClaseActiva(nombre);
    };
    //What it does:
    //  Confirms the navigator is ready to use.
    //  What it does:
    //  Finds all nav buttons and registers a click listener on each one.
    //  When clicked, loads the section matching the button's data-seccion attribute.
    init = () => {
    document.querySelectorAll('.nav__btn').forEach(btn => {
        btn.addEventListener('click', () => {
            this.cargarSeccion(btn.dataset.seccion);
        });
    });
    console.log("Navigator initialized.");
    };
}
