
export const todoReducer = ( initialState, action ) => {

    switch ( action.type ) {
        case 'ADD TODO':
            return [ ...initialState, action.payload ];
        
        case 'REMOVE TODO' :
            return initialState.filter( todo => todo.id !== action.payload);
            // filter, regresa un array nuevo    
        
        case 'TOGGLE TODO' :
            return initialState.map( todo => { // con map regreso yn array nuevo
                if(todo.id === action.payload) { // paylod tiene el id
                    return {
                        ...todo,
                        done: !todo.done
                    }
                }
                
                return todo;
            })

        default:
            return initialState;
    }

}