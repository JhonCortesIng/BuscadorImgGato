import Cat from "../domain/cat.js";

// Es el que trae los datos necesarios de lo que se recolecta de la API.

class CatCasosDeUsos {
    constructor(catApi){
        this.catApi = catApi;
    }

    async getCats(page, limit, filter){
        return this.catApi.getCats(page, limit, filter);
    }
}

export default CatCasosDeUsos;