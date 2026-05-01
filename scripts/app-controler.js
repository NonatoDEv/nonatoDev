import { Header } from '/data/header.js';
import { Hero } from '/data/hero.js';

async function initApp() {
    try {
        const response = await fetch('./data/info.json');
        if (!response.ok) throw new Error('it can not load JSON');
        //header
        const data = await response.json();
        const header = new Header(data.personalInfo.shortName);
        header.init();
        //hero
        const heroBanner = new Hero(
            'containerHero',
            data.personalInfo.fullName,
            data.personalInfo.roles
        );
        heroBanner.render();

        console.log("System is working.");

    } catch (error) {
        console.error('Critical error initializing the app:', error);
    }
}

document.addEventListener('DOMContentLoaded', initApp());