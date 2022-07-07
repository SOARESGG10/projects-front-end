// Classe Contagem Regressiva com métodos para o funcionamento do projeto.

class ContagemRegressiva {
    constructor(dataDesejada) {
        this.dataDesejada = dataDesejada;
    }

    // Método que informa a data atual.
    get _dataAtual() {
        return new Date();
    }

    // Método que informa a data que foi instância no constructor da classe.

    get _dataDesejada() {
        return new Date(this.dataDesejada);
    }
    // Método que informa a diferença de tempo entre as duas datas.
    get _diferencaTempo() {
        return this._dataDesejada.getTime() - this._dataAtual.getTime();
    }
    // Método que separa as dias do valor obtido no método _diferencaTempo
    get dias() {
        return Math.floor(this._diferencaTempo / (24 * 60 * 60 * 1000));
    }
    // Método que separa as horas do valor obtido no método _diferencaTempo
    get horas() {
        return Math.floor(this._diferencaTempo / (60 * 60 * 1000));
    }
    // Método que separa os minutos do valor obtido no método _diferencaTemp
    get minutos() {
        return Math.floor(this._diferencaTempo / (60 * 1000));
    }
    // Método que separa os segundos do valor obtido no método _diferencaTempo
    get segundos() {
        return Math.floor(this._diferencaTempo / 1000);
    }

    // Método que atribui os valores dos métodos anteriores à variáveis próprias.
    get total() {
        const dias = this.dias < 10 ? '0' + this.dias : this.dias;
        const horas =
            this.horas % 24 < 10 ? '0' + (this.horas % 24) : this.horas % 24;
        const minutos =
            this.minutos % 60 < 10
                ? '0' + (this.minutos % 60) // "< 10 ? : '0'" Quando o valor do tempo for menor que 10, atribui-se + '0'
                : this.minutos % 60;
        const segundos =
            this.segundos % 60 < 10
                ? '0' + (this.segundos % 60)
                : this.segundos % 60;

        return [dias, horas, minutos, segundos]; // Retorna uma array
    }
}

const CopaDoMundo = new ContagemRegressiva(
    '21 November 2022 00:00:00 GMT-0300' // Data desejada
);
const tempos = document.querySelectorAll('.tempo');

// Função que atribuir os valores do array em cadda classe ".tempo"
Cronometro = () => {
    tempos.forEach((tempo, I) => {
        tempo.innerHTML = CopaDoMundo.total[I];
    });
};

Cronometro();
setInterval(Cronometro, 1000); // setInterval para executar a função Cronometo a cada 1 segundo.
