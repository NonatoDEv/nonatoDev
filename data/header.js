 import { ThemeManager } from './theme-manager.js';

 export class Header {
    constructor(shortName) {
        this.shortName = shortName;
        this.themeManager = new ThemeManager();
    }

    init() {
        this.render(); 
        this._setupEvents(); 
        this._setActiveLink();
    }

    render() {
        const logoElement = document.getElementById('logo-text');
        if (logoElement) logoElement.textContent = this.shortName;
    }
    _setupThemeToggle() {
        const btn = document.getElementById('lightDarkToggle');
        if (btn) {
            btn.addEventListener('click', () => {
                // 1. Llamamos al manager para que cambie el tema
                const newTheme = this.themeManager.toggle();
                // 2. Animamos el botón para dar feedback visual
                this._updateThemeIcon(btn, newTheme);
            });
        }
    }

    _updateThemeIcon(btn, theme) {
        btn.style.transform = 'scale(0.9)';
        setTimeout(() => btn.style.transform = 'scale(1)', 100);
    }

    _setupMenu() {
    const menuBtn = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.navLink');
    const toggle = () => {
        const isOpen = navMenu.classList.toggle('open');
        menuBtn.classList.toggle('open');
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    };
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', toggle);

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('open')) {
                    toggle();
                }
            });
        });
    }
    }

    _setupEvents() {
        this._setupMenu();  
        this._setupThemeToggle();
        window.addEventListener('hashchange', () => this._setActiveLink());
    }

    _setActiveLink() {
        const navLinks = document.querySelectorAll('.navLink');
        const currentHash = window.location.hash || '#hero';
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === currentHash);
        });
    }
}