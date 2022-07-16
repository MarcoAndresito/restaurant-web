
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

    // boton eliminar
    var button_elliminar = document.createElement('button');
    button_elliminar.addEventListener("click", function () { eliminarComida(comida.id) });
    button_elliminar.textContent = "Eliminar";
    button_elliminar.type = "button";

    // boton editar
    var button_editar = document.createElement("button");
    button_editar.addEventListener("click", function () { editarComida(comida.id) });
    button_editar.textContent = "Editar";
    button_editar.type = "button";

    // acciones
    var td_actions = document.createElement('td');
    td_actions.appendChild(button_elliminar);
    td_actions.appendChild(button_editar);
    tr.appendChild(td_actions);

    return tr;
}

async function editarComida(id) {
    var requestOptions = {
        method: 'GET'
    }

    var comida = await fetch('https://restaurant-5.herokuapp.com/Comida/' + id, requestOptions)
        .then(response => response.json())

    document.getElementById('id').value = comida.id;
    document.getElementById('nombre').value = comida.nombre;
    document.getElementById('precio').value = comida.precio;
    document.getElementById('descripcion').value = comida.descripcion;

    document.getElementById('modalTitle').innerText = "Editar Comida";

    showModal();
}

function eliminarComida(id) {
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow',
        mode: "no-cors"
    };

    fetch("https://restaurant-5.herokuapp.com/Comida/" + id, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
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

function nuevaComida() {
    document.getElementById('id').value = 0;
    document.getElementById('nombre').value = "";
    document.getElementById('precio').value = 0;
    document.getElementById('descripcion').value = "";

    document.getElementById('modalTitle').innerText = "Nueva Comida";

    showModal();
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

async function submitComida(event) {
    event.preventDefault();

    var id = document.getElementById('id').value;
    var nombre = document.getElementById('nombre').value;
    var precio = parseInt(document.getElementById('precio').value);
    var descripcion = document.getElementById('descripcion').value;

    var data = {};
    var requestOptions = {};
    console.log(id);
    if (id > 0) {
        data = {
            "id": id,
            "nombre": nombre,
            "precio": precio,
            "descripcion": descripcion
        };
        requestOptions = {
            method: 'PUT',
            body: JSON.stringify(data),
            redirect: 'follow',
        };
    }
    else {
        data = {
            "nombre": nombre,
            "precio": precio,
            "descripcion": descripcion
        };
        requestOptions = {
            method: 'POST',
            body: JSON.stringify(data),
            redirect: 'follow',
        };
    }

    await fetch("https://restaurant-5.herokuapp.com/Comida", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    hideModal();
}

loadTable()