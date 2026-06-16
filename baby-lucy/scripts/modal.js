//Reusable manager for native <dialog> elements.
//Handles injection, opening, closing, success, and confirmation modals.
//Example: const modal = new ModalManager()
export class ModalManager {
    //What it does:
    //  Initializes the manager with no dialog attached yet.
    //  container holds the DOM wrapper so it can be removed on close.
    constructor() {
        this.dialog = null;
        this.container = null;
    }
    //Parameters:
    //  html: string with the full <dialog> HTML to inject
    //What it does:
    //  Creates a wrapper div, injects the HTML, appends it to the body,
    //  finds the dialog by id, and registers a click listener
    //  so clicking outside the modal closes it.
    init = (html, dialogId) => {
        this.container = document.createElement('div');
        this.container.innerHTML = html;
        document.body.appendChild(this.container);

        this.dialog = document.getElementById(dialogId);
        if (this.dialog) {
            this.dialog.addEventListener('click', (e) => {
                if (e.target === this.dialog) this.cerrar();
            });
        }
    }
    //Parameters:
    //  html: string with the full <dialog> HTML to inject
    //  dialogId: string with the id of the <dialog> element to find
    // What it does:
    //  Calls init() to inject and find the dialog, then opens it as a modal.
    abrir = (html, dialogId) => {
        this.init(html, dialogId);
        this.dialog.showModal();
    };
    //What it does:
    //  Closes the dialog and removes the container from the DOM entirely,
    //  cleaning up all events attached to it.
    cerrar = () => {
        if (this.dialog) {
            this.dialog.close();
            this.container?.remove();
        }
    };
    //Parameters:
    //  mesagge: string shown inside the success modal
    //What it does:
    //  Injects and opens a success modal with a checkmark and the given message.
    //  Closes and removes itself automatically after 2 seconds.
    mostrarExito = (mensaje) => {
        const html = `
            <dialog class="modal modal--exito" id="modal-exito">
                <div class="modal__content">
                    <p> ${mensaje}</p>
                </div>
            </dialog>
        `;
        this.abrir(html, 'modal-exito');
        setTimeout(() => this.cerrar(), 2000);
    };
    //Parameters:
    //  mensaje: string with the warning shown to the user
    //  onConfirmar: async callback executed if the user clicks confirm
    //What it does:
    //  Injects and opens a warning modal with confirm and cancel buttons.
    //  If the user confirms, closes the modal first then runs onConfirmar().
    //  If the user cancels, closes the modal without doing anything.
    mostrarConfirmacion = (mensaje, onConfirmar) => {
    const html = `
        <dialog class="modal modal--advertencia" id="modal-confirmacion">
            <div class="modal__content">
                <p>⚠️ ${mensaje}</p>
                <div class="modal__actions">
                    <button class="btn-eliminar" id="btn-confirmar">Sí, eliminar</button>
                    <button class="btn-crear" id="btn-cancelar-confirm">Cancelar</button>
                </div>
            </div>
        </dialog>
    `;
    this.abrir(html, 'modal-confirmacion');
        document.getElementById('btn-confirmar').onclick = async () => {
        this.cerrar();
        await onConfirmar();
        };
        document.getElementById('btn-cancelar-confirm').onclick = () => this.cerrar();
    };
}