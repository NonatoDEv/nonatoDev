import { Header } from '../data/header.js';
import { Hero } from '../data/hero.js';

// No instanciamos nada aquí afuera porque data aún no existe

async function initApp() { // Le cambiamos el nombre a algo más general
    try {
        const response = await fetch('./data/info.json');
        const data = await response.json();

        // 1. Ahora que data SÍ existe, inicializamos el Header
        const header = new Header(data.personalInfo.shortName);
        header.render();

        // 2. Luego el Hero
        const heroBanner = new Hero(
            'containerHero',
            data.personalInfo.fullName,
            data.personalInfo.roles
        );
        heroBanner.render();

        console.log("System is up and running with data:", data);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Arrancamos todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initApp);