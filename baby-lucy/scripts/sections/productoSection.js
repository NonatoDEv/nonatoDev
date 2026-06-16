import { ProductoManager } from '../data/productos.js';
import { renderSeccionProductos, renderModalProducto } from '../views/productosView.js';
//Manages the products section of the admin panel.
//Handles rendering, modal lifecycle, and CRUD operations for products.
//Example: const seccionProductos = new ProductoSection(nav, modal)
export class ProductoSection {
    //Parameters:
    //  nav: NavigationManager instance to reload sections
    //  modal: ModalManager instance to handle all modals
    constructor(nav, modal) {
        this.nav = nav;
        this.modal = modal;
        this.productos = new ProductoManager();
    }
    //What it does:
    //  Fetches products and categories in parallel,
    //  renders the products section, and registers all event listeners.
    async render() {
        const [lista, categorias] = await Promise.all([
            this.productos.obtenerTodos(),
            this.productos.obtenerCategorias()
        ]);
        setTimeout(() => {
            const btn = document.getElementById('btn-abrir-modal');
            if (btn) btn.onclick = () => this.abrirModalAgregar();
            document.querySelectorAll('.btn-eliminar').forEach(btn => {
                btn.onclick = () => this.handleEliminarProducto(btn.dataset.id);
            });
        }, 0);
        return renderSeccionProductos(lista, categorias);
    }
    //What it does:
    //  Fetches categories, builds the product modal HTML,
    //  and delegates injection and opening to ModalManager.
    //  Registers the close and submit events after the dialog is in the DOM.
    async abrirModalAgregar() {
        const categorias = await this.productos.obtenerCategorias();
        this.modal.abrir(renderModalProducto(categorias), 'modal-producto');

        document.getElementById('btn-cerrar-modal').onclick = () => this.modal.cerrar();
        document.getElementById('form-producto').onsubmit = async (e) => {
            e.preventDefault();
            await this.handleGuardarProducto();
        };
    }
    //What it does:
    //  Reads the form fields, builds the product object,
    //  saves it to Supabase, closes the modal, and reloads the products section.
    async handleGuardarProducto() {
        const nombre = document.getElementById('input-nombre').value.trim();
        const precio = document.getElementById('input-precio').value;
        const precio_costo = document.getElementById('input-costo').value;
        const categoria_id = document.getElementById('select-categoria').value;
        const descripcion = document.getElementById('input-descripcion').value.trim();

        try {
            await this.productos.guardar({ nombre, precio, precio_costo, categoria_id, descripcion });
            this.modal.cerrar();
            this.modal.mostrarExito('Producto guardado correctamente');
            await this.nav.cargarSeccion('productos');
        }
        catch (error) {
            document.getElementById('error-producto').textContent = error.message;
        }
    }
    //Parameters:
    //  id: string with the product id to delete
    //What it does:
    //  Shows a confirmation modal before deleting.
    //  If confirmed, deletes the product from Supabase,
    //  reloads the products section, and shows a success modal.
    async handleEliminarProducto(id) {
        this.modal.mostrarConfirmacion(
            '¿Seguro que quieres eliminar este producto?',
            async () => {
                try {
                    await this.productos.eliminar(id);
                    await this.nav.cargarSeccion('productos');
                    this.modal.mostrarExito('Producto eliminado correctamente');
                }
                catch (error) {
                    console.error('Error al eliminar:', error.message);
                }
            }
        );
    }
}