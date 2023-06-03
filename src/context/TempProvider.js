import React, {createContext, useState} from "react";

export const TempContext = createContext(null);

function TempContextProvider({children}) {
    const [selectedMetric, setSelectedMetric] = useState('celcius');

    function toggleTemp() {
        if (selectedMetric === 'celcius') {
            setSelectedMetric('fahrenheit');
        } else {
            setSelectedMetric('celcius');
        }
    }

    return (
        <TempContext.Provider value={}>
            {children}
        </TempContext.Provider>
    )
}

export default TempContextProvider;