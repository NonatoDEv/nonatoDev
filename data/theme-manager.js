export class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('portfolio-theme') || 'dark';
        this.applyTheme();
    }

    toggle() {
        this.theme = (this.theme === 'dark') ? 'light' : 'dark';
        localStorage.setItem('portfolio-theme', this.theme);
        this.applyTheme();
        return this.theme;
    }

    applyTheme() {
        document.body.setAttribute('data-theme', this.theme);
    }

    get currentTheme() {
        return this.theme;
    }
}