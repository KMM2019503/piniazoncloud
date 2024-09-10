const IconButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-full bg-zinc-200 hover:scale-105 transition"
    >
      {children}
    </button>
  );
};

export default IconButton;
