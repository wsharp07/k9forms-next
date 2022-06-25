import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Table } from 'reactstrap';
import FormHeader from '@components/Forms/FormHeader';
import FormSignature from '@components/Forms/FormSignature';
import { getAlteredText } from '@utils/formatText';

import 'react-datepicker/dist/react-datepicker.css';
import FormToolbar from '@components/Forms/FormToolbar';
import { FormType } from '@models/FormType';
import Loading from '@components/Loading';
import { useQuery } from 'react-query';
import { fetchConfig } from '@app/queries/config.query';
import { fetchDogById } from '@app/queries/dog.query';
import { fetchRabiesInfo } from '@app/queries/rabies.query';

const RabiesPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const {
    isLoading: isDogLoading,
    error,
    data: dog,
  } = useQuery(['dog', id], () => fetchDogById(id));
  const { isLoading: isRabiesInfoLoading, data: rabiesInfo } = useQuery(
    ['rabiesInfo', id],
    () => fetchRabiesInfo(id)
  );
  const { isLoading: isConfigLoading, data: config } = useQuery(
    'config',
    fetchConfig
  );

  const isLoading = isDogLoading || isRabiesInfoLoading || isConfigLoading;

  return (
    (isLoading && <Loading />) || (
      <div>
        <FormToolbar formName="rabies-form" formType={FormType.RABIES} />
        <div id="rabies-form">
          <FormHeader formName="Rabies" />
          <br />
          <br />
          <div className="row">
            <div className="col-md-4 offset-md-1">
              <Table borderless className="k9-form">
                <tbody>
                  <tr>
                    <th scope="row">Dog</th>
                    <td>
                      {' '}
                      {dog?.name} ({id})
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Breed</th>
                    <td>{dog?.breed}</td>
                  </tr>
                  <tr>
                    <th scope="row">Color</th>
                    <td>{dog?.color}</td>
                  </tr>
                  <tr>
                    <th scope="row">Gender</th>
                    <td>
                      {dog?.gender}{' '}
                      {getAlteredText(dog?.altered || '', dog?.gender || '')}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Born</th>
                    <td>{dog?.bornOn}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className="col-md-4 offset-md-1">
              <Table borderless className="k9-form">
                <tbody>
                  <tr>
                    <th scope="row">Rabies Serial #</th>
                    <td>{rabiesInfo?.serialNumber}</td>
                  </tr>
                  <tr>
                    <th scope="row">Manufacturer</th>
                    <td>{rabiesInfo?.manufacturer}</td>
                  </tr>
                  <tr>
                    <th scope="row">Mfg Expiration</th>
                    <td>{rabiesInfo?.expiresOn}</td>
                  </tr>
                  <tr>
                    <th scope="row">Vaccine Due Next On</th>
                    <td>{rabiesInfo?.dueOn}</td>
                  </tr>
                </tbody>
              </Table>
            </div>

            <FormSignature isEditable={true} surgeon={config?.surgeon || ''} />
          </div>
        </div>
      </div>
    )
  );
};

export default RabiesPage;
