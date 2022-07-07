// Classe Calculadora com os métodos de funcionamento.

class Calculadora {
    constructor(leitorAtualConteudo, leitorVisualizarConteudo) {
        this.leitorAtualConteudo = leitorAtualConteudo
        this.leitorVisualizarConteudo = leitorVisualizarConteudo
        this.limpar()
    }

    // Método que formata o número a partir da classe dos milhares. EX: 2,500,000
    formatarNumero(numero) {
        const numeroString = numero.toString()
        const inteiroNumero = parseFloat(numeroString.split('.')[0])
        const decimalNumero = numeroString.split('.')[1]

        let leitor = ''

        if (isNaN(inteiroNumero)) {
            leitor = ''
        } else {
            leitor = inteiroNumero.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }

        if (decimalNumero != null) {
            return `${inteiroNumero}.${decimalNumero}`
        } else {
            return leitor
        }
    }

    // Método AC que limpa o conteúdo do leitor e da memória da calculadora
    limpar() {
        this.leitorAtual = ''
        this.leitorVisualizar = ''
        this.operacao = undefined
    }

    // Método BackSpace que apaga um número por vez do leitor
    apagar() {
        this.leitorAtual = this.leitorAtual.toString().slice(0, -1)
    }

    // Método que atualiza o leitor após a utilização de qualquer método da calculadora
    atualizarLeitor() {
        this.leitorAtualConteudo.innerText = this.formatarNumero(
            this.leitorAtual
        )

        this.leitorVisualizarConteudo.innerText = `${this.formatarNumero(
            this.leitorVisualizar
        )}${this.operacao || ''}`
    }

    // Método que insere um número e junta com o anterior
    inserirNumero(numero) {
        // Verificar se o leitor está vazio para impedir a inserção do '.'
        if (numero === '.' && this.leitorAtual === '') return
        // Verificar se ja foi incluso um '.'
        if (this.leitorAtual.includes('.') && numero === '.') return

        this.leitorAtual += numero
    }

    inserirOperadores(operacao) {
        // Verificar se o leitor está vazio para impedir a inserção do de qualquer operador
        if (this.leitorAtual === '') return
        // Se houver contéudo, executa a função calcular
        if (this.leitorVisualizar !== '') {
            this.calcular()
        }

        this.operacao = operacao

        // Após a inserção do operador o valor do leitor vai para a memória da calculadora
        // esperando a inserção de outro valor
        this.leitorVisualizar = this.leitorAtual
        this.leitorAtual = ''
    }

    // Método que efetua as operações matemáticas básicas
    calcular() {
        let resultado = ''
        const _leitorAtual = parseFloat(this.leitorAtual)
        const _leitorVisualizar = parseFloat(this.leitorVisualizar)

        // Verifica se o valor no leitor ou na memória não são um número
        if (isNaN(_leitorAtual) || isNaN(_leitorVisualizar)) return

        // Operações matemáticas
        switch (this.operacao) {
            case '+':
                resultado = _leitorVisualizar + _leitorAtual
                break
            case '-':
                resultado = _leitorVisualizar - _leitorAtual
                break
            case 'x':
                resultado = _leitorVisualizar * _leitorAtual
                break
            case '÷':
                resultado = _leitorVisualizar / _leitorAtual
                break
            default:
                return
        }
        this.leitorAtual = resultado
        this.operacao = undefined
        this.leitorVisualizar = ''
    }
}

const Calcular = new Calculadora(leitorAtualConteudo, leitorVisualizarConteudo)

// Declarações dos botões da calculadora
const botoesNumericos = document.querySelectorAll('[data-botao-numerico]')
const botoesOperacionais = document.querySelectorAll('[data-botao-operacao]')
const botaoAC = document.querySelector('[data-botao-limpar]')
const botaoBackSpace = document.querySelector('[data-botao-apagar]')
const botaoIgualdade = document.querySelector('[data-botao-igualdade]')
const leitorAtualConteudo = document.getElementById('leitor-atual')
const leitorVisualizarConteudo = document.getElementById('leitor-visualizar')

// Estruturas FOR que verifica cada botão dentro do array
for (const botaoNumerico of botoesNumericos) {
    botaoNumerico.addEventListener('click', () => {
        Calcular.inserirNumero(botaoNumerico.innerText)
        Calcular.atualizarLeitor()
    })
}

for (const botaoOperacao of botoesOperacionais) {
    botaoOperacao.addEventListener('click', () => {
        Calcular.inserirOperadores(botaoOperacao.value)
        Calcular.atualizarLeitor()
    })
}

botaoAC.addEventListener('click', () => {
    Calcular.limpar()
    Calcular.atualizarLeitor()
})

botaoIgualdade.addEventListener('click', () => {
    Calcular.calcular()
    Calcular.atualizarLeitor()
})

botaoBackSpace.addEventListener('click', () => {
    Calcular.apagar()
    Calcular.atualizarLeitor()
})
