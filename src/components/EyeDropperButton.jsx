import { Pipette } from "lucide-react";

const EyeDropperButton = ({ handleColor, title }) => {

  return (
    <>
      <button
        onClick={handleColor}
        className=" bg-white text-black border-none rounded-lg p-4 font-bold flex justify-center items-center gap-4 w-full">
        <>
          <Pipette />
          {title}
        </>
      </button>
      
    </>
  );
};

export default EyeDropperButton;
