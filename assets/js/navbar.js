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
        <ul class="pagination">
            <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
            <li class="active deep-purple lighten-1"><a href="#!">1</a></li>
            <li class="waves-effect"><a href="#!">2</a></li>
            <li class="waves-effect"><a href="#!">3</a></li>
            <li class="waves-effect"><a href="#!">4</a></li>
            <li class="waves-effect"><a href="#!">5</a></li>
            <li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
        </ul>
        </div>        
    </nav>

    <ul class="sidenav" id="mobile-demo">
        <li><a href="../index.html">HOME</a></li>
        <li><a href="character.html">CHARACTERS</a></li>
        <li><a href="location.html">LOCATIONS</a></li>
        <li><a href="episode.html">EPISODES</a></li>
    </ul>
    `
}

function addNavListeners() {
    const buttonsIds = ['charNavBtn', 'locNavBtn', 'epiNavBtn', 'logoHomeBtn'];

    buttonsIds.forEach(id => {
        const button = document.getElementById(id);
        button.addEventListener('click', (e) => {
            pageToDisplay(e.currentTarget.id);
        });
    });

    setNavSearch();
}

async function setNavSearch() {
    const searchInput = document.getElementById("searchNavbar");

    searchInput.addEventListener("keyup", async() => {
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
        if(fetchedData) {
            displaySearchedData(fetchedData.results);
        }
    }
    );
}

async function displaySearchedData(searchedData) {
    if (searchedData !== undefined) {
        
    }
    const cardAllContainer = document.querySelector('.card-all');
    cardAllContainer.innerHTML = "";

    searchedData.forEach(input => {
        const cardAllContainer = document.querySelector('.card-all');
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

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
    }
    );
}

async function fetchSearchData(searchValue) {
    let page = sessionStorage.getItem('paginaActual');
    const urlEndPoint = `https://rickandmortyapi.com/api/${page}/?name=${searchValue}`;
    await fetch(urlEndPoint)
         .then(response => response.json())
         .then(json =>
             searchedData = json
         );
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