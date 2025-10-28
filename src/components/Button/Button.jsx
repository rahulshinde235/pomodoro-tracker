import "./Button.css";

function Button({
  icon: Icon,
  text,
  className = "",
  onClick,
  disabled = false,
  iconSize = 16,
  iconPosition = "left",
}) {
  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {iconPosition === "left" && Icon && <Icon size={iconSize} />}
      <span className={Icon ? "hidden sm:block" : ""}>{text}</span>
      {iconPosition === "right" && Icon && <Icon size={iconSize} />}
    </button>
  );
}

export default Button;
