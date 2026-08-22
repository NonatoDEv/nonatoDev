/* solution data template*/
const solutionData = {
    badge: "100% Algodon Pima Peruano",
    title: "La máxima suavidad y protección que su piel merece",
    subtitle: "Prendas hipoalergénicas y extra suaves que respetan la delicadeza de tu bebé, diseñadas para brindarle confort absoluto y devolverte la tranquilidad.",
    points: [
        {
            iconSvg : `
            <svg class="feature-svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <path d="M9 12l2 2 4-4"></path>
                </svg>`,
            title: "Fibras naturales que respiran con él",
            description: "El algodón Pima regula su temperatura de forma natural. Adiós al sudor atrapado, alergias y sarpullidos; solo frescura total en cada movimiento."
        },
        {
            iconSvg : `
            <svg class="feature-svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                    <line x1="16" y1="8" x2="2" y2="22"></line>
                    <line x1="17.5" y1="15" x2="9" y2="6.5"></line>
                </svg>
            `,
            title: "Acabados lisos y cero etiquetas",
            description: "Confección cuidada con costuras planas y sin etiquetas internas. Protegemos su piel de roces, marcas rojas e irritaciones para que juegue sin molestias."
        },
        {
            iconSvg : `
            <svg class="feature-svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
            `,
            title: "Broches amigables para cambios rápidos",
            description: "Cierres resistentes pero de apertura suave. Las mudas de madrugada volverán a ser prácticas, rápidas y, lo más importante, sin lágrimas."
        }
    ],
    quote: "Cuando le pones la prenda correcta, tu bebé duerme más tranquilo, se mueve con libertad y tú sientes la paz de saber que está protegido."
};

const createSolutionCard = ({ iconSvg, title, description }) => {
    const card = document.createElement('article');
    card.className = 'feature-card';

    card.innerHTML = `
        <div class="feature-icon-wrapper">
            ${iconSvg}
        </div>
        <h3 class="feature-card__title">${title}</h3>
        <p class="feature-card__desc">${description}</p>
    `;

    return card;
};

const buildSolutionSection = (data) => {
    const section = document.createElement('section');
    section.className = ' feature-section theme-solution fade-in-section';
    section.id = 'solucionId';

    const container = document.createElement('section');
    container.className = 'container';

    const header = document.createElement('header');
    header.className = 'section-header';
    header.innerHTML = `
        <span class="badge">${data.badge}</span>
        <h2 class="section-title">${data.title}</h2>
        <p class="section-subtitle">${data.subtitle}</p>
    `;

    const grid = document.createElement('section');
    grid.className = 'feature-grid';

    const fragment = document.createDocumentFragment();
    data.points.forEach(point => {
        fragment.appendChild(createSolutionCard(point));
    });
    grid.appendChild(fragment);

    const footer = document.createElement('footer');
    footer.className = 'solution-footer';
    footer.innerHTML = `
        <blockquote class="feature-quote">${data.quote}</blockquote>
    `;

    container.append(header, grid, footer);
    section.appendChild(container);

    return section;
};
export const initSolutionSection = () => {
    const sentinel = document.getElementById('solution-sentinel');
    if (!sentinel) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const solutionNode = buildSolutionSection(solutionData);
               
                sentinel.replaceWith(solutionNode);
    
                obs.disconnect();
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px 150px 0px',
        threshold: 0
    });

    observer.observe(sentinel);
};

document.addEventListener('DOMContentLoaded', initSolutionSection);