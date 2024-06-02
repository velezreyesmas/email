import { createContext, useState } from "react";

interface MessageProps {
    sender_id: string,
    sender_name: string,
    sender_email: string;
    sender_photo: string
    subject: string;
    body: string;
    timestamp: string;
}

export const selectedEmailContext = createContext({actualEmail: {"sender_id": "no-selected", "sender_name": "no-selected",  "sender_email": "no-selected", "sender_photo": "no-selected", "subject": "no-selected", "body": "no-selected", "timestamp": "no-selected"}, setActualEmail: (actualView:MessageProps) => {}});

export function SelectedEmailProvider(props:any) {
    const [actualEmail, setActualEmail] = useState({"sender_id": "no-selected", "sender_name": "no-selected",  "sender_email": "no-selected", "sender_photo": "no-selected", "subject": "no-selected", "body": "no-selected", "timestamp": "no-selected"});
    return (
        <selectedEmailContext.Provider value={{ actualEmail: actualEmail, setActualEmail: setActualEmail }}>
            {props.children}
        </selectedEmailContext.Provider>
    );
}