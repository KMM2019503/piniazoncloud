import BeatLoader from "react-spinners/BeatLoader";
import PropTypes from "prop-types";

const override = {
  display: "flex",
  margin: "0 auto",
  borderColor: "red",
};

const ButtonLoader = ({ color }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <BeatLoader
        color={color}
        cssOverride={override}
        size={12}
        speedMultiplier={0.7}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

ButtonLoader.propTypes = {
  color: PropTypes.string,
};

ButtonLoader.displayName = "ButtonLoader";

export default ButtonLoader;
