import { IoMdDownload } from "react-icons/io";
import IconButton from "./ui/IconButton";
import PropTypes from "prop-types";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useImageStore } from "../store/imagesStore";
import { CiHeart } from "react-icons/ci";

const Image = ({ image }) => {
  const navigate = useNavigate();
  const { favToggle, isLoadingToggle, downloadImage } = useImageStore();

  const handleClick = () => {
    navigate(`/image/${image._id}`);
  };

  const handleFavToggle = async (event) => {
    event.stopPropagation();
    await favToggle(image._id);
  };

  const handleDownload = async (event) => {
    event.stopPropagation();
    await downloadImage(image._id);
  };

  return (
    <div
      className="w-full h-full relative group cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={image.url}
        alt={image.url}
        className="object-cover w-full h-full rounded-md"
      />
      {image.isFavourited ? (
        <button
          disabled={isLoadingToggle}
          className="absolute top-1 right-1 md:top-3 md:right-3 disabled:text-red-900 disabled:opacity-30 transition z-50"
          onClick={handleFavToggle}
        >
          <FaHeart className="text-red-500 size-5 group-hover:scale-110 transition" />
        </button>
      ) : (
        <button
          disabled={isLoadingToggle}
          className="absolute top-1 right-1 md:top-3 md:right-3 disabled:text-red-900 disabled:opacity-30 transition z-50"
          onClick={handleFavToggle}
        >
          <CiHeart className="text-red-500 size-5 group-hover:scale-110 transition" />
        </button>
      )}

      <div className="lg:opacity-0 group-hover:opacity-100 absolute hidden lg:block transition-all duration-300 ease-in-out w-full bottom-5 px-6">
        <div className="flex items-center justify-center gap-x-3 ">
          <IconButton onClick={handleDownload} disabled={isLoadingToggle}>
            <IoMdDownload className="size-4 text-black" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Image;

Image.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
    fileName: PropTypes.string,
    isFavourited: PropTypes.bool,
    updatedAt: PropTypes.string,
    userId: PropTypes.string,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};
