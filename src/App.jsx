import { useState } from "react";
import "./App.css";
import { Copy } from "lucide-react";

function App() {
  const [color, setColor] = useState("");
  const [rgbColor, setRgbColor] = useState("");
  const [imagen, setImagen] = useState("");

  const handleColor = async () => {
    if (!window.EyeDropper) {
      console.log("No se puede");
      return;
    }
    const eyeDropper = new EyeDropper();
    const res = await eyeDropper.open();

    const rgb = hexToRGB(res.sRGBHex);
    setRgbColor(rgb);
    setColor(res.sRGBHex);
  };

  const handleImage = (e) => {
    const renderizarImg = URL.createObjectURL(e.target.files[0]);
    setImagen(renderizarImg);
  };

  const handleCopyHex = async () => {
    await navigator.clipboard.writeText(color);
  };
  const handleCopyRgb = async () => {
    await navigator.clipboard.writeText(rgbColor);
  };

  function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }

  return (
    <>
      <main className="flex flex-col justify-center items-center h-screen bg-indigo-500">
        <div className="w-[500px] h-[500px]">
          {imagen ? (
            <img src={imagen} className="h-full w-full object-cover" />
          ) : (
            <img src="/bg.jpg" className="h-full w-full object-cover" />
          )}
        </div>
        <input
          type="file"
          accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PNG"
          onChange={handleImage}
        />
        <button onClick={handleColor}>Pick Color</button>
        <div
          className="w-[50px] h-[50px]"
          style={{ background: `${color}` }}
        ></div>

        <section className="flex flex-col gap-3">
          <div>
            <input type="text" value={color} disabled={true}/>
            <button
              disabled={color !== "" ? false : true}
              onClick={handleCopyHex}
            >
              Color
            </button>
          </div>
          <div>
            <input type="text" value={rgbColor} disabled={true}/>
            <button
              disabled={rgbColor !== "" ? false : true}
              onClick={handleCopyRgb}
            >
              RgbColor
            </button>
          </div>
        </section>
      </main>

     
    </>
  );
}

export default App;
