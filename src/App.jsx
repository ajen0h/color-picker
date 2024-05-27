import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { useDropzone } from "react-dropzone";
import ImagenPreview from "./components/ImagePreview";
import CopyButtons from "./components/CopyButtons";
import EyeDropperButton from "./components/EyeDropperButton";
import PreviewColor from "./components/PreviewColor";
import { hexToRGB } from "./lib/utils";
import DropZone from "./components/DropZone";
import { ColorExtractor } from "react-color-extractor";
import { Palette } from "lucide-react";
import PaletteBox from "./components/PaletteBox";

function App() {
  const [color, setColor] = useState("");
  const [rgbColor, setRgbColor] = useState("");
  const [imagen, setImagen] = useState("/bg.jpg");
  const [palette, setPalette] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const type = acceptedFiles[0].type.split("/")[0];
    console.log(type);
    if (type !== "image") return;
    const renderizarImg = URL.createObjectURL(acceptedFiles[0]);
    setImagen(renderizarImg);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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

  const getColors = (detectedColorCodes) => {
    console.log(detectedColorCodes);
    setPalette(detectedColorCodes);
  };

  return (
    <>
      <main className="min-h-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        <section className="h-full mx-auto w-full max-w-screen-2xl p-5 md:p-10  m-auto grid grid-cols-1 md:grid-cols-2 gap-14">
          <ColorExtractor getColors={getColors}>
            <img
              src={imagen}
              className="w-full object-contain border-[14px] rounded-xl"
            />
          </ColorExtractor>
          <div className="flex flex-col-reverse md:flex-col gap-4 ">
            <DropZone
              getInputProps={getInputProps}
              getRootProps={getRootProps}
              isDragActive={isDragActive}
            />
            <div className="flex flex-col gap-4">
              {/* Palette */}
              <div className="rounded-3xl border-4 overflow-hidden">
                <div className="h-[80px] grid grid-cols-6 ">
                  {palette.map((color, index) => (
                    <PaletteBox color={color} key={index} />
                  ))}
                </div>
              </div>
              <PreviewColor color={color} />
              <section className="flex flex-col gap-3 text-white ">
                <CopyButtons color={color} title={"HEX"} />
                <CopyButtons color={rgbColor} title={"RGB"} />
              </section>
              <EyeDropperButton
                handleColor={handleColor}
                title={"Haz click para abir el cuentagotas "}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
