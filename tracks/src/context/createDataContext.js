import React, { useReducer } from "react";

//reducer === function, actions === object, defaultValue === state
export default (reducer, actions, defaultValue) => {
    const Context = React.createContext();

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, defaultValue);

        //automatycznie gdy zmieni się stan
        const boundActions = {};
        for(let key in actions) {
            boundActions[key] = actions[key](dispatch);
        }

        return (
            <Context.Provider value= {{ state, ...boundActions }}>
                {children}
            </Context.Provider>
        )
    };

    return { Context, Provider};
};
//provider zasadniczo udostepnia wszystkie dane do aplikacji
//Context to obiekt ktory daje dostęp do informacji