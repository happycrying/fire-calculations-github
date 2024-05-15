import { BrowserRouter, Route, Routes } from "react-router-dom";
import PNP from "~/pages/pnp/PNP";
import Home from "~/pages/home/Home";
import Category from "~/pages/category/Category";
import Header from "~/components/header/Header";
import About from "~/components/about/About";


function App() {
  return (
    <BrowserRouter>
      <Header/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/category" element={<Category/>}/>
        <Route path="/pnp" element={<PNP/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>

    </BrowserRouter>)
}

export default App;
