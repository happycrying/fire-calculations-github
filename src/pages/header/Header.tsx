import React from "react";
import bg_image from "~/assets/e83ba1e3-b4ba-4708-a1d1-deb6b7e77ca6.jpg"

const Header = () => {
  return (
    <header className="text-white z-[5000] top-0 h-[200px] w-[80%] self-center mb-5" style={{backgroundImage: `url(${bg_image})`, backgroundSize:"cover"}}>
    </header>
  );
};

export default Header;