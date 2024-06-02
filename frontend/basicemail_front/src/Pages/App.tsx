import SideBar from "../Components/SideBar";
import InboxView from "../Components/InboxView";
import ComposeView from "../Components/ComposeView";
import { useContext, useEffect } from "react";
import { ActualViewContext } from "../Contexts/ViewContext";
import { userContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function App() {
  const { actualView } = useContext(ActualViewContext);
  const { actualUser } = useContext(userContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (actualUser.email === "no-selected@swiftmail.com") {
      navigate("/login");
    }
  }, []);

  return (

      <div className="
        h-screen
        flex
        [background-size:100%_100%] bg-[radial-gradient(142%_91%_at_-6%_74%,_#2D2D2DFF_2%,_#FF000000_99%),radial-gradient(142%_91%_at_111%_84%,_#A459E1_0%,_#182468_100%)]
        p-[42px] gap-3">
            <SideBar />
            {actualView === "Inbox" ? (
              <InboxView/>
            ) : (
              <ComposeView/>
            )}
      </div>
  );
}
