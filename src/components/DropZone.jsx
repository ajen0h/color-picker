import { Image } from "lucide-react";

const DropZone = ({getRootProps,getInputProps,isDragActive}) => {
  return (
    <div
      {...getRootProps()}
      className="text-white h-52 border-[2px] border-dashed    flex flex-col justify-center items-center text-center p-4 cursor-pointer ">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Suelta los archivos aquí!</p>
      ) : (
        <section className="flex flex-col justify-center items-center gap-3">
          <Image />
          <p>Arrastra y suelta algunos archivos aquí, o haz clic para seleccionar archivos.</p>
        </section>
      )}
    </div>
  );
};

export default DropZone;
