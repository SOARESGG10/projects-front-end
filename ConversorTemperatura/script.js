
// Função para converter de Fahrenheit para Celsius

function converterParaCelsius(temperatura, escalaTemperatura) {
    let Fahrenheit = parseFloat(temperatura.value)
    const informacao = escalaTemperatura

    if (isNaN(Fahrenheit)) {         // Caso o valor não seja um número, irá cair nessa condição.
        informacao.innerHTML = ('')
    } else {

        let Celsius = ((Fahrenheit - 32) * 1.8).toFixed(1) // toFixed(1) para limitar á uma casa decimal.

        informacao.innerHTML = (Celsius + ' °C')

        if (informacao == infoCelsiusSituacao) {
            infoTemperatura.innerHTML = (EstadoTemperatura(Celsius))
        }
    }
}

// Funcão para converter de Celsius para Fanrenheit

function converterParaFahrenheit() {
    let Celsius = parseFloat(grausCelsius.value)

    if (isNaN(Celsius)) {
        infoFahrenheit.innerHTML = ('')
    } else {

        const Fahrenheit = (Celsius * 1.8 + 32).toFixed(1)
        infoFahrenheit.innerHTML = (Fahrenheit + ' °F')
    }
}

// Função que recebe o valor da temperatura, compara e informa a situação

function EstadoTemperatura(temperatura) {
    const Situacoes = [{
        condicao: temperatura < 35,
        situacao: 'Hiportemia'
    },
    {
        condicao: temperatura < 37.5,
        situacao: 'Normal'
    },
    {
        condicao: temperatura < 39.5,
        situacao: 'Febre'                   // Array de objetos
    },
    {
        condicao: temperatura <= 41,
        situacao: 'Febre alta'
    },
    {
        condicao: temperatura > 41,
        situacao: 'Hipertemia'
    }]

    for (caso of Situacoes) {
        if (caso.condicao) {
            return caso.situacao
        }
    }
}

// Inputs

const grausCelsius = document.getElementById('celsius')
const grausFahrenheit = document.getElementById('fahrenheit')
const grausFahrenheitSituacao = document.getElementById('fahrenheit-situacao')

// Botões para executar as funções

const botaoGrausCelsius = document.getElementById('botao-celsius')
const botaoGrausFahrenheit = document.getElementById('botao-fahrenheit')
const botaoSituacao = document.getElementById('botao-fahrenheit-situacao')

// Locais aonde serão atribuidos os resultados

const infoFahrenheit = document.getElementById('graus-fahrenheit')
const infoCelsius = document.getElementById('graus-celsius')
const infoCelsiusSituacao = document.getElementById('graus-celsius-situacao')
const infoTemperatura = document.getElementById('situacao-temperatura')

// Botões para executar as funçoes

botaoGrausCelsius.addEventListener('click', () => {
    converterParaCelsius(grausFahrenheit, infoCelsius);
})

botaoGrausFahrenheit.addEventListener('click', () => {
    converterParaFahrenheit();
})

botaoSituacao.addEventListener('click', () => {
    converterParaCelsius(grausFahrenheitSituacao, infoCelsiusSituacao);
})