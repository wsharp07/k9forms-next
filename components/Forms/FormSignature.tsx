import { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { toDateTimeString } from '@utils/dateUtils';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

interface IFormSignatureProps {
  isEditable: boolean;
}

const FormSignature = ({ isEditable }: IFormSignatureProps) => {
  const [surgeon, setSurgeon] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    fetch(`/api/config`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSurgeon(data.surgeon);
      });
  }, []);

  return (
    <div className="col-md-12">
      <div className="col-md-9 offset-md-1">
        <Table borderless>
          <tbody>
            <tr>
              <td className="signature"></td>
              <td></td>
              <td className="signature">
                {isEditable ? (
                  <DatePicker
                    selected={currentDateTime}
                    onChange={(e: Date) => setCurrentDateTime(e)}
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
