import PropTypes from "prop-types";

const InputErrorMessage = ({ text }) => {
  return (
    <p className="text-red-500 text-sm text-center tracking-widest">{text}</p>
  );
};

InputErrorMessage.propTypes = {
  text: PropTypes.string.isRequired,
};

export default InputErrorMessage;
