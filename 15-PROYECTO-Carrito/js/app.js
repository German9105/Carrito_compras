//Creacion de variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");    
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

    cargarEventListeners();
    function cargarEventListeners () {
            //TODO Cuando agregas un curso presionando "Agregar al carrito"
            listaCursos.addEventListener("click", agregarCurso); 
            //TODO Elimina cursos del carrito
            carrito.addEventListener("click", eliminarCurso);
            //TODO Vaciar carrito
            vaciarCarritoBtn.addEventListener("click", () => {
                articulosCarrito = [];
                limpiarHTML();
            })
    };

    //Funciones
    function agregarCurso (e) {
        e.preventDefault();
        if(e.target.classList.contains("agregar-carrito")) {
            const cursoSeleccionado = e.target.parentElement.parentElement;  
            leerDatosCurso (cursoSeleccionado);
        }
    };

            //TODO Elimina un curso del carrito
    function eliminarCurso(e) {
        if(e.target.classList.contains("borrar-curso")) {
            const cursoId = e.target.getAttribute("data-id");
            //TODO eliminar del arreglo de articulosCarrito por el data-id
            articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
            carritoHTML(); // TODO Iterar sobre el carrito y mostrar su HTML
        }
    }


    function leerDatosCurso (curso) { 
        const infoCurso = {
            imagen: curso.querySelector("img").src,
            titulo: curso.querySelector("h4").innerHTML,
            precio: curso.querySelector(".precio span").innerHTML,
            id: curso.querySelector("a").getAttribute("data-id"),
            cantidad: 1
        }

        const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
        if(existe){
            const cursos = articulosCarrito.map(curso => {
                if(curso.id === infoCurso.id) {
                    curso.cantidad++;
                    return curso; 
                } else{
                    return curso; 
                }
            });
            articulosCarrito = [...cursos];
        } else{
            articulosCarrito = [...articulosCarrito, infoCurso];
        }
        console.log(articulosCarrito);
        carritoHTML();
    };
        
    function carritoHTML() { 
            limpiarHTML();
            articulosCarrito.forEach( curso => {
                const {imagen, titulo, precio, cantidad, id} = curso; // Destructuring
                const row = document.createElement("tr");
                    row.innerHTML = `
                    <td> <img src= "${curso.imagen}" width = "100"> </td>
                    <td> ${titulo} </td>
                    <td> ${precio} </td>
                    <td> ${cantidad} </td>
                    <td> 
                    <a href= "#" class= "borrar-curso" data-id= "${id}" > X </a>
                    </td>
                    `;
                contenedorCarrito.appendChild(row);
            })
        };
        
    function limpiarHTML() {
        while(contenedorCarrito.firstChild) {
             contenedorCarrito.removeChild(contenedorCarrito.firstChild);
             }
        };
            

    


        



