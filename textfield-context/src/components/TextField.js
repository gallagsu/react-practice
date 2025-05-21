'use client';
import { useContext, createContext, useId } from 'react';

//Create a Context object to hold the element ID
const TextfieldContext = createContext();

export default function TextField({children}) {

    const id = useId();

    return (
        <div>
           <TextfieldContext.Provider value={id}>
                {children}
            </TextfieldContext.Provider>
        </div>
    );
}

export function Label({children, ...props}) {
    const id = useContext(TextfieldContext);
    return (
        <label htmlFor={id} {...props}>{children}</label>
    );
}

export function Input({...props}) {
    const id = useContext(TextfieldContext);
    return (
        <input id={id} type="text" {...props}></input>
    );
}