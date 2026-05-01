import { Header } from '/data/header.js';
import { Hero } from '/data/hero.js';

async function initApp() {
    try {
        const response = await fetch('./data/info.json');
        if (!response.ok) throw new Error('No se pudo cargar el archivo JSON');
        
        const data = await response.json();

        // 1. Instanciar e Iniciar el Header
        // Pasamos el nombre corto para el logo
        const header = new Header(data.personalInfo.shortName);
        header.init(); // Usamos init() para que active render + eventos

        // 2. Instanciar e Iniciar el Hero
        const heroBanner = new Hero(
            'containerHero', // El ID del contenedor en el HTML
            data.personalInfo.fullName,
            data.personalInfo.roles
        );
        heroBanner.render(); // El Hero suele ser más estático, render basta

        console.log("Sistema artesanal funcionando.");

    } catch (error) {
        console.error('Error crítico en el inicio de la app:', error);
    }
}

// El punto de partida oficial
document.addEventListener('DOMContentLoaded', initApp());