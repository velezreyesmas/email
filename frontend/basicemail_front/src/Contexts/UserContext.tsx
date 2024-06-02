import { createContext, useState } from "react";

interface UserProps {
    email: string;
    name: string;
    picture: string;
  }

export const userContext = createContext({actualUser: {"email": "no-selected@swiftmail.com", "name": "no-name", "picture": 'no-picure'}, setActualUser: (actualUser:UserProps) => {}});

export function ActualUserProvider(props:any) {
    const [actualUser, setActualUser] = useState({"email": "no-selected@swiftmail.com", "name": "no-name", "picture": 'no-picure'});
    return (
        <userContext.Provider value={{ actualUser: actualUser, setActualUser: setActualUser }}>
            {props.children}
        </userContext.Provider>
    );
}