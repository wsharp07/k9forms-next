import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { IDog } from '@models/IDog';

const Home: NextPage = () => {
  const [dogs, setDogs] = useState([] as IDog[]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api/dog');
        const dogs = await response.json();
        setDogs(dogs);
      } catch (e) {
        console.error(e);
      }
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Dog ID</th>
            <th>Dog Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {dogs.length <= 0 && (
            <tr>
              <td colSpan={4}>No available dogs found</td>
            </tr>
          )}
          {dogs.map((listValue, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{listValue.id}</td>
                <td>{listValue.name}</td>
                <td className="buttons">
                  <Link href={`/forms/altered/${listValue.id}`} passHref>
                    <a className="btn btn-primary">Spay/Neuter</a>
                  </Link>
                  <Link href={`/forms/rabies/${listValue.id}`} passHref>
                    <a className="btn btn-info">Rabies</a>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Home;
