function caculador() {
    let btnCalculador = document.getElementById("btn-caculador");
    let fechaDesde = document.getElementById("fechaDesde");
    let fechaHasta = document.getElementById("fechaHasta");
    let sesionesSemanales = document.getElementById('sesiones');
    let textoSesiones = document.getElementById('totalDeSesiones');
    
    return(  btnCalculador.addEventListener("click", () => {
        let diferenciaFechas =
            (new Date(fechaDesde.value) - new Date(fechaHasta.value)) /
            (1000 * 60 * 60 * 24);
        let semanas = Math.abs(diferenciaFechas) / 7;
        let sesionesTotales = Math.ceil(semanas) * sesionesSemanales.value
        textoSesiones.innerHTML = `Son ${sesionesTotales} sesiones anuales`
    })
    );
}

caculador()

