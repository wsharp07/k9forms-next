import { faL } from "@fortawesome/free-solid-svg-icons";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Alert, Form, FormGroup, Label, Input, Button } from "reactstrap";

const AdminPage: NextPage = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [surgeon, setSurgeon] = useState("");

  const onSurgeonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurgeon(e.target.value);
  };

  const alert = (isError: boolean = false) => {};

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/config", {
        method: "POST",
        body: JSON.stringify({ surgeon }),
      });
      await response.json();

      setSurgeon(surgeon);
      alert();
    } catch (e) {
      console.error(e);
      alert(true);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`/api/config`);
        const data = await response.json();
        setSurgeon(data.surgeon);
      } catch (e) {
        console.error(e);
      }
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  return (
    <div className="topPad">
      <Alert
        color="success"
        style={{ display: showSuccess ? "block" : "none" }}
      >
        Update Successful!
      </Alert>
      <Alert color="danger" style={{ display: showError ? "block" : "none" }}>
        Update Failed!
      </Alert>
      <h2>Administration</h2>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label for="inputSurgeon">Surgeon</Label>
          <Input
            type="text"
            name="surgeon"
            id="inputSurgeon"
            value={surgeon}
            onChange={onSurgeonChange}
          />
        </FormGroup>
        <Button type="submit" color="primary">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default AdminPage;
