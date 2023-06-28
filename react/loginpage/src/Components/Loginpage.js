import React, { useEffect, useState } from "react";
import { Button, Label, Input, FormGroup, Row, Col, Form } from "reactstrap";

export const Loginpage = () => {
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [one, setOne] = useState(0);
  const [two, setTwo] = useState(0);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: ""
  });

  const formfill = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  useEffect(() => {
    showCountry();
  }, []);

  useEffect(() => {
    showState(one);
  }, [one]);

  const showCountry = () => {
    fetch("http://127.0.0.1:8000/api/getcountry")
      .then((response) => response.json())
      .then((data) => {
        setCountry(data);
      })
      .catch((error) => {
        // Handle error here
      });
  };

  const showState = (one) => {
    fetch(`http://127.0.0.1:8000/api/getstate/${one}`)
      .then((response) => response.json())
      .then((data) => {
        setState(data);
      })
      .catch((error) => {
        // Handle error here
      });
  };

  const addData = () => {
    const { fname, lname, email } = formData;
    fetch("http://127.0.0.1:8000/api/addData", {
      method: "POST",
      body: JSON.stringify({
        firstname: fname,
        lastname: lname,
        email: email,
        country_id: one,
        state_id: two
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Data added successfully.");
        console.log(data);
      })
      .catch((error) => {
        alert("Oops! Something went wrong.");
        console.error(error);
      });
  };

  return (
    <Form>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="firstname">FIRST NAME</Label>
            <Input
              id="firstname"
              name="fname"
              type="text"
              onChange={formfill}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="lastname">LAST NAME</Label>
            <Input
              id="lastname"
              name="lname"
              type="text"
              onChange={formfill}
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={formfill}
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="country">Select Country</Label>
            <Input
              id="country"
              name="country"
              type="select"
              
              onChange={(e) => setOne(e.target.value)}
            >
              <option>Select country</option>
              {country.map((countrydata) => (
                <option key={countrydata.id} value={countrydata.id}>
                  {countrydata.name}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="state">Select State</Label>
            <Input id="state" name="state" type="select"
            
            onChange={(e) => setTwo(e.target.value)}>

              <option>Select state</option>
              {state.map((statedata) => (
                <option key={statedata.id} value={statedata.id}>
                  {statedata.name}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
      </Row>

      <FormGroup check>
        <Input id="exampleCheck" name="check" type="checkbox" />
        <Label check for="exampleCheck">
          Terms and conditions
        </Label>
      </FormGroup>

      <Button onClick={addData}>Sign in</Button>
    </Form>
  );
};
