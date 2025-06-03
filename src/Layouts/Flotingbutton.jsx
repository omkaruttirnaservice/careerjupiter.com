import { FaWhatsapp, FaYoutube } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setIsOpen } from "../store-redux/iqTestSlice";

const Flotingbutton = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!authState.isLoggedIn) {
      dispatch(setIsOpen(true));
    } else {
      navigate("/profile/test");
    }
  };

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:flex mt-60 flex-col fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
        <div className="flex items-center justify-center w-[70px] h-[40px] bg-white rounded-full rounded-bl-[50%] shadow-md animate-bounce">
          <NavLink
            onClick={handleClick}
            className="text-white hover:text-green-800 flex flex-row gap-2"
          >
            <div className="flex items-center justify-center">
              <h1 className="font-bold text-xl text-green-500">
                <LuNotebookPen />
              </h1>
            </div>
            <div className="flex items-center justify-center w-[30px] h-[30px] bg-green-500 rounded-br-[50%] rounded-tl-[50%] rounded-tr-[50%] mr-1">
              <h1 className="font-bold text-lg">Q</h1>
            </div>
          </NavLink>
        </div>

        <div className="flex flex-col items-center gap-2 mt-3">
          <a
            href="https://whatsapp.com/channel/0029VbADrN54IBh95nFJiR3e"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 animate-bounce justify-center w-[160px] h-[45px] bg-green-500 rounded-full text-white font-semibold hover:bg-green-600 transition"
          >
            <FaWhatsapp size={24} />
            <p className="font-bold">Join WhatsApp</p>
          </a>

          <a
            href="https://www.youtube.com/@careerJupiter"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 animate-bounce justify-center w-[160px] h-[45px] bg-red-500 rounded-full text-white hover:bg-red-600 transition"
          >
            <FaYoutube size={20} />
            <p className="font-bold">Youtube</p>
          </a>
        </div>
      </div>

      {/* Mobile View (Smaller Buttons) */}
      <div className="md:hidden fixed bottom-3 right-3 z-50 flex flex-col items-end gap-2">
        <button
          onClick={handleClick}
          className="flex items-center justify-center w-[42px] h-[42px] border-3 bg-white text-green-500 rounded-full shadow-md animate-bounce"
        >
          <LuNotebookPen size={18} />
        </button>

        <a
          href="https://whatsapp.com/channel/0029VbADrN54IBh95nFJiR3e"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center border-2 justify-center w-[42px] h-[42px] bg-green-500 text-white rounded-full shadow-md animate-bounce"
        >
          <FaWhatsapp size={16} />
        </a>

        <a
          href="https://www.youtube.com/@careerJupiter"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center border-2 justify-center w-[42px] h-[42px] bg-red-500 text-white rounded-full shadow-md animate-bounce"
        >
          <FaYoutube size={16} />
        </a>
      </div>
    </>
  );
};

export default Flotingbutton;
