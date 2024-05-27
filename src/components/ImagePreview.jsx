const ImagenPreview = ({ imagen }) => {
  return (
    <>
      <img
        src={imagen}
        className="w-full object-contain border-[14px] rounded-xl"
      />
    </>
  );
};

export default ImagenPreview;
