// Seleccionamos los elementos
const pokemonContainer = document.getElementById('pokemon-container');
const loadMoreButton = document.getElementById('load-more');

let offset = 0;
const limit = 10; // Número de Pokémon por petición

// Función para obtener datos de la API
async function getPokemonData() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        const data = await response.json();
        
        console.log('Pokémon List:', data.results); // Verificar que recibimos la lista de Pokémon

        data.results.forEach(async pokemon => {
            const pokemonDetails = await fetch(pokemon.url);
            const pokemonData = await pokemonDetails.json();

            console.log('Pokémon Details:', pokemonData); // Verificar que recibimos detalles de cada Pokémon

            displayPokemon(pokemonData);
        });
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
}

// Función para mostrar los Pokémon en el DOM
function displayPokemon(pokemon) {
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon-card');
    
    // Verifica si los sprites y otros datos están disponibles
    const pokemonImage = pokemon.sprites?.front_default ? pokemon.sprites.front_default : 'placeholder.png';

    pokemonCard.innerHTML = `
        <img src="${pokemonImage}" alt="${pokemon.name}">
        <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
        <p>#${pokemon.id}</p>
    `;

    // Verificar que se están generando correctamente las tarjetas
    console.log('Generated Pokémon Card:', pokemonCard);

    pokemonContainer.appendChild(pokemonCard);
}

// Evento para cargar más Pokémon al hacer clic en el botón
loadMoreButton.addEventListener('click', () => {
    offset += limit;
    getPokemonData();
});

// Cargamos los primeros Pokémon al iniciar la página
getPokemonData();

//..s.