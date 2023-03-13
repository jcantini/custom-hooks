// Este es un custom Hook para hacer un fecth sobre una url que le paso desde el componente que lo llama.
// Por otro lado devuelvo info sobre el estado del fetch.
// Para el ejemplo use la API de Lord of the Rings

import { useEffect, useState } from "react";


export const useFetch = ( url ) => {

    // Defino un useState para saber en que estado se encuentra mi custom hook para saber cuando estoy cargando, 
    // cuando hay un cambio, cuando se resuelve incluso decirme al componente de React cuando se debe redibujar
    const [ state, setState ] = useState({
        data: null, // va a ser lo que obtengo de la petición
        isLoading: true,
        hasError: null,
    });

    const getFetch = async () => {

        setState({ ...state, isLoading: true}) // Si vuelvo a llamar al getFetch, debo poner isLoading en true

            
        try {
            const resp = await fetch( url )
            const data = await resp.json(); 
            setState( { data, isLoading: false, hasError: null }); // Seteo el estado con el resultado
        } catch (error) {
            setState( { data:null, isLoading: false, hasError: error }); // Seteo el estado con el error
        } 

       
    } 

    useEffect(() => { // El useEffect espera una función pura, por eso no puedo poner el async acá xq devuelve una promesa
            getFetch()
    }, [url]);        // cada vez que cambie el url, se dispara ese useEffect

    return {
        data:      state.data, 
        isLoading: state.isLoading,
        hasError:  state.hasError,
    };
}




