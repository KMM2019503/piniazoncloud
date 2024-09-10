import { IoMdDownload } from "react-icons/io";
import IconButton from "./ui/IconButton";
import PropTypes from "prop-types";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Image = ({ image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/image/${image._id}`);
    // console.log("click");
  };

  return (
    <div
      className="w-full h-full relative group cursor-pointer"
      onClick={() => handleClick()}
    >
      <img
        src={image.url}
        alt={image.url}
        className="object-cover w-full h-full rounded-md"
      />
      {image.isFavourited && (
        <div className="absolute top-3 right-3">
          <FaHeart className="text-red-500 size-5 group-hover:scale-110 transition" />
        </div>
      )}

      <div className="lg:opacity-0 group-hover:opacity-100 absolute hidden lg:block transition-all duration-300 ease-in-out w-full bottom-5 px-6">
        <div className="flex items-center justify-center gap-x-3 ">
          <IconButton
            onClick={() => {
              console.log("download button click");
            }}
          >
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
