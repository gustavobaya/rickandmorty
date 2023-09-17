//devuelve un array con los items Items traidos de la api
async function getDataPage(urlBase, numeroPagina, cantidadItems) {

    //en caso de no clickear ningun numero de pagina(mostrar pag 1,inicial)
    if (numeroPagina == undefined) {

        numeroPagina = 1;
    }
    if (cantidadItems == undefined) {
        cantidadItems = 20
    }
    var arrayItems;
    const cantItemsPorPagina = cantidadItems;
    var arrNumeros = []
    let base = (numeroPagina - 1) * cantItemsPorPagina + 1;
    for (let index = 0; index < cantItemsPorPagina; index++) {
        arrNumeros[index] = base++
    }
    //url=pricipal/[arrayItems de pagina]
    var urlPage = `${urlBase}/[${arrNumeros}]`
    await fetch(urlPage).then(response => response.json()).then(json => arrayItems = json)
    return arrayItems
}

//devuelve un Elemento tipo div que contiene todos los elementos pedidos
async function mostrarPagina(urlBase, numeroPagina, cantidadItems) {
    // let indicePaginacion=document.getElementById("pagination")
    // indicePaginacion.replaceChildren(generarIndicePaginas(2))
    var data = await getDataPage(urlBase, numeroPagina, cantidadItems)
    var  containerCards=document.createElement("div")
    containerCards.className="containerCards"
    //ortorga formato a cada item
    for(let index = 0; index < data.length; index++) {
        let nameEpisode = await fetch(data[index].episode[0]).then(response => response.json()).then(episode => episode.name)
        let cardItem = document.createElement("div")
        cardItem.className = "cardCharacter"

        cardItem.appendChild(generarElemImagen(data[index].image))
        cardItem.appendChild(generarElemInfo(data[index].name,
            data[index].status,
            data[index].location.name,
            nameEpisode))
        cardItem.appendChild(generarBoton())
        containerCards.appendChild(cardItem)
    }
    return containerCards
}
//devuelve un Elem boton
function generarBoton() {
    //CREO EL ELEMENTO BOTON  DE COMPARACION
    let button = document.createElement("button")
    button.innerHTML = `<a >Compare Character</a>`
    button.className = "btnCompareCharacter"
    return button
}
//devuelve Elem img con la url 
function generarElemImagen(urlImage) {

    let imagen = document.createElement("img")
    imagen.className = "imageCharacter"
    imagen.alt = "imageCharacter"
    imagen.src = `${urlImage}`
    return imagen
}
//devuelve un Elem div que contiene la info pasada por parametro
function generarElemInfo(name, status,location,episode) {
    //CREO EL ELEMENTO PARA EL NOMBRE DEL PJ 
    let nombrePJ = document.createElement("h5")
    nombrePJ.textContent = `${name}`

    //CREO EL ELEMENTO PARA LA INFO ADICIONAL 
    let ul = document.createElement("ul")

    ul.innerHTML =
        `<li class="infoRespuesta">${status}</li>
    <li class="infoSoli">Last known location: </li>
    <li class="infoRespuesta">${location}</li>
    <li class="infoSoli">seen in the episode:</li>
    <li class="infoRespuesta">${episode}</li>
    `
    //AGRUPO LOS ELEMNTOS ANTERIORES DENTRO DE UNO SOLO CONTENEDOR
    var div = document.createElement("div")
    div.className = "infoCharacter"
    div.appendChild(nombrePJ)
    div.appendChild(ul)
    return div

}