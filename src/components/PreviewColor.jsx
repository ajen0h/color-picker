const PreviewColor = ({color}) => {
  return (
    <div
      className="h-[50px] rounded-lg border border-white "
      style={{ background: `${color}` }}></div>
  );
};

export default PreviewColor;
