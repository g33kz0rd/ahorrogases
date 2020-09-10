let currentValue = 30000;

document.getElementById('calculoInput').onkeyup = check;
document.getElementById('calculoInput').onkeydown = check;


document.getElementById('calculoInput').value = currentValue;
calculate(currentValue);


function check(e) {
    if (e.target.value === '')
        return;

    let newValue = parseInt(e.target.value);

    if (!isNaN(newValue)) {
        currentValue = newValue;
    }

    document.getElementById('calculoInput').value = currentValue;

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

    document.getElementById('co2Text').innerHTML = ahorroEmisionesKgCO2.toFixed(2);
    document.getElementById('arbolesText').innerHTML = cO2Secuestrado.toFixed(0);
}