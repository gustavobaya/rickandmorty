function showNavBar() {
  return `
        <nav class="nav-extended deep-purple lighten-1">
        <div class="nav-wrapper">
        <a id="logoHomeBtn" style="cursor: pointer ; " class="brand-logo left hide-on-med-and-down"> 
            <img style="height: 135px; width: 135;" src="../assets/img/logoNav.png" alt="logonNav">
        </a>

        <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        
        <div class="container hide-on-med-and-down" style="display:flex; justify-content:center;">
            <ul id="nav-mobile" style="list-style: none;">
            <li><a id="charNavBtn" class="waves-effect waves-light btn">CHARACTER</a></li>
            <li><a id="locNavBtn" class="waves-effect waves-light btn">LOCATION</a></li>
            <li><a id="epiNavBtn" class="waves-effect waves-light btn">EPISODE</a></li>
            </ul>
        </div>
        
        <div class="container">
            <form  style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%);">
            <div class="input-field right">
                <input id="searchNavbar" type="search" placeholder="Buscar..." required>
                <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                <i class="material-icons">close</i>
            </div>
            </form>
        </div>
        </div>

        <div id="pagination" style="display:flex; justify-content:center;" class="nav-content">
        
        </div>        
    </nav>

    <ul class="sidenav" id="mobile-demo">
        <li><a href="../index.html">HOME</a></li>
        <li><a href="character.html">CHARACTERS</a></li>
        <li><a href="location.html">LOCATIONS</a></li>
        <li><a href="episode.html">EPISODES</a></li>
    </ul>
    `;
}

function addNavListeners() {
  const buttonsIds = ["charNavBtn", "locNavBtn", "epiNavBtn", "logoHomeBtn"];

  buttonsIds.forEach((id) => {
    const button = document.getElementById(id);
    button.addEventListener("click", (e) => {
      pageToDisplay(e.currentTarget.id);
    });
  });

  setNavSearch();
}

async function setNavSearch() {
  const searchInput = document.getElementById("searchNavbar");

  searchInput.addEventListener("keyup", async () => {
    const searchValue = searchInput.value;
    //searchCachedData(searchValue);
    // fetchSearchData(searchValue).then(function(result){
    //     result.results.forEach(item => console.log(item))
    // });
    let fetchedData = await fetchSearchData(searchValue);
    // fetchSearchData(searchValue).then(function (result) {
    //     if (result !== null && result !== undefined) {
    //         displaySearchedData(result.results);
    //     }
    // });
    if (fetchedData) {
      displaySearchedData(fetchedData.results);
    }
  });
}

async function displaySearchedData(searchedData) {
  if (searchedData !== undefined) {
  }
  const cardAllContainer = document.querySelector(".card-all");
  cardAllContainer.innerHTML = "";

  searchedData.forEach((input) => {
    const cardAllContainer = document.querySelector(".card-all");
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    cardElement.innerHTML = `
        <img src="../assets/img/tarjeta.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <p id="nombre">${input.name}</p>
          <p id="dimension">${input.dimension}</p>
          <p id="planeta">${input.type}</p>
          <p id="residentes">Residents: ${input.residents.length}</p>
          <p id="fechaCreacion">Creación: ${input.created}</p>
        </div>
      `;

    cardAllContainer.appendChild(cardElement);
  });
}

async function fetchSearchData(searchValue) {
  let page = sessionStorage.getItem("paginaActual");
  const urlEndPoint = `https://rickandmortyapi.com/api/${page}/?name=${searchValue}`;
  await fetch(urlEndPoint)
    .then((response) => response.json())
    .then((json) => (searchedData = json));
  return searchedData;
}

// function searchCachedData(searchValue) {
//     let page = sessionStorage.getItem('paginaActual');
//     const cachedData = JSON.parse(sessionStorage.getItem(page));
//     getDataFromCached(cachedData.results, searchValue);
// }

// function getDataFromCached(cachedData, searchValue) {
//     const resultados = cachedData.filter(item => {
//         return item.name.toLowerCase().includes(searchValue.toLowerCase())
//     });
//     return resultados;
// }

//--------------------------------activar/ DESACTIVAR botones de nav

function activarDesactivarBotonNav() {
  let botonesNav = document.querySelectorAll(".botonNav");
  botonesNav.forEach((boton) => {
    boton.addEventListener("click", (ev) => {
      // Cambia "botonesNav" a "boton"
      if (ev.target.hasAttribute("id")) {
        ev.target.removeAttribute("id");
      } else {
        ev.target.setAttribute("id", "paginaActiva");
      }
    });
  });
}
activarDesactivarBotonNav();

//------------------paginacion characters
function generarNumero(numero) {
  let li = document.createElement("li");
  li.className = "waves-effect numeroPagina";
  li.innerHTML = `<a href="#!">${numero}</a>`;
  return li;
}

const itemsPerPage = 7; // Cambiar esto según la cantidad de índices por página
const totalPages = 42; // Cambiar esto al número total de páginas

const containerNumeros = document.getElementById("pagination");

const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let currentPage = 1;

function generatePageNumbers() {
  containerNumeros.innerHTML = "";
  //agrego boton prev
  let flechaIzq = document.createElement("a");
  flechaIzq.className = "waves-effect";
  flechaIzq.id = "prev";
  flechaIzq.innerHTML = `<i class="material-icons">chevron_left</i>`;
  containerNumeros.appendChild(flechaIzq);
  //creo el ul donde iran los numeros
  let ulContainer = document.createElement("ul");
  ulContainer.id = "contenedorIndices";
  ulContainer.className = "pagination";

  // lleno el ul con numeros inicio numeros
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalPages);
  // genero los indices
  for (let i = startIndex; i <= endIndex; i++) {
    let li = generarNumero(i);
    li.addEventListener("click", async (e) => {
      let main = document.getElementById("root");
      // let pagina=sessionStorage.getItem("paginaAcutual")
      // if(pagina=="character"){
      main.replaceChildren(
        await mostrarPagina(
          "https://rickandmortyapi.com/api/character",
          parseInt(e.target.textContent),
          20
        )
      );
      // }
    });

    //agrego Numeros
    ulContainer.appendChild(li);
    // let pagination = document.getElementById("pagination")
    // pagination.replaceChildren(containerNumeros)
  }
  //agrego el ul lleno de numeros al contenedor de indices
  containerNumeros.appendChild(ulContainer);
  //cierro con boton next
  let flechaDerecha = document.createElement("a");
  flechaDerecha.className = "waves-effect next";
  flechaDerecha.id = "next";
  flechaDerecha.innerHTML = `<i class="material-icons">chevron_right</i>`;
  containerNumeros.appendChild(flechaDerecha);
  console.log(containerNumeros);
}

function goToPage(page) {
  currentPage = page;
  generatePageNumbers();
}

// prevButton.addEventListener("click", () => {
//   if (currentPage > 1) {
//     goToPage(currentPage - 1);
//   }
// });

// nextButton.addEventListener("click", () => {
//   if (currentPage < totalPages) {
//     goToPage(currentPage + 1);
//   }
// });
