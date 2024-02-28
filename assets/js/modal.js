const modal = document.getElementById('modal');

class PokemonData {
    id;
    name;
    type;
    types = [];
    photo;
    hp;
    attack;
    defense;
    spAttack;
    spDefense;
    speed;
}



function createModal(pokemon) {
    return `
        <div class="pokemon-modal ${pokemon.type}">
            <div class="buttons">
                <button id="botaoModal" onclick='closeModal()'><i class="fa-solid fa-arrow-left fa-lg"></i></button>
                <button onclick="favIcon()"><i class="fa-regular fa-heart fa-lg" id="favIcon"></i></button>
            </div>
            <div class="pokemon-img">
                <div class="name-id">
                    <h1 class="name">${pokemon.name}</h1>
                    <h2>#${pokemon.id}</h2>
                </div>
                <div class="types">
                    ${pokemon.types.map((type) => `<p class="type ${type}">${type}</p>`).join('')}
                </div>
                <img src="${pokemon.photo}" alt="Image of ${pokemon.number}">
            </div>
            <div class="pokemon-info">
                <div class="pokemon-info-title">
                    Base Stats
                    
                </div>
                <div class="base-stats">
                    <div class="modal-stats">
                        <div class="single-stats">
                            <p class="stats-name">HP</p>
                            <p class="stats-value" id="hpValue">${pokemon.hp}</p>
                            <div class="stats-line">
                                <div class="filled" id="hp"></div>
                            </div>
                        </div>
                        <div class="single-stats">
                            <p class="stats-name">Attack</p>
                            <p class="stats-value" id="attackValue">${pokemon.attack}</p>
                            <div class="stats-line">
                                <div class="filled" id="attack"></div>
                            </div>
                        </div>
                        <div class="single-stats">
                            <p class="stats-name">Defense</p>
                            <p class="stats-value" id="defenseValue">${pokemon.defense}</p>
                            <div class="stats-line">
                                <div class="filled" id="defense"></div>
                            </div>
                        </div>
                        <div class="single-stats">
                            <p class="stats-name">Sp. Attack</p>
                            <p class="stats-value" id="spAttackValue">${pokemon.spAttack}</p>
                            <div class="stats-line">
                                <div class="filled" id="spattack"></div>
                            </div>
                        </div>
                        <div class="single-stats">
                            <p class="stats-name">Sp. Defense</p>
                            <p class="stats-value" id="spDefenseValue">${pokemon.spDefense}</p>
                            <div class="stats-line">
                                <div class="filled" id="spdefense"></div>
                            </div>
                        </div>
                        <div class="single-stats">
                            <p class="stats-name">Speed</p>
                            <p class="stats-value" id="speedValue">${pokemon.speed}</p>
                            <div class="stats-line">
                                <div class="filled" id="speed"></div>
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
        </div>`
}

function getDataToModal (pokemon) {
    const pokemonModal = new PokemonData()

    pokemonModal.id = pokemon.id
    pokemonModal.name = pokemon.name
    pokemonModal.types = pokemon.types.map((typeSlot) => typeSlot.type.name)
    pokemonModal.type = pokemonModal.types[0]
    pokemonModal.photo = pokemon.sprites.other.dream_world.front_default
    pokemonModal.hp = pokemon.stats[0].base_stat
    pokemonModal.attack = pokemon.stats[1].base_stat
    pokemonModal.defense = pokemon.stats[2].base_stat
    pokemonModal.spAttack = pokemon.stats[3].base_stat
    pokemonModal.spDefense = pokemon.stats[4].base_stat
    pokemonModal.speed = pokemon.stats[5].base_stat

    return createModal(pokemonModal);
}

function updateStatsBar(pokemonModal) {
    let hpValue = document.getElementById('hpValue').innerHTML
    let attackValue = document.getElementById('attackValue').innerHTML
    let defenseValue = document.getElementById('defenseValue').innerHTML
    let spattackValue = document.getElementById('spAttackValue').innerHTML
    let spdefenseValue = document.getElementById('spDefenseValue').innerHTML
    let speedValue = document.getElementById('speedValue').innerHTML
    
    document.getElementById('hp').style.width = `${hpValue}%`
    document.getElementById('attack').style.width = `${attackValue}%`
    document.getElementById('defense').style.width = `${defenseValue}%`
    document.getElementById('spattack').style.width = `${spattackValue}%`
    document.getElementById('spdefense').style.width = `${spdefenseValue}%`
    document.getElementById('speed').style.width = `${speedValue}%`
}

async function showModal(idPokemon) {
    const url = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`
    modal.style.display = 'flex'

    const response = await fetch(url)
    const responseData = await response.json()
    const modalData = getDataToModal(responseData)
    modal.innerHTML = modalData
    updateStatsBar(modalData)
}

// Arrumar botão favorito
function favIcon() {
    let favouriteIcon = document.getElementById('favIcon')
    favouriteIcon.className = "fa-solid fa-heart";
}

function closeModal() {
    if (modal.style.display == 'flex') {
        modal.style.display = 'none'
    }
}



