
// Script função relogio
let atualizarAutomaticamente = true;

function atualizarHoraAtual() {
    if (!atualizarAutomaticamente) return;

    const agora = new Date();
    atualizarDisplay(agora.getHours(), agora.getMinutes());
}

function abrirModal() {
    document.getElementById("modal").style.display = "flex";
}

function definirHora() {
    const hora = document.getElementById("hora").value;
    const minuto = document.getElementById("minuto").value;

    atualizarAutomaticamente = false;
    atualizarDisplay(hora, minuto);
    fecharModal();
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

function atualizarDisplay(hora, minuto) {
    const horaStr = String(hora).padStart(2, "0");
    const minutoStr = String(minuto).padStart(2, "0");

    document.getElementById("hora-dezena").textContent = horaStr[0];
    document.getElementById("hora-unidade").textContent = horaStr[1];
    document.getElementById("minuto-dezena").textContent = minutoStr[0];
    document.getElementById("minuto-unidade").textContent = minutoStr[1];
}

setInterval(atualizarHoraAtual, 1000);
atualizarHoraAtual();