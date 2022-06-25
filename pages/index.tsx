import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { IDog } from '@models/IDog';
import Loading from '@components/Loading';
import { useQuery } from 'react-query';
import { fetchDogs } from '@app/queries/dog.query';

const Home: NextPage = () => {
  const { isLoading, error, data } = useQuery("dogs", fetchDogs);

  return isLoading && <Loading /> || (
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
          {data?.length || 0 <= 0 && (
            <tr>
              <td colSpan={4}>No available dogs found</td>
            </tr>
          )}
          {data?.map((listValue, index) => {
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
