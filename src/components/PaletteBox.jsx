import { isColorDark } from "../lib/utils";

const PaletteBox = ({ color, notify }) => {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(color);
    notify()
  };

  return (
    <>
      <div
        onClick={handleCopy}
        style={{ backgroundColor: color }}
        className="cursor-pointer hover:scale-125 transition-all flex items-end justify-center">
        <p
          className={`${
            isColorDark(color) ? "text-white" : "text-black"
          } font-bold lg:text-sm p-2`}>
          {color}
        </p>
      </div>
    </>
  );
};

export default PaletteBox;
