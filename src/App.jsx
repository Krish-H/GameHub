
import Navbar from "../components/Navbar";
import { Routes ,Route} from "react-router-dom";
import Home from "../page/Home";
import NewGame from "../page/NewGame";



export default function App() {
 

  return (
      <div>

       <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/newgame" element={<NewGame/>} />
      </Routes>


      </div>

  );
}
