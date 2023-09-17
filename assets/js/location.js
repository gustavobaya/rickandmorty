function displayLocation() {
  return `
          <div class="cards_container">
          <div class="card-all">
        
          </div>
        </div>
    `;
  
}

async function getAllLocationData() {

fetch("https:rickandmortyapi.com/api/location").then(response => response.json())
.then(json => displayAllLocations(json.results))

}


async function displayAllLocations(locationsData) {

  let page = document.getElementById("root");
  page.innerHTML = displayLocation()

  const cardAllContainer = document.querySelector('.card-all');
  cardAllContainer.innerHTML = "";

  locationsData.forEach(location => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');

    cardElement.innerHTML = `
      <img src="../assets/img/tarjeta.jpg" class="card-img-top" alt="...">
      <div class="card-body">
        <p id="nombre">${location.name}</p>
        <p id="dimension">${location.dimension}</p>
        <p id="planeta">${location.type}</p>
        <p id="residentes">Residentes: ${location.residents.length}</p>
        <p id="fechaCreacion">Creación: ${location.created}</p>
      </div>
    `;

    cardAllContainer.appendChild(cardElement);
  });
}