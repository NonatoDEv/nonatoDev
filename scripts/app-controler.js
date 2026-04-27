import { Header } from '../data/header.js';
import { Hero } from '../data/hero.js';
async function initApp() {
    try {
        const response = await fetch('./data/info.json');
        const data = await response.json();

        const header = new Header(data.personalInfo.shortName);
        header.render();
        const heroBanner = new Hero(
            'containerHero',
            data.personalInfo.fullName,
            data.personalInfo.roles,
            data.personalInfo.description
        );
        heroBanner.render();
        console.log("System is up and running with data:", data);

    } 
    catch (error) {
        console.error('Error fetching data:', error);
    }
}

document.addEventListener('DOMContentLoaded', initApp);