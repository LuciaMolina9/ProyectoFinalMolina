//variables y constantes
let render = document.getElementById("renderizable")
let filtroTalle = document.getElementById("filtroTalle")
let filtroColor = document.getElementById("filtroColor")
let filtroTipo = document.getElementById("filtroTipo")
let botonFiltrar = document.getElementById("botonFiltrar")
let resultadoFiltro
let listaProductos = []
let codigoGuardado


//objetos y arrays



//Local Storage
//Recuperacion
function traerCP() {
    codigoGuardado = localStorage.getItem("codigo");
    codigo = JSON.parse(CP);
    
}


//funciones
//Toma de datos del formulario

function validacion(e) {
    e.preventDefault ();
    let formulario = e.target;
    tipo = formulario.children[1].value; //no va a  ir
    talle = formulario.children[2].value;
    color = formulario.children[3].value;
    id = idProd;
    prodSel = new productos (id, talle, color); //casi igual
    console.log (prodSel);
    carrito.push(prodSel);
    console.log(carrito);
    renderizar();
    subirCarrito ();
}

function agregar () {
    Toastify({
        text: "se agregó " + this.id, 
        duration: 3000
        }).showToast();
}

function filtrar () {
    console.log(filtroTalle.value)
    console.log(filtroTipo.value)
    console.log(filtroColor.value)
    resultadoFiltro = listaProductos.filter((el) => 
        el.talles.includes (parseInt(filtroTalle.value)) &&
        el.colores.includes (filtroColor.value) &&
        el.tipo.includes (filtroTipo.value)
    );
    console.log(resultadoFiltro)
    //la idea era ampliar este resultado para renderizar
}



//constructor de productos desde datos del formulario
class productos {
    constructor (id, talle, color, precio) {
        this.id = id;
        this.talle = talle;
        this.color = color;
        this.precio = precio;
    }
}


//fetch
fetch('/js/productos.json')
    .then ( (resp) => resp.json () )
    .then ( (data) => {
        //console.log(data)
        data.forEach((id) => {
            const div = document.createElement('div')
            div.innerHTML = `
            <div class="col-3 justify-content-center" id="${id.nombre}">
                <img class="img-fluid img-thumbnail"
                    src="${id.foto}"
                    alt="foto del producto">
                <p>${id.nombre}</p>
                <p>${id.precio}</p>
            </div>

            `
            const button = document.createElement('button');           
            button.innerHTML = `
            Agregar
            
            `
            button.id = id.nombre;
            button.addEventListener("click", agregar);
            
            render.append(div, button)
            
        });
        listaProductos = data
    }
    
)




//inicio del programa


botonFiltrar.addEventListener("click", filtrar)




/*
<div class="text-center" data-variation-id="1">
                                    <div class="form-group">
                                        <label class="form-label " for="variation_2">TALLE</label>
                                        <select id="variation_2" class="form-select" name="variation[1]">
                                            <option value="35" selected="selected">35</option>
                                            <option value="36">36</option>
                                            <option value="40">40</option>
                                            <option value="37">37</option>
                                            <option value="38">38</option>
                                            <option value="39">39</option>
                                        </select>
                                    </div>
                                </div>

*/

