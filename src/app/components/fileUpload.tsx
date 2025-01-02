import { useContext, useEffect, useState } from "react";
import { IProducts } from "@/interfaces/IProducts";
import { IoIosImages } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import { ReloadContext } from "@/hooks/reloadContent";

const FileUpload = ({ row, error }: { row: IProducts | null, error: boolean }) => {
    const [link, setLink] = useState(row?.image || "");
    const [file, setFile] = useState<File | null>(null);
    const { updatedFile } = useContext(ReloadContext);

    useEffect(() => {
      if (file) {
        updatedFile(file);
      }
    }, [file])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
  
      if (selectedFile) {
        setFile(selectedFile);
        setLink(URL.createObjectURL(selectedFile));
      }
    };

  return (
      <>
        <div
          className={`${
            link != "" ? "h-64" : "h-48 py-14"
          } flex justify-center transition-all w-full border-dashed ${
            error && !link && "border-red-500"
          } border-2 rounded-lg relative text-md font-medium text-gray-700`}
        >
          <input
            required={!file && !link}
            onChange={(e) => handleFileChange(e)}
            type="file"
            name="image"
            accept="image/png, image/jpeg"
            id="image"
            className="absolute cursor-pointer top-0 w-full h-48 opacity-0"
          />

          {link ? (
            <div className="flex justify-center">
              <svg className="p-10 flex justify-center">
                <image href={link} className="my-class w-80" />
              </svg>
            </div>
          ) : (
            <div className="flex flex-col gap-2 items-center justify-center ">
              <IoIosImages fontSize={40} />
              <p className="w-full px-3 text-center text-sm md:text-lg">
                Clique aqui para selecionar uma imagem.
              </p>
            </div>
          )}
        </div>

        <FaTrash
          fontSize={22}
          onClick={() => setLink("")}
          className={`${
            link ? "block" : "hidden"
          } absolute cursor-pointer top-9 right-4 hover:text-red-700 transition-all`}
        />
      </>
  )
}

export default FileUpload;