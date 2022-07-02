async function getComidas() {
    var requestOptions = {
        method: 'GET',
    };

    return await fetch("https://restaurant-5.herokuapp.com/Comida", requestOptions)
        .then(response => response.json());
}

function comidaToElement(comida) {
    var tr = document.createElement("tr");
    var td_id = document.createElement("td");
    td_id.innerText = comida.id;
    var td_name = document.createElement("td");
    td_name.innerHTML = comida.nombre;
    tr.appendChild(td_id);
    tr.appendChild(td_name);
    return tr;
}

function appendTableComida(element) {
    var tBodyComida = document.getElementById("tBodyComida");
    tBodyComida.appendChild(element);
}

async function loadTable() {
    var res = await getComidas();

    for (const comida of res) {
        var element = comidaToElement(comida);
        appendTableComida(element)
    }

}

loadTable()