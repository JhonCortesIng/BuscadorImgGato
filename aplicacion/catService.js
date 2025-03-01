import CatCasosDeUsos from "../domain/catCasosDeUsos.js";

// El servicio para poder obtener las imagenes de la API, filtradas, por medio de los casos de uso para coordinar los datos.
class CatService {
    constructor(catCasosDeUsos) {
        this.catCasosDeUsos = catCasosDeUsos;       
    }

    async getCats(page, limit, filter) {
        return this.catCasosDeUsos.getCats(page, limit, filter);
    }
}

export default CatService;