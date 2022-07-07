const botoesNumericos = document.querySelectorAll('[data-botao-numerico]')
const botoesOperacionais = document.querySelectorAll('[data-botao-operacao]')
const botaoAC = document.querySelector('[data-botao-limpar]')
const botaoBackSpace = document.querySelector('[data-botao-apagar]')
const botaoIgualdade = document.querySelector('[data-botao-igualdade]')
const leitorAtualConteudo = document.getElementById('leitor-atual')
const leitorVisualizarConteudo = document.getElementById('leitor-visualizar')

class Calculadora {
    constructor(leitorAtualConteudo, leitorVisualizarConteudo) {
        this.leitorAtualConteudo = leitorAtualConteudo
        this.leitorVisualizarConteudo = leitorVisualizarConteudo
        this.limpar()
    }

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

    limpar() {
        this.leitorAtual = ''
        this.leitorVisualizar = ''
        this.operacao = undefined
    }

    apagar() {
        this.leitorAtual = this.leitorAtual.toString().slice(0, -1)
    }

    atualizarLeitor() {
        this.leitorAtualConteudo.innerText = this.formatarNumero(
            this.leitorAtual
        )

        this.leitorVisualizarConteudo.innerText = `${this.formatarNumero(
            this.leitorVisualizar
        )}${this.operacao || ''}`
    }

    inserirNumero(numero) {
        if (numero === '.' && this.leitorAtual === '') return

        if (this.leitorAtual.includes('.') && numero === '.') return

        this.leitorAtual += numero
    }

    inserirOperadores(operacao) {
        if (this.leitorAtual === '') return

        if (this.leitorVisualizar !== '') {
            this.calcular()
        }

        this.operacao = operacao

        this.leitorVisualizar = this.leitorAtual
        this.leitorAtual = ''
    }

    calcular() {
        let resultado = ''
        const _leitorAtual = parseFloat(this.leitorAtual)
        const _leitorVisualizar = parseFloat(this.leitorVisualizar)

        if (isNaN(_leitorAtual) || isNaN(_leitorVisualizar)) return

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
