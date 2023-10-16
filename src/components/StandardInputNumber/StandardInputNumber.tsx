import "./standard-input-number.css"
interface StandardInputNumberInterface {

  labelText:string;

}

function StandardInputNumber({labelText}:StandardInputNumberInterface) {
  return (
    <div className="standard-input-number-wrapper">
    <label htmlFor="standard-input-number">{labelText}</label>
      <input type="number" id="standard-input-number" className="standard-input-number" min={0}></input>
    </div>
  );
}

export default StandardInputNumber;
