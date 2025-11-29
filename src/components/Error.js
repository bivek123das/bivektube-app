import { useRouteError } from "react-router-dom";
import { useSelector } from "react-redux";

const Error  = ()=>{
    const err = useRouteError();
    const darkMode = useSelector((store) => store.theme.darkMode);
    console.log(err);
   return(
       <div className={`min-h-screen flex flex-col items-center justify-center ${
         darkMode ? 'bg-[#2a3541] text-white' : 'bg-white text-black'
       }`}>
            <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>
              Oops!!!
            </h1>
            <h2 className={`text-2xl mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Something Went Wrong!!
            </h2>
            <h2 className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {err.status} {err.statusText}
            </h2>
       </div>
   )
}

export default Error;