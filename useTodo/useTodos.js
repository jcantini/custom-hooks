// Este custom Hook lo definí para manejar toda la lógica que tenía en el componente TodoApp.
// Entonces me creé un custom Hook useTodo para que tenga toda la lógica de ese componente.


import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

// Voy a mantener la info en el Local Storage
// const initialState = [];

export const useTodos = ( initialState = [] ) => {

    const initTodo = () => {
        return JSON.parse( localStorage.getItem( 'todos' )) || []; 
        // parse es el opuesto de stringify lo convierte el string a un objeto. Ahora como la 1era vez 
        // en nulo porque aún no hay guardado nada en el localStorage, devuelvo []
    }

    const [ todos, dispatch] = useReducer( todoReducer, initialState, initTodo ); 
    // paso a useReducer la referencia a la función todoReducer, por eso no le pongo(). useReducer la llamará 
    // cuando la necesite usar. El dispatch es para disparar una action al reducer.

    // Necesito disparar un efecto secundario para guardar el NewTodo en el Local Storage. En el Local Storage
    // no se pueden grabar objetos solo se pueden grabar strings por lo debo serializar los objetos.
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify( todos ))
    
    }, [todos]); // Se ejecuta cada vez que los todos cambian
    // Ahora, si recargo el navegador web pierdo todo xq useEffect se dispara cuando cambian los todos y
    // también una 1era vez cuando el componente se monta dónde en este caso todo es[] y esto reemplaza 
    // a lo que tengo guardado. Para evitar esto debo inicializar el state con los valores que tengo en el
    // localStorage. El useReducer tiene un 3er argumento que se usa para inicializar el state. Es una función.


    const handleNewTodo = ( todo ) => {  
        const action = {
            type: 'ADD TODO',
            payload: todo
        }

        dispatch( action ); //Disparo la accion
    }

    const handleDeleteTodo = ( id ) => {
        dispatch({
            type: 'REMOVE TODO',
            payload: id
        }) 
    }

    const handleToggleTodo = ( id ) => {
        dispatch({
            type: 'TOGGLE TODO',
            payload: id
        }) 
    }


    return {
        todos, 
        ...todos,
        todosCount: todos.length, 
        pendingTodosCount: todos.filter( todo => !todo.done).length,
        handleNewTodo, 
        handleDeleteTodo, 
        handleToggleTodo
    }
}