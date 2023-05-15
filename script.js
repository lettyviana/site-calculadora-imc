// Seleção de elementos
const valorNome = document.querySelector ("#nome");
const valorAltura = document.querySelector("#altura");
const valorPeso = document.querySelector("#peso");

const resultado = document.querySelector("#mensagem");

const containerCalculo = document.querySelector("#primeiro-passo");
const containerResultado = document.querySelector("#segundo-passo");

const botaoCalcular = document.querySelector("#botao-calcula");
const botaoLimpar = document.querySelector("#botao-limpa");
const botaoVoltar = document.querySelector("#botao-volta");

// Funções
function limpaValores() {
    valorNome.value = "";
    valorAltura.value = "";
    valorPeso.value = "";    
}

function validaValores(texto) {
    return texto.replace(/[^0-9,]/g, "");
}

function calculaImc(peso, altura) {
    const imc = (peso / (altura * altura)).toFixed(1);

    return imc;
}

function mostraOuExibeResultados() {
    containerCalculo.classList.toggle("depois");
    containerResultado.classList.toggle("depois");
}

// Eventos
[valorAltura, valorPeso].forEach((input) => {
    input.addEventListener("input", (e) => {
        const valorAtualizado = validaValores(e.target.value);

        e.target.value = valorAtualizado;
    });
});

botaoCalcular.addEventListener("click", (e) => {
    e.preventDefault();
    
    const nome = valorNome.value;
    const peso = +valorPeso.value.replace(",", ".");
    const altura = +valorAltura.value.replace(",", ".");
    let peso_status = false, altura_status = false, nome_status = false;
    
    if(nome === ""){
        document.getElementById('erro-nome').innerHTML = "Por favor, preencha os dados.";
    }else{
        document.getElementById('erro-nome').innerHTML = "";
        nome_status = true;
    }

    if(peso === "" || isNaN(peso) || (peso <= 0)){
        document.getElementById('erro-peso').innerHTML = "Por favor, preencha os dados.";
    }else{
        document.getElementById('erro-peso').innerHTML = "";
        altura_status = true;
    }

    if(altura === "" || isNaN(altura) || (altura <= 0)){
        document.getElementById('erro-altura').innerHTML = "Por favor, preencha os dados.";
    }else {
        document.getElementById('erro-altura').innerHTML = "";
        peso_status = true;
    }
    
    if(peso && altura) {
        const imc = calculaImc(peso, altura);
        
        if(imc < 18.5) {
            document.getElementById('mensagem').innerHTML = nome + ", seu IMC é " + imc + " e está abaixo do recomendado.";
        }else if(imc >= 18.6 && imc <= 25){
            document.getElementById('mensagem').innerHTML = "Parabéns, " + nome + ", seu IMC é " + imc + " e está dentro do recomendado.";
        }else{
            document.getElementById('mensagem').innerHTML = nome + ", seu IMC é " + imc + " e está acima do recomendado.";
        }
    }else{
        return;
    }
    
    mostraOuExibeResultados();
});

botaoLimpar.addEventListener("click", (e) => {
    e.preventDefault();

    limpaValores();
});

botaoVoltar.addEventListener("click", () => {
    limpaValores();
    mostraOuExibeResultados();
    document.getElementById('erro-nome').innerHTML = "";
    document.getElementById('erro-altura').innerHTML = "";
    document.getElementById('erro-peso').innerHTML = "";
    return
});