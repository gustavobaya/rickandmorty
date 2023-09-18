function displayEpisode() {
  return `
    <section class="cards_main">
    </section>
  `;
}

function displayEpisodePaginationBar(pages) {
  const paginationContainer = document.getElementById("pagination");
  let ulistElement = document.createElement("ul");
  ulistElement.className = "pagination";

  const leftArrow = document.createElement("li");
  leftArrow.className = "waveseffect";
  leftArrow.innerHTML = `<a href="#!"><i class="material-icons">chevron_left</i></a>`;

  const rightArrow = document.createElement("li");
  rightArrow.className = "waveseffect";
  rightArrow.innerHTML = `<a href="#!"><i class="material-icons">chevron_right</i></a>`;

  ulistElement.appendChild(leftArrow);

  pages.forEach((page, index) => {
    const listElement = document.createElement("li");
    listElement.setAttribute("id", `page-${index + 1}`);
    const elClasses = listElement.classList;
    elClasses.add("waveseffect");
    elClasses.add("page-button");
    listElement.innerHTML = `<a href="#!">${index + 1}</a>`;
    ulistElement.appendChild(listElement);
  });

  ulistElement.appendChild(rightArrow);

  paginationContainer.appendChild(ulistElement);
}
//se agrega los eventos a los botones
function addPaginationListeners(episodes) {
  const pages = document.querySelectorAll(".page-button");
  pages.forEach((pageLink) => {
    pageLink.addEventListener("click", (e) => {
      let page = e.currentTarget.id.split("-")[1];
      displayAllEpisodes(episodes);
      cleanActiveButtons(pages);
      pageLink.className = "active";
      console.log(page);
      getAllEpisodeData(page);
    });
  });
}

function cleanActiveButtons(links) {
  links.forEach((link) => link.classList.remove("active"));
}

async function getAllEpisodeData(page = 1) {
  const response = await fetch(
    `https:rickandmortyapi.com/api/episode?page=${page}`
  );
  const json = await response.json();
  const episodes = await json.results;
  const pages = json.info.pages;
  displayAllEpisodes(episodes);

  const paginationContainer = document.getElementById("pagination");
  if (paginationContainer.childNodes.length === 1) {
    displayEpisodePaginationBar(Array(pages).fill(0));
  }

  addPaginationListeners(episodes);
}
// se crean las cartas
async function displayAllEpisodes(episodesData) {
  let page = document.getElementById("root");
  page.innerHTML = displayEpisode();

  const cardContainer = document.querySelector(".cards_main");
  cardContainer.innerHTML = "";

  episodesData.forEach((episode) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("subcards");

    cardElement.innerHTML = `
        <div class="backgroundImg">
          <h2>${episode.name}</h2>
          <p>${episode.air_date}</p>
          <h1>${episode.episode}</h1>
        </div>
        <div class="divbutton">
          <a href=""><button class="moreInfo">+info</button></a>
          </div>
        </div>
    `;

    cardContainer.appendChild(cardElement);
  });
}
//se puede reemplazar con paginacion de la api
// ej https://rickandmortyapi.com/api/episode?page=1
// function paginatedEpisodes(list, limit = 5) {
//   const pages = { 1: [] }; //objeto paginacion

//   list.forEach((episode) => {
//     let page = Object.keys(pages).length;

//     if (pages[page].length === limit) {
//       pages[page + 1] = [episode];
//     } else {
//       pages[page].push(episode);
//     }
//   });

//   return pages; //devuelvo episodios paginados en un objeto

let moreInfo = document.querySelectorAll(".moreInfo");
moreInfo.forEach((element) => {
  console.log("holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

  element.addEventListener("click", () => {
    console.log("holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

    let mein = document.getElementById("root");
    mein.innerHTML = "";
    mein.innerHTML = "hola";
  });
});
