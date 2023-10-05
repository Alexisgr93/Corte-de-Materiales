var resultadosVisible = false;
var calculoRealizado = false;

function cerrarCarta() {
  var cardContainer = document.getElementById("card-container-0");
  cardContainer.style.display = "none";
  resultadosVisible = false;
}

function mostrarDetalle(slideIndex) {
    if (calculoRealizado) {
        var resultadoSlide = document.getElementById("resultado-slide-" + slideIndex);
        var cardContainer = document.getElementById("card-container-" + slideIndex);

        if (!resultadosVisible && resultadoSlide.classList.contains("active")) {
            cardContainer.style.display = "block";
            resultadosVisible = true;
        } else {
            cardContainer.style.display = "none";
            resultadosVisible = false;
        }
    } else {
        alert("Primero debe calcular los resultados.");
    }
}



/* Archivo basura o repetido
function agregarMaterial() {
	var tabla = document.getElementById("tabla-materiales");
	var fila = tabla.insertRow();
	var celdaMaterial = fila.insertCell();
	var celdaCantidad = fila.insertCell();
	celdaMaterial.innerHTML = '<input type="text" name="material[]" />';
	celdaCantidad.innerHTML = '<input type="number" name="cantidad[]" />';
}*/

function capturarDatos() {
	var largo = document.getElementById("largo").value;
	var corte = document.getElementById("corte").value;
	var materiales = document.getElementsByName("material[]");
	var cantidades = document.getElementsByName("cantidad[]");

	//alert si no ingresa datos antes de calcular
	if (largo === "" || corte === "" || materiales.length === 0 || cantidades.length === 0) {
        alert("Por favor, complete todos los datos.");
        return;
    }
	//alert si no ingresa datos en materiales y cantidades
	for (var i = 0; i < materiales.length; i++) {
        if (materiales[i].value === "" || cantidades[i].value === "") {
            alert("Por favor, complete todos los datos.");
            return;
        }
    }

	//alert si son numeros negativos o iguales a 0
	if (largo <= 0 || corte <= 0 || materiales.length <= 0 || cantidades.length <= 0) {
        alert("Por favor, Ingrese un nmero mayor a 0, en el largo del material");
		
		// Después de agregar material, cambia la clase del botón a btn-outline-primary
		var botonMostrarResultados = document.querySelector('.btn.btn-primary');
		if (botonMostrarResultados) {
			botonMostrarResultados.classList.replace('btn-primary', 'btn-outline-primary');
		}
		calculoRealizado = false;
	
        return;
    }
	for (var i = 0; i < materiales.length; i++) {
        if (materiales[i].value <= 0 || cantidades[i].value <= 0) {
            alert("Por favor, Ingrese un nmero mayor a 0, en el largo del material");

			// Después de agregar material, cambia la clase del botón a btn-outline-primary
			var botonMostrarResultados = document.querySelector('.btn.btn-primary');
					if (botonMostrarResultados) {
						botonMostrarResultados.classList.replace('btn-primary', 'btn-outline-primary');
					}
					calculoRealizado = false;

            return;
        }
    }
	
	var totalMateriales = 0;
	var mensajeMateriales = "";
	for (var i = 0; i < materiales.length; i++) {
		var material = parseFloat(cantidades[i].value) * (parseFloat(materiales[i].value) + parseFloat(corte));
		totalMateriales += material;

		// Generar mensaje de los materiales a cortar
        mensajeMateriales += "Largo del Material: " + materiales[i].value + " - Cantidad: " + cantidades[i].value + "<br>";
	}
	

	var sobrante = parseFloat(largo) - totalMateriales;

	var mensaje = "Largo ingresado: " + largo + "<br>Corte de herramienta: " + corte;
	mensaje += "<br>Materiales a cortar:<br>";
	for (var i = 0; i < materiales.length; i++) {
		mensaje += "Largo del Material: " + materiales[i].value + " - " + "Cantidad: " + cantidades[i].value + "<br>";
	}

	if (sobrante < 0) {
        mensaje += "El valor del material sobrante es negativo: " + sobrante;
    } else {
        mensaje += "Sobrante de material: " + sobrante;
    }


	var resultadoSlide0 = document.getElementById("resultado-slide-0");
	var resultadoParte1 = document.getElementById("resultado-texto-parte1");

	var resultadoSlide1 = document.getElementById("resultado-slide-1");
	var resultadoParte2 = document.getElementById("resultado-texto-parte2");
	var resultadoMateriales = document.getElementById("resultado-texto-materiales");
	
	var resultadosCartas = document.getElementById("cartas-resultantes");
	var colorCartas = document.getElementById("color-carta");

    if (sobrante < 0) {
        resultadoSlide0.style.backgroundColor = "rgb(192, 57, 43)";
		resultadoSlide1.style.backgroundColor = "rgb(192, 57, 43)";
		colorCartas.style.backgroundColor = "rgb(192, 57, 43)";
		colorCartas.style.color = "rgb(255,255,255)";
		
    } else {
        resultadoSlide0.style.backgroundColor = "rgb(30, 132, 73)";
		resultadoSlide1.style.backgroundColor = "rgb(30, 132, 73)";
		colorCartas.style.backgroundColor = "rgb(30, 132, 73)";
		colorCartas.style.color = "rgb(255,255,255)";
    }
	
	resultadoParte1.innerHTML = "Largo ingresado: " + largo + "<br>Corte de herramienta: " + corte + "<br>Sobrante de material: " + sobrante;
	// Después de generar el mensaje de materiales a cortar

resultadoMateriales.innerHTML = "Materiales a cortar:<br>" + mensajeMateriales;
	//document.getElementById("resultado-texto-parte2").innerHTML = mensaje.replace(/\n/g, "<br>");
	//carta
	resultadosCartas.innerHTML = "Largo ingresado: " + largo + "<br>Corte de herramienta: " + corte + "<br>Materiales a cortar: <br>" + mensajeMateriales + "Sobrante de material: " + sobrante;

	//alert(mensaje);
	//document.getElementById("resultado").innerHTML = "El sobrante de material es: " + sobrante;
	document.getElementById("cartas-resultantes").innerHTML = mensaje;

	calculoRealizado = true;
	// Después de realizar el cálculo, cambia la clase del botón
    var botonMostrarResultados = document.querySelector('.btn.btn-outline-primary');
    botonMostrarResultados.classList.replace('btn-outline-primary', 'btn-primary'); // Cambia la clase al color actual
}



