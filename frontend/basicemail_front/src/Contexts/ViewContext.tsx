import { createContext, useState } from "react";

export const ActualViewContext = createContext({actualView: "Inbox", setActualView: (actualView:string) => {}});

export function ActualViewProvider(props:any) {
  const [actualView, setActualView] = useState("Inbox");
  const value = ActualViewContext;
  return (
    <ActualViewContext.Provider value={{ actualView, setActualView }}>
      {props.children}
    </ActualViewContext.Provider>
  );
}