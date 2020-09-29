let currentValue = 30000;

document.getElementById('calculoInput').onkeyup = check;
document.getElementById('calculoInput').onkeydown = check;


document.getElementById('calculoInput').value = currentValue;
calculate(currentValue);


function check(e) {
    if (e.target.value === '')
        return;

    let newValue = parseInt(e.target.value.toString().split('.').join(''));

    if (!isNaN(newValue)) {
        currentValue = newValue;
    }

    document.getElementById('calculoInput').value = addCommas(currentValue);

    calculate(currentValue);
}

function calculate(consumoMensual) {

    let poderCalorificoInferiorGasoil = 43;
    let poderCalorificoInferiorBiodiesel = 37;
    let densidadGasoil = 0.845;
    let densidadBiodiesel = 0.885;
    let resolucionVolumetricaDeConsumoBioGasB10 = 4;
    let emicionesEspecificasGasoil = 83.8;
    let emicionesEspecificasBiodiesel = 36.46;
    let absorcionPromedioPorArbol = 34;
    let vidaMediaArbolMediano = 50;

    let emisionesGasoil = consumoMensual * densidadGasoil * poderCalorificoInferiorGasoil * emicionesEspecificasGasoil / 1000 * 12;
    let emisionesB100 = consumoMensual * (1 + resolucionVolumetricaDeConsumoBioGasB10 / 100) * densidadBiodiesel * poderCalorificoInferiorBiodiesel * emicionesEspecificasBiodiesel / 1000 * 12;

    let ahorroEmisionesKgCO2 = emisionesGasoil - emisionesB100;
    let ahorroEmisionesTnCO2 = ahorroEmisionesKgCO2 / 1000;
    let ahorroEmisionesVSGasoil = emisionesGasoil / ahorroEmisionesKgCO2 * 100;
    let cO2Secuestrado = ahorroEmisionesKgCO2 / absorcionPromedioPorArbol;

    document.getElementById('co2Text').innerHTML = addCommas((ahorroEmisionesKgCO2/1000).toFixed(0));
    document.getElementById('arbolesText').innerHTML = addCommas(cO2Secuestrado.toFixed(0));

    resizeText();
}


//ESTILO

function resizeText() {
    let media = window.matchMedia("(min-width: 1330px)")
    let resultado = document.getElementsByClassName('calCalculo')
    if (media.matches) {
        for (let i = 0; i < resultado.length; i++) {
            if (resultado[i].innerHTML.length > 7) {
                for (let i = 0; i < resultado.length; i++)
                    resultado[i].style.fontSize = '80px'
                resultado[i].style.lineHeight = '80px'
            }
            if (resultado[i].innerHTML.length > 8) {
                for (let i = 0; i < resultado.length; i++)
                    resultado[i].style.fontSize = '60px'
                resultado[i].style.lineHeight = '60px'
            }
        }
    }
}

function addCommas(n) {
     n = n.toString()
     while (true) {
       var n2 = n.replace(/(\d)(\d{3})($|,|\.)/g, '$1.$2$3')
       if (n == n2) break
       n = n2
     }
     return n
}



