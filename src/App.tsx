import { BrowserRouter, Route, Routes } from "react-router-dom";
import PNP from "~/pages/pnp/PNP";
import Home from "~/pages/home/Home";
import Category from "~/pages/category/Category";
import Header from "~/pages/header/Header";


function App() {
  return (
    <BrowserRouter>
      <Header/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/category" element={<Category/>}/>
        <Route path="/pnp" element={<PNP/>}/>
      </Routes>

    </BrowserRouter>)
}

export default App;
