import Nav from "./Nav";
import SearchComponent from './../components/Search';
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const AppLayout = ()=>{
    return(<>
        <Nav/>
        <SearchComponent/>
        <Outlet/>
        <Footer/>
    </>)
}

export default AppLayout;