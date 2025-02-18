import { useContext } from "react";
import { dashbordStoreProvider } from "../store/DashbordData";
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ()=>{

    const data = useContext(dashbordStoreProvider);

    return(<>
    <div className="h-14 flex text-blue-500 bg-gray-500 items-center">
        <div className="ml-2">
            <button onClick={data.handleDashbordToggle}><MenuIcon/></button>
        </div>
    </div>
    
    </>)
}

export default Navbar