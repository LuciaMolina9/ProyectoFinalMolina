//declaraciones
let render = document.getElementById("renderizable");
let filtroTalle = document.getElementById("filtroTalle");
let filtroColor = document.getElementById("filtroColor");
let filtroTipo = document.getElementById("filtroTipo");
let botonFiltrar = document.getElementById("botonFiltrar");
let resultadoFiltro;
let listaProductos = [];
let prodSel = [];
let carrito = [];
let carritoLS = localStorage.getItem('carritoLS')


//Subida al carrito
function subirCarrito() {
    localStorage.setItem('carritoLS', JSON.stringify(carrito))
}

//Local Storage
//Recuperacion
function traerCarrito() {
    if (carritoLS === null) {
        JSON.stringify(localStorage.setItem('carritoLS', []))
    }
    else {
        carrito = JSON.parse(carritoLS)
    }
}


//funciones
function agregar () {
    Toastify({
        text: "se agregó " + this.id, 
        duration: 3000
        }).showToast();
    prodSel = this.id;
    carrito.push(prodSel);
    console.log(carrito);
    subirCarrito()    
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


//fetch
fetch('/js/productos.json')
    .then ( (resp) => resp.json () )
    .then ( (data) => {
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

traerCarrito();
console.log(carrito);
botonFiltrar.addEventListener("click", filtrar)


