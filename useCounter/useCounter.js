// Un hook es una función y siempre debe tener un return
// En este ejemplo creo un hook que hace de contador, se lo llama con un valor inicial y 
// devuelve el valor del contador y las funciones que permiten aumentar, deiminuir o resetear su valor.

import { useState } from "react";

export const useCounter = ( initialValue=10) => {
    const [counter, setCounter] = useState( initialValue );

    const increment = ( value = 1) => {
        setCounter( counter + value );
    };

    const decrement = ( value = 1) => {
        setCounter( counter - value );
    };

    const reset = () => {
        setCounter( initialValue );
    };

    return {
        counter,
        increment, 
        decrement,
        reset
    }

}

// Para poder exponer el setCounter para que desde afuera se pueda manipular counter, necesito 
// exponer alguna funcion hacias afuera. Creo la funcion increment y la paso hacia afuera en el return