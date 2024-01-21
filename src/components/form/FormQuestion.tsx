interface Props {
  question: string;
  inputType: string;
  options?: string[];
}

export const FormQuestion = ({ question, inputType, options }: Props) => {
  return (
    <div className="question">
      <label>{question}</label>
      {inputType === "select" && options ? (
        <select>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input type={inputType} />
      )}
    </div>
  );
};
