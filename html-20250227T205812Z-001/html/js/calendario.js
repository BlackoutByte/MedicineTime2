let dataAtual = new Date();
let mesAtual = dataAtual.getMonth();
let anoAtual = dataAtual.getFullYear();
let reservas = [];
let dataInicio = null;
let dataFim = null;

function carregarCalendario() {
    const diasContainer = document.getElementById("dias");
    const mesAno = document.getElementById("mes-ano");
    diasContainer.innerHTML = "";

    const nomeMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    mesAno.textContent = `${nomeMeses[mesAtual]} ${anoAtual}`;

    const primeiroDia = new Date(anoAtual, mesAtual, 1).getDay();
    const ultimoDia = new Date(anoAtual, mesAtual + 1, 0).getDate();

    for (let i = 0; i < primeiroDia; i++) {
        let divVazia = document.createElement("div");
        diasContainer.appendChild(divVazia);
    }

    for (let dia = 1; dia <= ultimoDia; dia++) {
        let diaElemento = document.createElement("div");
        diaElemento.textContent = dia;
        diaElemento.classList.add("dia");

        let dataFormatada = `${dia}/${mesAtual + 1}/${anoAtual}`;

        if (reservas.some(r => dataFormatada >= r.inicio && dataFormatada <= r.fim)) {
            diaElemento.classList.add("reservado");
        }

        if (dataInicio === dataFormatada) {
            diaElemento.classList.add("inicio-selecionado");
        }

        if (dataFim === dataFormatada) {
            diaElemento.classList.add("fim-selecionado");
        }

        if (dataInicio && dataFim && dataFormatada >= dataInicio && dataFormatada <= dataFim) {
            diaElemento.classList.add("intervalo-selecionado");
        }

        diaElemento.onclick = () => selecionarData(dataFormatada);
        diasContainer.appendChild(diaElemento);
    }
}

function mudarMes(direcao) {
    mesAtual += direcao;
    if (mesAtual < 0) {
        mesAtual = 11;
        anoAtual--;
    } else if (mesAtual > 11) {
        mesAtual = 0;
        anoAtual++;
    }
    carregarCalendario();
}

function selecionarData(data) {
    if (!dataInicio) {
        dataInicio = data;
        dataFim = null;
        document.getElementById("dataInicio").textContent = data;
        document.getElementById("dataFim").textContent = "-";
    } else if (!dataFim && data > dataInicio) {
        dataFim = data;
        document.getElementById("dataFim").textContent = data;

        // Exibir modal apenas após escolher as duas datas
        document.getElementById("modal-calendario").style.display = "block";
    } else {
        dataInicio = data;
        dataFim = null;
        document.getElementById("dataInicio").textContent = data;
        document.getElementById("dataFim").textContent = "-";
    }

    carregarCalendario();
}

function salvarReserva() {
    if (dataInicio && dataFim) {
        reservas.push({ inicio: dataInicio, fim: dataFim });
    }

    document.getElementById("modal-calendario").style.display = "none";
    dataInicio = null;
    dataFim = null;
    document.getElementById("dataInicio").textContent = "-";
    document.getElementById("dataFim").textContent = "-";
    carregarCalendario();
}

function toggleCalendario() {
    let calendario = document.getElementById("calendario-container");
    let overlay = document.getElementById("overlay");

    if (calendario.style.display === "none" || calendario.style.display === "") {
        calendario.style.display = "block";
        overlay.style.display = "block";
    } else {
        calendario.style.display = "none";
        overlay.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", carregarCalendario);
