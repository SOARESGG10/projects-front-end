class ContagemRegressiva {
    constructor(dataDesejada) {
        this.dataDesejada = dataDesejada;
    }

    get _dataAtual() {
        return new Date();
    }

    get _dataDesejada() {
        return new Date(this.dataDesejada);
    }

    get _diferencaTempo() {
        return this._dataDesejada.getTime() - this._dataAtual.getTime();
    }

    get dias() {
        return Math.floor(this._diferencaTempo / (24 * 60 * 60 * 1000));
    }

    get horas() {
        return Math.floor(this._diferencaTempo / (60 * 60 * 1000));
    }

    get minutos() {
        return Math.floor(this._diferencaTempo / (60 * 1000));
    }

    get segundos() {
        return Math.floor(this._diferencaTempo / 1000);
    }

    get total() {
        const dias = this.dias < 10 ? '0' + this.dias : this.dias;
        const horas =
            this.horas % 24 < 10 ? '0' + (this.horas % 24) : this.horas % 24;
        const minutos =
            this.minutos % 60 < 10
                ? '0' + (this.minutos % 60)
                : this.minutos % 60;
        const segundos =
            this.segundos % 60 < 10
                ? '0' + (this.segundos % 60)
                : this.segundos % 60;

        return [dias, horas, minutos, segundos];
    }
}

const CopaDoMundo = new ContagemRegressiva(
    '21 November 2022 00:00:00 GMT-0300'
);
const tempos = document.querySelectorAll('.tempo');

Cronometro = () => {
    tempos.forEach((tempo, I) => {
        tempo.innerHTML = CopaDoMundo.total[I];
    });
};

Cronometro();
setInterval(Cronometro, 1000);
