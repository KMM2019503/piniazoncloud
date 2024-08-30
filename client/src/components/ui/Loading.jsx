import PacmanLoader from "react-spinners/PacmanLoader";
import PropTypes from "prop-types";

const override = {
  display: "flex",
  margin: "0 auto",
  borderColor: "red",
};

const Loading = ({ color }) => {
  return (
    <PacmanLoader
      color={color}
      cssOverride={override}
      size={12}
      speedMultiplier={0.7}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

Loading.propTypes = {
  color: PropTypes.string,
};

Loading.displayName = "Loading";

export default Loading;
