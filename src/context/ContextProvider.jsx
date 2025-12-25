import { createContext, useState, useContext} from "react";

const StateContext = createContext();


export const ContextProvider = ({children}) => {

    let [activeMenu, setActiveMenu] = useState(false);
    let [isPageTransition, setIsPageTransition] = useState(false)

    return ( 
        <StateContext.Provider value={
            {
                activeMenu, setActiveMenu ,
                isPageTransition, setIsPageTransition
            }
        }>
            {children}

        </StateContext.Provider>
     );
}
 

export const useStateContext = () =>  useContext(StateContext)