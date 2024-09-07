const IconButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-full bg-secondary-dark hover:scale-105 transition"
    >
      {children}
    </button>
  );
};

export default IconButton;
