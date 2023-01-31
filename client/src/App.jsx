import "./App.css";
import { useState } from "react";
import { ProductForm, Products } from "./components";

function App() {
  const [slider, setSlider] = useState(0);

  return (
    <div className="w-11/12 mx-auto h-full">
      <input
        type="range"
        name=""
        id=""
        min={0}
        max={31}
        onChange={(e) => setSlider(e.target.value)}
        value={slider}
      />
      <div className="flex justify-center items-center h-full"></div>

      <div className="flex flex-col justify-center items-center content-center h-full w-full gap-10">
        <ProductForm />
        <Products />
      </div>
    </div>
  );
}

export default App;
