document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("cadastroForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch("api/cadastro.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            alert("Cadastro realizado com sucesso!");
            window.location.href = "indexs.html";
        } else {
            alert("Erro: " + result.message);
        }
    });
});
