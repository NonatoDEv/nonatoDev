/* pain data template*/
const painData = {
    badge: "Cuidado con su piel",
    title: "La piel de tu bebé es hasta 5 veces más fina que la tuya",
    subtitle: "Elegir la prenda equivocada no solo es incómodo: puede ser la causa de llantos, rojeces e irritaciones continuas.",
    points: [
        {
            iconSvg: `
                <svg class="feature-svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
            `,
            title: "Telas sintéticas que no respiran",
            description: "El poliéster atrapa el sudor y la humedad, provocando sarpullidos, calor excesivo y alergias en la piel más delicada."
        },
        {
            iconSvg: `
                <svg class="feature-svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <circle cx="6" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
                    <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
                    <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
                </svg>
            `,
            title: "Costuras gruesas y etiquetas duras",
            description: "Terminaciones rígidas que rozan como lija sobre su cuerpo, dejando marcas rojas e incomodidad durante todo el día."
        },
        {
            iconSvg: `
                <svg class="feature-svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
            `,
            title: "Broches duros y poco prácticos",
            description: "Prendas difíciles de desabrochar que convierten un cambio de pañal en una batalla de llanto en plena madrugada."
        }
    ],
    quote: '"Ver a tu bebé inquieto o llorando sin entender por qué es frustrante... cuando muchas veces la causa es solo la ropita que lleva puesta."'
};
const createPainCard = ({ iconSvg, title, description }) => {
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

const buildPainSection = (data) => {
    const section = document.createElement('section');
    section.className = ' feature-section theme-pain fade-in-section';
    section.id = 'dolorId';

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
        fragment.appendChild(createPainCard(point));
    });
    grid.appendChild(fragment);

    const footer = document.createElement('footer');
    footer.className = 'pain-footer';
    footer.innerHTML = `
        <blockquote class="feature-quote">${data.quote}</blockquote>
    `;

    container.append(header, grid, footer);
    section.appendChild(container);

    return section;
};
export const initPainSection = () => {
    const sentinel = document.getElementById('pain-sentinel');
    if (!sentinel) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const painNode = buildPainSection(painData);
               
                sentinel.replaceWith(painNode);
    
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

document.addEventListener('DOMContentLoaded', initPainSection);