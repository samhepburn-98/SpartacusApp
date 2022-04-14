import React, { createContext, ReactChild } from "react";

export const ColorsContext = createContext(["#ff0000", "#00ffff"]);

interface ColorsProviderProps {
    children: ReactChild;
    value: string[];
}

export const ColorsProvider = ({ children, value }: ColorsProviderProps) => {
    return (
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        <ColorsContext.Provider value={value}>{children}</ColorsContext.Provider>
    );
};
