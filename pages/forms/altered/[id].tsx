import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import { useEffect, useState } from 'react';
import { Button, Table } from 'reactstrap';
import FormHeader from '@components/Forms/FormHeader';
import FormSignature from '@components/Forms/FormSignature';
import { IDog } from '@models/IDog';

import FormToolbar from '@components/Forms/FormToolbar';

const AlteredPage: NextPage = () => {
  const [dog, setDog] = useState({
    name: 'Name',
    bornOn: 'Born On',
    color: 'Color',
    gender: 'Gender',
    id: 1,
    vaccinatedOn: 'Vaccinated On',
    breed: 'Breed',
    altered: 'N/A',
  } as IDog);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const response = await fetch(`/api/dog/${id}`);
        const dog = await response.json();
        setDog(dog);
      } catch (e) {
        console.error(e);
      }
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, [id]);

  return (
    <div>
      <FormToolbar formName="altered-form" />
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
                    {dog.name} ({router.query.id})
                  </td>
                </tr>
                <tr>
                  <th scope="row">Breed</th>
                  <td>{dog.breed}</td>
                </tr>
                <tr>
                  <th scope="row">Color</th>
                  <td>{dog.color}</td>
                </tr>
                <tr>
                  <th scope="row">Gender</th>
                  <td>{dog.gender}</td>
                </tr>
                <tr>
                  <th scope="row">Born</th>
                  <td>{dog.bornOn}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>

        <FormSignature isEditable={true} />
      </div>
    </div>
  );
};

export default AlteredPage;
