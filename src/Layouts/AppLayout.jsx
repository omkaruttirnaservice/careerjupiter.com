import Nav from "./Nav";
import SearchComponent from './../components/Search';
import { Outlet } from "react-router-dom";

const AppLayout = ()=>{
    return(<>
        <Nav/>
        <SearchComponent/>
        <Outlet/>
    </>)
}

export default AppLayout;