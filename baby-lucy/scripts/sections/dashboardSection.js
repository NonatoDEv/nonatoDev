//Manages the dashboard section of the admin panel.
//Shows a summary of all sections: products, sales, clients, and inventory.
//Example: const seccionDashboard = new DashboardSection(nav, modal)
export class DashboardSection {
    //Parameters:
    //  nav: NavigationManager instance to reload sections
    //  modal: ModalManager instance to handle all modals
    constructor(nav, modal) {
        this.nav = nav;
        this.modal = modal;
    }
    //What it does:
    //  Renders a placeholder for the dashboard section.
    //  Will be replaced with summary cards from all sections later.
    async render() {
        return `<section><h2>Dashboard</h2><p>Próximamente...</p></section>`;
    }
}