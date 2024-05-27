const PaletteBox = ({ color }) => {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(color);
  };
  return (
    <>
      <div
        onClick={handleCopy}
        style={{ backgroundColor: color }}
        className="cursor-pointer hover:scale-125 transition-all">
            
        </div>
    </>
  );
};

export default PaletteBox;
