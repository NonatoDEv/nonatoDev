export class Header {
    constructor(shortName) {
        this.shortName = shortName;
    }
    render() {
        const logoElement = document.getElementById('logo-text');
        if (logoElement) logoElement.textContent = this.shortName;

        this._setupMenu();
        this._setActiveLink();
    }
    _setupMenu() {
        const menuBtn = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navMenu.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
        }
        else {
        document.body.style.overflow = 'auto';
        }
        if (menuBtn && navMenu) {
            menuBtn.addEventListener('click', () => {
                menuBtn.classList.toggle('open');
                navMenu.classList.toggle('open');
            });
        }
    }
    _setActiveLink() {
        const navLinks = document.querySelectorAll('.navLink');
        let currentPath = window.location.pathname.split('/').pop() || 'index.html';

        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            link.classList.remove('active');
            
            if (linkHref === currentPath) {
                link.classList.add('active');
            }
        });
    }
}