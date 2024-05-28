import { Check, Clipboard } from "lucide-react";
import { useState } from "react";

const CopyButtons = ({ title, color, notify }) => {
  const [icon, setIcon] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(color);
    setIcon(true);
    setTimeout(() => {
      setIcon(false);
    }, 2000);
    notify()
  };

  return (
    <>
      <div className="border rounded-lg flex justify-between items-center p-3 font-bold">
        <h1>{title}</h1>
        <div>{color}</div>
        <button disabled={color !== "" ? false : true} onClick={handleCopy}>
          {icon ? <Check /> : <Clipboard />}
        </button>
      </div>
    </>
  );
};

export default CopyButtons;
