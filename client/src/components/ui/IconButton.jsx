const IconButton = ({ children, onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="p-2 rounded-full bg-zinc-200 hover:scale-105 transition disabled:opacity-20 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
};

export default IconButton;
