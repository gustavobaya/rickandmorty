function displayEpisode() {
  return `

    <section class="cards_main">
          
          </section>
      `
}

async function getAllEpisodeData() {
  fetch("https:rickandmortyapi.com/api/episode").then(response => response.json())
    .then(json => displayAllEpisodes(json.results));
}

async function displayAllEpisodes(episodesData) {
  let page = document.getElementById("root");
  page.innerHTML = displayEpisode();

  const cardContainer = document.querySelector('.cards_main');
  cardContainer.innerHTML = "";

  episodesData.forEach(episode => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('subcards');

    cardElement.innerHTML = `
        <div class="backgroundImg">
          <h2>${episode.name}</h2>
          <p>${episode.air_date}</p>
          <h1>${episode.episode}</h1>
        </div>
        <div class="divbutton">
          <a href="./info.html"><button>+info</button></a>
          </div>
        </div>
    `;

    cardContainer.appendChild(cardElement);
  });
}