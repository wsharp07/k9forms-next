import { faArrowLeft, faFile, faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import router from 'next/router';
import { Button } from 'reactstrap';

interface IFormToolbarProps {
  formName: string;
}

const FormToolbar = ({ formName }: IFormToolbarProps) => {
  const saveToPdf = (isDouble: Boolean): void => {
    let $inputs = document.querySelector('input');
    $inputs?.classList.add('print');

    html2canvas(document.querySelector(`#${formName}`)!)
      .then((canvas) => {
        var imgData = canvas.toDataURL('image/png');
        var doc = new jsPDF('p', 'in', 'letter');

        doc.addImage(imgData, 'PNG', 0.25, 0.25, 8, 3.8);

        if (isDouble) {
          doc.addImage(imgData, 'PNG', 0.25, 5.5, 8, 3.8);
        }

        doc.autoPrint();
        window.open(doc.output('bloburl'), '_blank');
      })
      .then(() => $inputs?.classList.remove('print'));
  };

  return (
    <div className="form-toolbar">
      <Button variant="primary" onClick={() => router.back()}>
        <FontAwesomeIcon icon={faArrowLeft} />
        &nbsp; Back
      </Button>
      <Button onClick={() => saveToPdf(false)}>
        <FontAwesomeIcon icon={faFile} />
        &nbsp; Print Single
      </Button>
      <Button onClick={() => saveToPdf(true)}>
        <FontAwesomeIcon icon={faCopy} />
        &nbsp; Print Double
      </Button>
    </div>
  );
};

export default FormToolbar;
