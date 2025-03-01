// El modelado de lo que se obtiene de la APi, para poder obtener las imagenes de la API.

class Cat {
    constructor(id, name, reference_image_id) {
        this.id = id;
        this.name = name;
        this.reference_image_id = reference_image_id;
    }
}

export default Cat;