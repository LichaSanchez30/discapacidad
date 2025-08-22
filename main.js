function caculador() {
  let btnCalculador = document.getElementById("btn-caculador");
  let fechaDesde = document.getElementById("fechaDesde");
  let fechaHasta = document.getElementById("fechaHasta");
  let sesionesSemanales = document.getElementById("cantsesiones");
  let textoSesiones = document.getElementById("totalDeSesiones");

  return btnCalculador.addEventListener("click", () => {
    let diferenciaFechas =
      (new Date(fechaDesde.value) - new Date(fechaHasta.value)) /
      (1000 * 60 * 60 * 24);
    let semanas = Math.abs(diferenciaFechas) / 7;
    let sesionesTotales = Math.ceil(semanas) * sesionesSemanales.value;

    if (!isNaN(sesionesTotales) && sesionesSemanales.value > 0) {
      textoSesiones.innerHTML = `Son ${sesionesTotales} sesiones anuales`;
    } else {
      textoSesiones.innerHTML = `Por favor ingrese el periodo y la cantidad de sesiones semanales`;
    }
  });
}

function calcularSesionesYTransporte() {
  let transporte = document.getElementById("traslado");
  let sesiones = document.getElementById("rehabilitacion");
  let contenedorSesiones = document.getElementById("sesiones");
  let contadorKm = document.getElementById("transporte");
  let totalKm = document.getElementById("totalGeneral")
  
  sesiones.addEventListener("change", () => {
    contenedorSesiones.style.display = "flex";
    contadorKm.style.display = "none";
    totalKm.style.display = "none"
    caculador();
  });

  transporte.addEventListener("change", () => {
    contadorKm.style.display = "block";
    totalKm.style.display = "block"
    contenedorSesiones.style.display = "none";
    caculador();
  });
}

calcularSesionesYTransporte();


let nomencladorPrest = nomenclador;

function agregarDestino() {
  const calcularKm = document.getElementById("transporte");

  // Crear contenedor de fila
  const div = document.createElement("div");
  div.classList.add("trasladoA");

  div.innerHTML = `
    <label>Prestación:</label>
    <select class="prestDisca"></select>
    <label>Km-ida:</label>
    <input type="number" class="km km-ida" value="0">
    <label>Km-vuelta:</label>
    <input type="number" class="km km-vuelta" value="0">
    <label>Cant. días:</label>
    <input type="number" class="cant-dia" value="1">
    <p class="total">Total km: 0</p>
    <button class="sumarDestino"> + </button>
    <button class="eliminarDestino"> - </button>
  `;

  // Llenar select
  const select = div.querySelector(".prestDisca");
  nomenclador.forEach(el => {
    const option = document.createElement("option");
    option.textContent = el;
    select.appendChild(option);
  });

  const kmIdaInput = div.querySelector(".km-ida");
  const kmVueltaInput = div.querySelector(".km-vuelta");
  const cantDiaInput = div.querySelector(".cant-dia");
  const totalP = div.querySelector(".total");

  // Función para recalcular total por fila
  function recalcularFila() {
    const total = (Number(kmIdaInput.value) + Number(kmVueltaInput.value)) * Number(cantDiaInput.value);
    totalP.textContent = "Total km: " + (isNaN(total) ? 0 : total);
    recalcularTotalGeneral();
  }

  [kmIdaInput, kmVueltaInput, cantDiaInput].forEach(input => {
    input.addEventListener("input", recalcularFila);
  });

  // Botón para agregar otro destino
  const btnAgregar = div.querySelector(".sumarDestino");
  btnAgregar.addEventListener("click", () => agregarDestino());

  // Botón para eliminar destino
  const btnEliminar = div.querySelector(".eliminarDestino");
  btnEliminar.addEventListener("click", () => {
    div.remove();
    recalcularTotalGeneral();
  });

  calcularKm.appendChild(div);

  recalcularFila(); // calcular al crear
}

// Función que suma todos los destinos
function recalcularTotalGeneral() {
  const totalGeneralP = document.getElementById("totalGeneral");
  let total = 0;

  document.querySelectorAll(".trasladoA").forEach(fila => {
    const kmIda = Number(fila.querySelector(".km-ida").value) || 0;
    const kmVuelta = Number(fila.querySelector(".km-vuelta").value) || 0;
    const cantDia = Number(fila.querySelector(".cant-dia").value) || 0;

    total += (kmIda + kmVuelta) * cantDia;
  });

  totalGeneralP.textContent = "Total de km semanales: " + total;
}

// Crear la primera fila al cargar
agregarDestino();





