import CatApi from '../infraestructura/catApi.js';
import CatCasosDeUsos from '../domain/catCasosDeUsos.js';
import CatService from '../aplicacion/catService.js';

const charactersEl = document.getElementById('characters');
const filtroRazaEl = document.getElementById('filtro-raza');
const paginationEl = document.getElementById('pagination');

const apiUrl = 'https://api.thecatapi.com/v1/breeds';
const apiKey = 'live_3dV3TKUVE1d3HHUTLRSDNs3L7IjQwznHs3ibgHWBpHH5ESpxmAh0NilFAjckOn1W';
const limit = 10;
let currentPage = 0;

const catApi = new CatApi(apiUrl, apiKey);
const catCasosDeUsos = new CatCasosDeUsos(catApi);
const catService = new CatService(catCasosDeUsos);

// Funcion para poder plasmas las imagenes que se traen de la API.

async function displayCats() {
    const filter = filtroRazaEl.value;
    const cats = await catService.getCats(currentPage, limit, filter);

    charactersEl.innerHTML = '';

    // Verificar si se encontraron coincidencias, dentro de la lista que se creo con las imagenes que se obtienen de la API.

    if (cats.length > 0) {
        cats.forEach(cat => {
            const catEl = document.createElement('div');
            catEl.classList.add('imagen-imagenEl');
            catEl.innerHTML = `
                <h3>${cat.name}</h3>
                <img src="${cat.reference_image_id}" alt="${cat.name}">
            `;
            charactersEl.appendChild(catEl);
        });
    } else {
        charactersEl.innerHTML = '<p>No se encontraron coincidencias.</p>';
    }
}

// Funciones para poder navegar entre las paginas.

function nextPage() {
    currentPage++;
    displayCats();
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        displayCats();
    }
}

filtroRazaEl.addEventListener('input', () => displayCats());

paginationEl.innerHTML = `
    <button id="prevButton">Anterior</button>
    <button id="nextButton">Siguiente</button>
`;


document.getElementById('nextButton').addEventListener('click', nextPage);
document.getElementById('prevButton').addEventListener('click', prevPage);

displayCats();
