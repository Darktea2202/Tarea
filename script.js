const pokemonName = document.getElementById("pokemon__name");
const imgPokemon = document.getElementById("img__pokemon");
const pokemonId = document.getElementById("pokemon__id");
const searchInput = document.getElementById("pokemon__search");
const searchButton = document.getElementById("search__button");
const initialMessage = document.getElementById("initial__message");
const pokemonContent = document.getElementById("pokemon__content");
const pokemonHeight = document.getElementById("pokemon__height");
const pokemonWeight = document.getElementById("pokemon__weight");
const pokemonTypes = document.getElementById("pokemon__types");
const pokemonAbilities = document.getElementById("pokemon__abilities");
const pokemonExperience = document.getElementById("pokemon__experience");

const peticionApi = async (pokemon) => {
    try {
        const pokemonBusqueda = pokemon.toLowerCase().trim();
        
        const peticionGet = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonBusqueda}`);
        
        if (!peticionGet.ok) {
            throw new Error('Pokémon no encontrado');
        }

        const respuesta = await peticionGet.json();

        const imagen = respuesta.sprites.other.dream_world.front_default || respuesta.sprites.front_default;
        const nombre = respuesta.name;
        const id = respuesta.id;

        const altura = (respuesta.height / 10).toFixed(1);
        const peso = (respuesta.weight / 10).toFixed(1);
        const tipos = respuesta.types.map(type => type.type.name).join(', ');
        const habilidades = respuesta.abilities.map(ability => ability.ability.name).join(', ');
        const experienciaBase = respuesta.base_experience;

        initialMessage.style.display = 'none';
        pokemonContent.style.display = 'block';

        pokemonName.textContent = nombre.charAt(0).toUpperCase() + nombre.slice(1);
        imgPokemon.src = imagen;
        pokemonId.textContent = `#${id}`;

        pokemonHeight.textContent = `${altura} m`;
        pokemonWeight.textContent = `${peso} kg`;
        pokemonTypes.textContent = tipos.charAt(0).toUpperCase() + tipos.slice(1);
        pokemonAbilities.textContent = habilidades.charAt(0).toUpperCase() + habilidades.slice(1);
        pokemonExperience.textContent = experienciaBase;

        console.log(respuesta);
        console.log(respuesta.name);

        clearErrorMessage();
        
    } catch (error) {
        showErrorMessage('Pokémon no encontrado. Intenta con otro nombre.');
        console.error('Error:', error);
    }
};

const buscarPokemon = () => {
    const nombrePokemon = searchInput.value;
    if (nombrePokemon) {
        peticionApi(nombrePokemon);
    } else {
        showErrorMessage('Por favor, ingresa el nombre de un Pokémon');
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

searchButton.addEventListener('click', buscarPokemon);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        buscarPokemon();
    }
});
