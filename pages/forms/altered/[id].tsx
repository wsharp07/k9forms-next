import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import { Table } from 'reactstrap';
import FormHeader from '@components/Forms/FormHeader';
import FormSignature from '@components/Forms/FormSignature';

import FormToolbar from '@components/Forms/FormToolbar';
import { FormType } from '@models/FormType';
import Loading from '@components/Loading';
import { fetchDogById } from '@app/queries/dog.query';
import { useQuery } from 'react-query';
import { fetchConfig } from '@app/queries/config.query';

const AlteredPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { isLoading: isDogLoading, error, data: dog } = useQuery(['dog', id], () => fetchDogById(id));
  const { isLoading: isConfigLoading, data: config } = useQuery('config', fetchConfig);

  const isLoading = isDogLoading || isConfigLoading;

  return isLoading && <Loading /> || (
    <div>
      <FormToolbar formName="altered-form" formType={FormType.ALTERED} />
      <div id="altered-form">
        <FormHeader formName="Spay/Neuter" />
        <br />
        <div className="row">
          <div className="col-md-12" style={{ textAlign: 'center' }}>
            <p>
              This document certifies that the dog listed below has been
              spay/neutered
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-1">
            <Table borderless className="k9-form">
              <tbody>
                <tr>
                  <th scope="row">Dog</th>
                  <td>
                    {' '}
                    {dog?.name} ({router.query.id})
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
                  <td>{dog?.gender}</td>
                </tr>
                <tr>
                  <th scope="row">Born</th>
                  <td>{dog?.bornOn}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>

        <FormSignature isEditable={true} surgeon={config?.surgeon || ''} />
      </div>
    </div>
  );
};

export default AlteredPage;
