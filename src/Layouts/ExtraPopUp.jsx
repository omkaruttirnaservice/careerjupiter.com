
import DrawingPopup from "../Pages/DrawingPopup.jsx";
import SignupPopup from "../Pages/SignIn/SignupPopup.jsx";
import IQTestPopup from "../components/TestComp/IQTestPopup.jsx";
import {Outlet} from "react-router-dom"
function ExtraPopUp(){
    return <>
     <SignupPopup />
     <IQTestPopup/> 
     <DrawingPopup/>
    <Outlet />
    </>
}

export default ExtraPopUp;