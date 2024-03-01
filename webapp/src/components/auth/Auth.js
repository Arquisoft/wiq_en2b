import React, { createContext, useState } from "react";

export const authContext = createContext({
    jwt: null,
    setJwt: (newJwt) => {}
});

export function AuthProvider({children}) {

    const [jwt, setJwt] = useState(null);
    
    return <authContext.Provider value={{jwt, setJwt}}>
        {children}
    </authContext.Provider>
}

