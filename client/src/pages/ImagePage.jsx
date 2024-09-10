import { useEffect, useState } from "react";
import { useImageStore } from "../store/imagesStore";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/ui/Loading";
import { FaHeart } from "react-icons/fa";

const ImagePage = () => {
  const [image, setImage] = useState(null);
  const params = useParams();
  const { images } = useImageStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!images.length > 0) {
      navigate("/");
    }

    const foundImage = images.find((img) => img._id === params.imageId);

    if (foundImage) {
      foundImage.url = foundImage.url.replace("q_auto/f_auto/", "");
      console.log("🚀 ~ useEffect ~ foundImage:", foundImage);

      setImage(foundImage);
    }
  }, [images, params.imageId]);

  if (!image) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        {" "}
        <Loading />
      </div>
    );
  }

  return (
    <div className="z-10 w-full h-full flex justify-center items-center">
      <div className="bg-black flex">
        <div className="">
          <img src={image.url} alt={image.url} className="" />
        </div>

        <div className="">
          {image.isFavourited && <FaHeart className="size-8 text-red-500" />}
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
