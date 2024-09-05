import { useState, useCallback } from "react";

import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";

import toast from "react-hot-toast";
import ButtonLoader from "../../components/ui/ButtonLoader";

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setImage(acceptedFiles[0]);
    console.log(image);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = async () => {
    if (!image) {
      toast.error("Please provide a image to upload");
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:3007/api/images/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
      const data = await response.json();
      console.log("🚀 ~ handleUpload ~ data:", data);
      toast.success("Image uploaded successfully");
      setUploadedImageUrl(data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="z-30 max-w-md w-full h-svh md:h-auto bg-blue-950 bg-opacity-20 backdrop-filter backdrop-blur-3xl md:rounded-xl shadow-2xl overflow-hidden flex items-center justify-center">
      <div className="p-5 flex flex-col justify-center items-center">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed p-5 md:p-10  rounded-lg cursor-pointer ${
            isDragActive ? "border-blue-500" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag & drop an image here, or click to select one</p>
          )}
        </div>

        <motion.button
          className="mt-5 w-full py-3 px-4 bg-transparent border border-gray-400 text-white font-mono
            font-bold rounded-lg shadow-lg  focus:outline-none focus:ring-2 focus:ring-secondary-light focus:ring-offset-2
             focus:ring-offset-gray-900 transition ease-in-out tracking-widest"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          onClick={handleUpload}
        >
          {isLoading ? <ButtonLoader color={"#AD49E1"} /> : "Upload"}
        </motion.button>

        {uploadedImageUrl && (
          <img src={uploadedImageUrl} loading="lazy" alt="Uploaded" />
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
