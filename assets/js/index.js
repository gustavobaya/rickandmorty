function displayHome() {
    return `
    <div class="index">
        <div class="indexTitle">
            <img src="assets/img/logoHome.png" style="width: 85%;" alt="index logo">
        </div>

        <div class="card-container1">
            <div class="card1">
                <div id="characters" class="card-inner">
                    <div class="card-front">
                        <h3>CHARACTERS</h3>
                    </div>
                    <div class="card-back">
                        <p>Find and compare yoour favourite characters</p>
                    </div>
                </div>
            </div>

            <div class="card1">
                <div id="locations" class="card-inner">
                    <div class="card-front">
                        <h3>LOCATIONS</h3>
                    </div>
                    <div class="card-back">
                        <p>Each one of the locations with all the related information</p>
                    </div>
                </div>
            </div>

            <div class="card1">
                <div id="episodes" class="card-inner">
                    <div class="card-front">
                        <h3>EPISODES</h3>
                    </div>
                    <div class="card-back">
                        <p>Everything you need to know about each episode and its characters</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}

addIndexListeners()
//getData()
function addIndexListeners() {
    const cards = document.querySelectorAll('.card-inner');


    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            pageToDisplay(e.currentTarget.id);
        });
    });

}


async function pageToDisplay(pageFromClick) {
    let pageNavBar = document.getElementById("headerNavBar");
    let page = document.getElementById("root");
    switch (pageFromClick) {
        case "characters":
        case "charNavBtn":
            pageNavBar.innerHTML = showNavBar();
            addNavListeners();
            sessionStorage.setItem('paginaActual', 'character');
            const contenido = await mostrarPagina("https://rickandmortyapi.com/api/character");
            page.innerHTML = contenido.outerHTML;
            break;
        case "locations":
        case "locNavBtn":
            pageNavBar.innerHTML = showNavBar();
            addNavListeners();
            sessionStorage.setItem('paginaActual', 'location');
            await getAllLocationData();
            break;
        case "episodes":
        case "epiNavBtn":
            pageNavBar.innerHTML = showNavBar();
            addNavListeners();
            sessionStorage.setItem('paginaActual', 'episode');
            await getAllEpisodeData();
            break;
        default:
            sessionStorage.setItem('paginaActual', 'home');
            pageNavBar.innerHTML = "";
            page.innerHTML = displayHome();
            addIndexListeners()
            break;
    }
}

// async function getData() {
//     await fetch("https://rickandmortyapi.com/api/character")
//         .then(response => response.json())
//         .then(json=>sessionStorage.setItem('character', JSON.stringify(json)));


//     await fetch("https://rickandmortyapi.com/api/location")
//         .then(response => response.json())
//         .then(json=>sessionStorage.setItem('location', JSON.stringify(json)));


//     await fetch("https://rickandmortyapi.com/api/episode")
//         .then(response => response.json())
//         .then(json=>sessionStorage.setItem('episode', JSON.stringify(json)));
// }
