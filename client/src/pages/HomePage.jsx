import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "../components/ui/Loading";
import { useAuthStore } from "../store/authStore";

import Logo from "../assets/images/Logo.jpeg";

import { motion } from "framer-motion";

import { IoCloudUploadOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";

import ImageUploadForm from "../components/form/ImageUploadForm";
import Image from "../components/Image";

const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { logout, isLoading } = useAuthStore();
  const [images, setImages] = useState([]);

  const [isModalShow, setIsModalShow] = useState(false);

  const onLogout = async (event) => {
    event.preventDefault();
    console.log("Logout button clicked");
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log("🚀 ~ onLogout ~ error:", error);
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:3007/api/images/getAllImage",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error in Fetching images");
        }

        const data = await response.json();
        console.log("🚀 ~ fetchImages ~ data:", data);
        setImages(data.images);
        setLoading(false);
      } catch (error) {
        console.log("🚀 ~ fetchImages ~ error:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="w-full h-svh md:h-auto bg-transparent shadow-2xl overflow-hidden flex flex-col z-20 relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1.2 }}
        className="fixed bottom-10 right-10 lg:bottom-7 lg:right-7 p-2 rounded-full bg-secondary cursor-pointer"
        onClick={() => setIsModalShow(true)}
      >
        <IoCloudUploadOutline className="size-8 lg:size-6" />
      </motion.button>

      {isModalShow && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-primary-light outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-2xl font-semibold text-gray-400">
                    Image Upload
                  </h3>
                  <motion.button
                    className="p-1 ml-auto bg-transparent border-0  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setIsModalShow(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1.2 }}
                  >
                    <IoCloseOutline className="size-6 text-gray-300" />
                  </motion.button>
                </div>
                <div className="relative p-6 flex-auto">
                  <ImageUploadForm setIsModalShow={setIsModalShow} />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}

      <div className="bg-secondary-dark flex items-center py-2 justify-between px-10">
        <img
          src={Logo}
          alt="Logo"
          className="size-10 rounded-full"
          loading="lazy"
        />

        <div className="text-xl md:text-lg text-yellow-600 hidden md:block">
          <strong className="text-orange-700 tracking-widest text-2xl">
            Piniaz
          </strong>{" "}
          <span className="font-Jersey">On</span>{" "}
          <strong className="text-orange-700 tracking-widest text-2xl">
            Cloud
          </strong>
        </div>

        <button
          disabled={isLoading}
          onClick={onLogout}
          className="border border-gray-400 px-4 py-1 rounded-lg cursor-pointer hover:bg-secondary"
        >
          Logout
        </button>
      </div>

      <div className="w-full h-full mt-5 px-5 ">
        {loading ? (
          <div>
            <Loading />
          </div>
        ) : images.length > 0 ? (
          <div className="grid grid-cols-5 gap-2 md:grid-cols-6 md:gap-4 lg:grid-cols-8 lg:gap-5 justify-center items-center">
            {images.map((image) => (
              <Image image={image} key={image._id} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <p>You have no Images</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
