interface IFormHeaderProps {
  formName: string;
}

const FormHeader = ({ formName }: IFormHeaderProps) => {
  return (
    <div className="row k9-header">
      <div className="col-md-12">
        <h1>K-9 Stray Rescue League {formName} Certification</h1>
        <h4>2120 Metamora Rd.</h4>
        <h4>Oxford MI, 48371</h4>
        <h4>248-628-0435</h4>
      </div>
    </div>
  );
};

export default FormHeader;
