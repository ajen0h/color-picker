const ImagenPreview = ({ imagen }) => {
  return (
    <div>
      {imagen ? (
        <img
          src={imagen}
          className="w-full object-contain border-[14px] rounded-xl"
        />
      ) : (
        <img
          src="/bg.jpg"
          className="w-full object-contain border-[14px] rounded-xl"
        />
      )}
    </div>
  );
};

export default ImagenPreview;
