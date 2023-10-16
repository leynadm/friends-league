import "./standard--button.css";

interface StandardButtonInterface {
  buttonText: string;
  onClick?: () => void; // Optional function prop
}

function Button({ buttonText,onClick }: StandardButtonInterface) {
  return (
    <>
      <button className="standard-button" role="button" onClick={onClick}> 
        {buttonText}
      </button>
    </>
  );
}
export default Button;
