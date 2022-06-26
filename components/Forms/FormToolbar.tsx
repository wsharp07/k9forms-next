import { faArrowLeft, faFile, faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormType } from '@models/FormType';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import router from 'next/router';
import { Button } from 'reactstrap';
import styles from './FormToolbar.module.css';

interface IFormToolbarProps {
  formName: string;
  formType: FormType
}

const FormToolbar = ({ formName, formType }: IFormToolbarProps) => {

  const addImage = (doc: jsPDF, imgData: string, formType: FormType, isDouble: boolean = false) => {
    const width = 8.25;
    const height = formType === FormType.RABIES ? 4.25 : 4;
    const horizontalOffset = 0.125;
    const verticalOffset = isDouble ? height + 1 : 0.25;

    doc.addImage(imgData, 'PNG', horizontalOffset, verticalOffset, width, height);
  }

  const saveToPdf = (isDouble: Boolean): void => {
    let $inputs = document.querySelector('input');
    $inputs?.classList.add('print');

    html2canvas(document.querySelector(`#${formName}`)!)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF('p', 'in', 'letter');

        addImage(doc, imgData, formType);

        if (isDouble) {
          addImage(doc, imgData, formType, true);
        }

        doc.autoPrint();
        window.open(doc.output('bloburl'), '_blank');
      })
      .then(() => $inputs?.classList.remove('print'));
  };

  return (
    <div className={styles['form-toolbar']}>
      <Button variant="primary" onClick={() => router.push('/')}>
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
