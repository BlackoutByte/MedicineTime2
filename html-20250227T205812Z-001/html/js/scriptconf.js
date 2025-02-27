

function atualizarRelogio() {
    let hora = document.getElementById("hora").value.padStart(2, "0");
    let minuto = document.getElementById("minuto").value.padStart(2, "0");

    document.getElementById("hora-dezena").innerText = hora[0];
    document.getElementById("hora-unidade").innerText = hora[1];
    document.getElementById("minuto-dezena").innerText = minuto[0];
    document.getElementById("minuto-unidade").innerText = minuto[1];
}