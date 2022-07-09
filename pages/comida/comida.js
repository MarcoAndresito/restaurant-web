
async function getComidas() {
    var requestOptions = {
        method: 'GET',
    };

    return await fetch("https://restaurant-5.herokuapp.com/Comida", requestOptions)
        .then(response => response.json());
}

function comidaToElement(comida) {
    var tr = document.createElement("tr");
    
    // id
    var td_id = document.createElement("td");
    td_id.innerText = comida.id;
    tr.appendChild(td_id);

    // nombre
    var td_name = document.createElement("td");
    td_name.innerText = comida.nombre;
    tr.appendChild(td_name);

    // precio
    var td_precio = document.createElement('td');
    td_precio.innerText = comida.precio;
    tr.appendChild(td_precio);

    // descripcion
    var td_descripcion = document.createElement('td');
    td_descripcion.innerText = comida.descripcion;
    tr.appendChild(td_descripcion);

    return tr;
}

function appendTableComida(element) {
    var tBodyComida = document.getElementById("tBodyComida");
    tBodyComida.appendChild(element);
}

async function loadTable() {

    document.getElementById('tBodyComida').innerHTML = "";

    var res = await getComidas();

    for (const comida of res) {
        var element = comidaToElement(comida);
        appendTableComida(element)
    }

}

function showModal() {
    var formModal = document.getElementById('formModal');
    formModal.classList.remove('modal-hide');
    formModal.classList.add('modal-show');
}

function hideModal() {
    loadTable();
    var formModal = document.getElementById('formModal');
    formModal.classList.remove('modal-show');
    formModal.classList.add('modal-hide');
}

function submitComida(event) {
    event.preventDefault();

    var id = document.getElementById('id').value;
    var nombre = document.getElementById('nombre').value;
    var precio = document.getElementById('precio').value;
    var descripcion = document.getElementById('descripcion').value;

    var data = {
        "id": id,
        "nombre": nombre,
        "precio": precio,
        "descripcion": descripcion
    };

    var requestOptions = {
        method: 'POST',
        body: JSON.stringify(data),
        redirect: 'follow'
    };

    fetch("https://restaurant-5.herokuapp.com/Comida", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    hideModal();
}

loadTable()