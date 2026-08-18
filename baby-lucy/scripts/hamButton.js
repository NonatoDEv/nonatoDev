const initNavigation = () =>{
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');

    if (!menuToggle || !menu) return;

    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('isOpen');
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        menuToggle.classList.toggle('is-active');
    });
    };

document.addEventListener('DOMContentLoaded', initNavigation);