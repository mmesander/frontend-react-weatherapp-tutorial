import React from "react";

function kelvinToFahrenheit(kelvin) {
    return `${Math.round(1.8 * (kelvin - 273) + 32)} ° C`
}

export default kelvinToFahrenheit;