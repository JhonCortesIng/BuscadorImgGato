const charactersEl = document.getElementById('characters');
const filtroRazaEl = document.getElementById('filtro-raza');

const url = 'https://api.thecatapi.com/v1/breeds';
const x_api_key = "live_3dV3TKUVE1d3HHUTLRSDNs3L7IjQwznHs3ibgHWBpHH5ESpxmAh0NilFAjckOn1W";

const limit = 10;
let currentPage = 0;

// la funcion para poder obtener las imagenes de la API
async function getcharacters(page) {
    const response = await fetch(`${url}?limit=${limit}&page=${page}`, {
        headers: {
            'x-api-key': x_api_key
        }
    });
    const data = await response.json();

    // console.log(data);    

    return data;
}

// getcharacters();

// funcion para mostrar las imagenes que se obtuvieron de la funcion anterior

async function displaycharacters() {
    const imagenes = await getcharacters(currentPage);

    // Limpiar el contenedor de imagenes, para que no se dupliquen.
    charactersEl.innerHTML = '';

    // Filtrar las razas según el input, que ingrese el usuario.
    const razasFiltradas = imagenes.filter(imagen => 
        imagen.name.toLowerCase().includes(filtroRazaEl.value.toLowerCase())
    );

    // Si hay coincidencias, mostrara las imágenes segun lo ingresado en el input.
    if (razasFiltradas.length > 0) {
        for (let imagen of razasFiltradas) {
            const imagenEl = document.createElement('div');
            imagenEl.classList.add('imagen-imagenEl');

            // Agregar las imagenes al contenedor, con el nombre de la raza y la imagen.
            imagenEl.innerHTML = `
            <h3>${imagen.name}</h3>
            <img src="https://cdn2.thecatapi.com/images/${imagen.reference_image_id}.jpg" alt="${imagen.name}">
            `;

            charactersEl.appendChild(imagenEl);
        }
    } else {
        charactersEl.innerHTML = '<p>No se encontraron coincidencias.</p>';
    }
}

displaycharacters();

// se encarga de escuchar los cambios en el input.
filtroRazaEl.addEventListener('input', (e) => {
    const filtroRaza = e.target.value;
    displaycharacters(filtroRaza);
});

// funciones para cambiar de pagina:

// funcion para cambiar de pagina a la siguiente.
function nextPage() {
    currentPage++;
    displaycharacters(filtroRazaEl.value);
}

// funcion para cambiar de pagina a la anterior.
function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        displaycharacters(filtroRazaEl.value);
    }
}

// Esta parte es para agregar botones para cambiar de pagina
const paginationEl = document.createElement('div');
paginationEl.classList.add('paginationEl');

paginationEl.innerHTML = `
    <button id="prevButton">Anterior</button>
    <button id="nextButton">Siguiente</button>
    `;
document.body.appendChild(paginationEl);

// Son los eventos de los botones, para hacer cambios de pagina.
document.getElementById('nextButton').addEventListener('click', nextPage);
document.getElementById('prevButton').addEventListener('click', prevPage);

