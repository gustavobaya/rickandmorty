var pagination = document.getElementsByClassName(`pagination`);
var btnAgregar = document.getElementsByClassName(`waveseffect`);

async function getEpisodeData() {
  const response = await fetch(`https://rickandmortyapi.com/api/episode`);
  const data = response.json();
  return data;
}
getEpisodeData();

pagination.addEventListener(`click`, (e) => {
  console.log(e.target.tagName);
  if (e.target && e.target.tagName === "A") {
    e.target.classlist.toggle(`activo`);
  }
});

function createCard(episode, air_date, name) {
  return `
  <div class="subcards">
            <div class="backgroundImg">
              <h2>${name}</h2>
            <p>${air_date}</p>
            <h1>${episode}</h1>
            </div>
            <div class="divbutton">
              <a href="./info.html"><button>+info</button></a>
            </div>
          </div>
  `;
}

async function displayEpisodes() {
  const data = await getEpisodeData();

  let result = "";
  for await (element of data.results) {
    result += createCard(element.episode, element.air_date, element.name);
  }
  return result;
}

addEventListener
// waveseffect.addEventListener(`click`, () => {
//   const elemento = `
//   <li class="waveseffect"><a href="#!">1</a></li>
//             <li class="waveseffect"><a href="#!">2</a></li>
//             <li class="waveseffect"><a href="#!">3</a></li>
//   `;
// });
