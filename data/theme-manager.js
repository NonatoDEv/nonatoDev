export class ThemeManager {
    constructor() {
        // Al nacer, el manager mira si ya había una preferencia guardada
        this.theme = localStorage.getItem('portfolio-theme') || 'dark';
        this.applyTheme();
    }

    toggle() {
        // Cambiamos el estado
        this.theme = (this.theme === 'dark') ? 'light' : 'dark';
        
        // Guardamos para la próxima visita
        localStorage.setItem('portfolio-theme', this.theme);
        
        // Aplicamos al DOM
        this.applyTheme();
        return this.theme;
    }

    applyTheme() {
        // Ponemos el atributo en el body para que el CSS reaccione
        document.body.setAttribute('data-theme', this.theme);
    }

    get currentTheme() {
        return this.theme;
    }
}