import { useState } from 'react';
import { Table } from 'reactstrap';
import { toDateTimeString } from '@utils/dateUtils';
import DatePicker from 'react-datepicker';

import styles from './FormSignature.module.css';

import 'react-datepicker/dist/react-datepicker.css';

interface IFormSignatureProps {
  isEditable: boolean;
  surgeon: string;
}

const FormSignature = ({ isEditable, surgeon }: IFormSignatureProps) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  return (
    <div className="col-md-12">
      <div className="col-md-9 offset-md-1">
        <Table borderless>
          <tbody>
            <tr>
              <td className={styles.signature}></td>
              <td></td>
              <td className={styles.signature}>
                {isEditable ? (
                  <DatePicker
                    selected={currentDateTime}
                    onChange={(date) => setCurrentDateTime(date as Date)}
                  />
                ) : (
                  toDateTimeString(currentDateTime)
                )}
              </td>
            </tr>
            <tr>
              <td>{surgeon}</td>
              <td></td>
              <td>Date</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default FormSignature;
