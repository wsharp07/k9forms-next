import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import FormHeader from "@components/Forms/FormHeader";
import FormSignature from "@components/Forms/FormSignature";
import { IDog } from "@models/IDog";
import { IRabiesInfo } from "@models/IRabiesInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCopy, faFile } from "@fortawesome/free-solid-svg-icons";
import { getAlteredText } from "@utils/formatText";

import "react-datepicker/dist/react-datepicker.css";

const RabiesPage: NextPage = () => {
  const [dog, setDog] = useState({} as IDog);
  const [rabiesInfo, setRabiesInfo] = useState({} as IRabiesInfo);
  const router = useRouter();
  const { id } = router.query;

  const saveToPdf = async (isDouble: Boolean) => {
    debugger;
    const $inputs = document.querySelector("input");
    $inputs?.classList.add("print");

    const $rabiesForm: HTMLElement | null =
      document.querySelector("#rabies-form");

    if (!$rabiesForm) return;

    const canvas = await html2canvas($rabiesForm);
    const imgData = canvas.toDataURL("image/png");
    const doc = new jsPDF("p", "in", "letter");

    doc.addImage(imgData, "PNG", 0.25, 0.25, 8, 4.75);

    if (isDouble) {
      doc.addImage(imgData, "PNG", 0.25, 5.5, 8, 4.75);
    }

    doc.autoPrint();
    window.open(doc.output("bloburl"), "_blank");
    $inputs?.classList.remove("print");
  };

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

      try {
        const response = await fetch(`/api/dog/${id}/rabiesInfo`);
        const rabiesInfo = await response.json();
        setRabiesInfo(rabiesInfo);
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
                    {" "}
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
                  <td>
                    {dog.gender} {getAlteredText(dog.altered, dog.gender)}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Born</th>
                  <td>{dog.bornOn}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="col-md-4 offset-md-1">
            <Table borderless className="k9-form">
              <tbody>
                <tr>
                  <th scope="row">Rabies Serial #</th>
                  <td>{rabiesInfo.serialNumber}</td>
                </tr>
                <tr>
                  <th scope="row">Manufacturer</th>
                  <td>{rabiesInfo.manufacturer}</td>
                </tr>
                <tr>
                  <th scope="row">Mfg Expiration</th>
                  <td>{rabiesInfo.expiresOn}</td>
                </tr>
                <tr>
                  <th scope="row">Vaccine Due Next On</th>
                  <td>{rabiesInfo.dueOn}</td>
                </tr>
              </tbody>
            </Table>
          </div>

          <FormSignature isEditable={true} />
        </div>
      </div>
    </div>
  );
};

export default RabiesPage;
