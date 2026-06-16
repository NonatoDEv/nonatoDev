import { AuthManager } from './auth.js';
import { NavigationManager } from './nav.js';
import { ModalManager } from './modal.js';
import { UIManager } from './ui.js';
import { ProductoSection } from './sections/productoSection.js';
import { VentasSection } from './sections/ventasSection.js';
import { ClientesSection } from './sections/clientesSection.js';
import { InventarioSection } from './sections/inventarioSection.js';
import { DashboardSection } from './sections/dashboardSection.js';
//Main application controller for the admin panel.
//Orchestrates session, UI, navigation, and all sections.
//Example: new PanelApp().iniciar()
class PanelApp {
    constructor() {
        this.auth  = new AuthManager();
        this.nav   = new NavigationManager('contenido');
        this.modal = new ModalManager();
        this.ui    = new UIManager(this.auth);

        this.seccionDashboard = new DashboardSection(this.nav, this.modal);
        this.seccionProductos = new ProductoSection(this.nav, this.modal);
        this.seccionVentas     = new VentasSection(this.nav, this.modal);
        this.seccionClientes   = new ClientesSection(this.nav, this.modal);
        this.seccionInventario = new InventarioSection(this.nav, this.modal);
    }
    //What it does:
    //  Entry point of the app.
    //  Verifies session, configures UI, registers routes, and loads default section.
    async iniciar() {
        try {
            const session = await this.auth.verificarSesion();
            if (!session) return window.location.href = 'login.html';

            this.ui.configurar(session);
            this.registrarRutas();
            this.nav.init();
            await this.nav.cargarSeccion('productos');
        }
        catch (error) {
            console.error('Error al iniciar panel:', error);
        }
    }
    //What it does:
    //  Registers all section routes with their render functions.
    registrarRutas() {
        this.nav.registrarRuta('dashboard',  () => this.seccionDashboard.render());
        this.nav.registrarRuta('productos',  () => this.seccionProductos.render());
        this.nav.registrarRuta('ventas',     () => this.seccionVentas.render());
        this.nav.registrarRuta('clientes',   () => this.seccionClientes.render());
        this.nav.registrarRuta('inventario', () => this.seccionInventario.render());
    }
}
new PanelApp().iniciar();