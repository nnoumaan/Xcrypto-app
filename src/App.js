import { BrowserRouter as Router, Routes,Route } from "react-router-dom";

import Home from "./components/Home";
import Coins from "./components/Coins";
import CoinsDetails from "./components/CoinsDetails";
import Exchange from "./components/Exchange";
import Header from "./components/Header";



function App() {
  return (
<Router>
<Header/>
<Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/coins" element={<Coins/>}/>
  <Route path="/coins/:id" element={<CoinsDetails/>}/>
  <Route path="/exchange" element={<Exchange/>}/>
  
</Routes>


</Router>
  );
}

export default App;
