    const contratoInput = document.getElementById('contrato');
    const btn = document.getElementById('buscar');
    const container = document.getElementById('socios');
    const contErr = document.getElementById('error');
    
btn.addEventListener('click', () => {
    const prestacionSocio = baseSocios.filter(element => element.contrato == contratoInput.value);

    if (contratoInput.value === "") {
        container.style.display = "none";
        contErr.style.display = "block";
        contErr.innerHTML = `<div>Por favor ingrese un número de socio.</div>`;
    } else if (prestacionSocio.length === 0) {
        container.style.display = "none";
        contErr.style.display = "block";
        contErr.innerHTML = `<div>Socio ${contratoInput.value} sin prestaciones legalizadas.</div>`;
    } else {
        contErr.style.display = "none";
        container.style.display = "table-row-group";
        container.innerHTML = "";
        prestacionSocio.forEach(socio => {
            container.innerHTML += `
            <tr>
              <td>${socio.contrato}</td> 
              <td>${socio.codigo}</td> 
              <td>${socio.prestacion}</td>
            </tr>`;
        });
    }
});

    // if (prestacionSocio.length === 0) {
    //         container.style.display = "none"
    //         contErr.style.display ="block"
    //         contErr.innerHTML = `<div>Socio ${contratoInput.value} sin prestaciones legalizadas.</div>`;
            
    //       }else{
    //         contErr.style.display ="none"
    //         container.style.display = "table-row-group"
    //         container.innerHTML = prestacionSocio.map(socio => `
    //         <tr>
    //           <td>${socio.contrato}</td> 
    //           <td>${socio.codigo}</td> 
    //           <td> ${socio.prestacion}</td>
    //         </tr>`)
    //       }