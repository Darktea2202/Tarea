const characterName = document.getElementById("character__name");
const imgCharacter = document.getElementById("img__character");
const characterId = document.getElementById("character__id");
const searchInput = document.getElementById("character__search");
const searchButton = document.getElementById("search__button");
const initialMessage = document.getElementById("initial__message");
const characterContent = document.getElementById("character__content");
const characterLocation = document.getElementById("character__location");
const characterEpisode = document.getElementById("character__episode");

const peticionApi = async (searchInput) => {
    try {
        const apiBusqueda = searchInput.value.toLowerCase().trim();

        const peticionGet = await fetch(`https://rickandmortyapi.com/api/character/?name=${apiBusqueda}`);

        if (!peticionGet.ok) {
            throw new Error('Personaje no encontrado');
        }

        const respuesta = await peticionGet.json();
        
        // La API de Rick and Morty devuelve un objeto con 'results' array
        if (!respuesta.results || respuesta.results.length === 0) {
            throw new Error('Personaje no encontrado');
        }
        
        // Tomar el primer resultado
        const personaje = respuesta.results[0];

        // Datos específicos de Rick and Morty API
        const imagen = personaje.image;
        const nombre = personaje.name;
        const id = personaje.id;
        const estado = personaje.status; // Alive, Dead, unknown
        const especie = personaje.species; // Human, Alien, etc.
        const tipo = personaje.type || 'No especificado';
        const genero = personaje.gender; // Male, Female, etc.
        const origen = personaje.origin.name;
        const ubicacion = personaje.location.name;
        const episodios = personaje.episode.length;

        initialMessage.style.display = 'none';
        characterContent.style.display = 'block';

        characterName.textContent = nombre;
        imgCharacter.src = imagen;
        characterId.textContent = `#${id}`;

        // Adaptar los campos para Rick and Morty
        characterLocation.textContent = ubicacion;
        characterEpisode.textContent = `${episodios} episodios`;

        // Mostrar todas las características en consola
        console.log("🚀 PERSONAJE DE RICK AND MORTY ENCONTRADO:");
        console.log("═══════════════════════════════════════════");
        console.log("📋 OBJETO COMPLETO:", respuesta);
        console.log("📋 PERSONAJE SELECCIONADO:", personaje);
        console.log("📛 NOMBRE:", personaje.name);
        console.log("🆔 ID:", personaje.id);
        console.log("💚 ESTADO:", personaje.status);
        console.log("👽 ESPECIE:", personaje.species);
        console.log("🧬 TIPO:", personaje.type);
        console.log("⚧️ GÉNERO:", personaje.gender);
        console.log("🌍 ORIGEN:", personaje.origin);
        console.log("📍 UBICACIÓN ACTUAL:", personaje.location);
        console.log("📺 EPISODIOS:", personaje.episode);
        console.log("🖼️ IMAGEN:", personaje.image);
        console.log("📅 CREADO:", personaje.created);
        console.log("🔗 URL:", personaje.url);
        console.log("═══════════════════════════════════════════");

        clearErrorMessage();
        
    } catch (error) {
        showErrorMessage('Personaje no encontrado. Intenta con otro nombre.');
        console.error('Error:', error);
    }
};

const buscarPersonaje = () => {
    const nombrePersonaje = searchInput.value;
    if (nombrePersonaje) {
        peticionApi(searchInput);
    } else {
        showErrorMessage('Por favor, ingresa el nombre de un personaje de Rick and Morty');
    }
};

const showErrorMessage = (message) => {
    clearErrorMessage();
    const errorElement = document.createElement('p');
    errorElement.className = 'error__message';
    errorElement.textContent = message;
    document.querySelector('section').appendChild(errorElement);
};

const clearErrorMessage = () => {
    const errorElement = document.querySelector('.error__message');
    if (errorElement) {
        errorElement.remove();
    }
};

searchButton.addEventListener('click', buscarPersonaje);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        buscarPersonaje();
    }
});
