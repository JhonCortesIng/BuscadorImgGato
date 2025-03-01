import Cat from "../domain/cat.js";

// Se crea la clase para poder obtener las imagenes de la API, filtradas.

class CatApi {
    constructor(apiUrl, apiKey) {
        this.apiUrl = apiUrl;
        this.apiKey = apiKey;
    }
    
    // El metodo para poder obtener las imagenes de la API, filtradas.
    async getCats(page, limit, filter) {
        const url = `${this.apiUrl}?limit=${limit}&page=${page}`;
        const response = await fetch(url, {
            headers: {
                'x-api-key': this.apiKey,
            },
        });
        const data = await response.json();
    
        // console.log(data);    
    
        return data.filter(catData => catData.name.toLowerCase().includes(filter.toLowerCase()))
            .map(catData => new Cat(catData.id, catData.name, `https://cdn2.thecatapi.com/images/${catData.reference_image_id}.jpg`));
    }
}

export default CatApi;