function crearFilaTabla() {
    var fila = document.createElement("tr");
    fila.classList.add("table-light"); // clase Bootstrap para filas de tabla claras

    var celdaMaterial = document.createElement("td");
    celdaMaterial.innerHTML = '<input type="number" class="form-control" name="material[]" placeholder="Valor en mm"/>';

    var celdaCantidad = document.createElement("td");
    celdaCantidad.innerHTML = '<input type="number" class="form-control" name="cantidad[]" placeholder="Cantidad a cortar"/>';

    var celdaEliminar = document.createElement("td");
    var iconoEliminar = document.createElement("i");
    iconoEliminar.classList.add("fas", "fa-trash-alt", "text-danger", "eliminar-material");
    iconoEliminar.addEventListener("click", function () {
        // Aquí puedes agregar la lógica para eliminar la fila
        fila.remove();
    });
    celdaEliminar.appendChild(iconoEliminar);

    fila.appendChild(celdaMaterial);
    fila.appendChild(celdaCantidad);
    fila.appendChild(celdaEliminar);

    return fila;
}





function agregarMaterial() {
    var tabla = document.getElementById("tabla-materiales");
    var fila = crearFilaTabla();
    tabla.appendChild(fila);
	// Después de agregar material, cambia la clase del botón a btn-outline-primary
    var botonMostrarResultados = document.querySelector('.btn.btn-primary');
    if (botonMostrarResultados) {
        botonMostrarResultados.classList.replace('btn-primary', 'btn-outline-primary');
    }
	calculoRealizado = false;
}

function reiniciarAplicacion() {
  location.reload(); // Recarga la página actual
}