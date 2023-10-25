const Button = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className="Current_btn" onClick={onClick}>
      Current Location
    </button>
  );
};

export default Button;
