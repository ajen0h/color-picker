import { useCallback, useState } from "react";
import "./App.css";
import { useDropzone } from "react-dropzone";
import CopyButtons from "./components/CopyButtons";
import EyeDropperButton from "./components/EyeDropperButton";
import PreviewColor from "./components/PreviewColor";
import { hexToRGB } from "./lib/utils";
import DropZone from "./components/DropZone";
import { ColorExtractor } from "react-color-extractor";
import { Pipette } from "lucide-react";
import PaletteBox from "./components/PaletteBox";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [color, setColor] = useState("");
  const [rgbColor, setRgbColor] = useState("");
  const [imagen, setImagen] = useState("/bg.jpg");
  const [palette, setPalette] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const notify = () => toast.success("Color ha sido copiado!");
  const errorMessage = () =>
    toast.error("Tu navegador no es compatible con el cuentagotas 😥");

  const onDrop = useCallback((acceptedFiles) => {
    const type = acceptedFiles[0].type.split("/")[0];
    console.log(type);
    if (type !== "image") return;
    const renderizarImg = URL.createObjectURL(acceptedFiles[0]);
    setImagen(renderizarImg);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleColor = async () => {
    setDisabled(false);
    if (!window.EyeDropper) {
      errorMessage();
      setDisabled(true);
      return;
    }

    try {
      const eyeDropper = new EyeDropper();
      const res = await eyeDropper.open();
      const rgb = hexToRGB(res.sRGBHex);
      setRgbColor(rgb);
      setColor(res.sRGBHex);
      setDisabled(true);
    } catch (error) {
      errorMessage();
      setDisabled(true);
    }
  };

  const getColors = (detectedColorCodes) => {
    console.log(detectedColorCodes);

    setPalette(detectedColorCodes);
  };

  return (
    <>
      <main className=" min-h-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        <section className="h-full mx-auto w-full max-w-screen-2xl p-5 md:p-10  m-auto grid grid-cols-1 md:grid-cols-2 gap-14">
          <div className="relative">
            <ColorExtractor getColors={getColors}>
              <img
                src={imagen}
                className="w-full object-contain rounded-xl rounded-xl"
              />
            </ColorExtractor>
            {disabled ? (
              <button
                onClick={handleColor}
                className="absolute top-0 bg-white text-black border-none rounded-lg p-4 font-bold flex justify-center items-center gap-4 hover:scale-110 transition-all">
                <>
                  <Pipette />
                </>
              </button>
            ) : null}
          </div>
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
                    <PaletteBox color={color} key={index} notify={notify} />
                  ))}
                </div>
              </div>
              <PreviewColor color={color} />
              <section className="flex flex-col gap-3 text-white ">
                <CopyButtons color={color} title={"HEX"} notify={notify} />
                <CopyButtons color={rgbColor} title={"RGB"} notify={notify} />
              </section>
              <div className="hidden xl:block w-full">
                <EyeDropperButton
                  handleColor={handleColor}
                  title={"Haz click para abir el cuentagotas "}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
