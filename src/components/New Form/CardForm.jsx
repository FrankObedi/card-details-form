import React, { useRef, useState } from "react";
import { isValidString } from "./stringValidation";
import { isValidNumber } from "./numberValidation";
import { errorsMessages } from "./error-messages";
import "./cardForm.css";

export default function CardForm() {
  const [formErrors, setFormErrors] = useState({
    nameField: "",
    numberField: "",
    expirationMonth: "",
    expirationYear: "",
    cvcField: "",
  });

  const [isFormValid, setisFormValid] = useState(true);
  const cardholderName = useRef(null);
  const cardNumber = useRef(null);
  const expMonth = useRef(null);
  const expYear = useRef(null);
  const cardCVC = useRef(null);
  const form = useRef(null);
  const formFields = [cardholderName, cardNumber, expMonth, expYear, cardCVC];

  // form validation
  const validateForm = (e) => {
    e.preventDefault();
    const newFormErrors = {
      nameField: "",
      numberField: "",
      expirationMonth: "",
      expirationYear: "",
      cvcField: "",
    };

    let validCount = 5;

    formFields.forEach((field) => {
      const fieldId = field.current.id;
      const fieldValue = field.current.value;

      if (fieldValue.length == 0) {
        newFormErrors[fieldId] = "blankError";
        validCount -= 1;
      } else if (fieldId === "numberField" && fieldValue.length < 16) {
        newFormErrors[fieldId] = "lengthError16";
      } else if (
        (fieldId === "expirationMonth" || fieldId === "expirationYear") &&
        fieldValue.length < 2
      ) {
        newFormErrors[fieldId] = "lengthError2";
      } else if (fieldId === "cvcField" && fieldValue.length < 3) {
        newFormErrors[fieldId] = "lengthError3";
      } else if (
        fieldId === "nameField" &&
        isValidString(fieldValue) == false
      ) {
        newFormErrors[fieldId] = "formatError1";
        validCount -= 1;
      }
      // check that
      else if (
        fieldId !== "nameField" &&
        !isNaN(Number(field.current.value)) === false
      ) {
        newFormErrors[fieldId] = "formatError2";
        validCount -= 1;
      }
    });

    setFormErrors(newFormErrors);
    if (validCount < 5) {
      setisFormValid(false);
    } else {
      console.log("Form is valid", validCount);
    }
  };

  // clear error fields when clicked
  const clearField = (e) => {
    setFormErrors((prevformErrors) => ({
      ...prevformErrors,
      [e.target.id]: "",
    }));
  };

  return (
    <section className="card-form-container">
      <form ref={form} onSubmit={validateForm} className="card-form grid-flow">
        <div className="field-wrapper">
          <label htmlFor="nameField">Cardholder Name</label>
          <div
            className={`input-border ${
              formErrors.nameField !== "" ? "error-field" : ""
            }`}
          >
            <input
              type="text"
              name="cardholder-name"
              placeholder="e.g. Jane Appleseeds"
              id="nameField"
              ref={cardholderName}
              onClick={clearField}
            />
          </div>
          <p className="error-message">
            {formErrors.nameField !== ""
              ? errorsMessages[formErrors.nameField]
              : ""}
          </p>
        </div>

        <div className="field-wrapper">
          <label htmlFor="numberField">Card Number</label>
          <div
            className={`input-border ${
              formErrors.numberField !== "" ? "error-field" : ""
            }`}
          >
            <input
              type="text"
              name="card-number"
              maxLength="16"
              size="16"
              placeholder="e.g. 1234 5678 9123 0000"
              id="numberField"
              ref={cardNumber}
              onClick={clearField}
            />
          </div>
          <p className="error-message">
            {formErrors.numberField !== ""
              ? errorsMessages[formErrors.numberField]
              : ""}
          </p>
        </div>
        <div className="card-security grid-flow">
          <div className="card-expiration">
            <label htmlFor="expirationMonth">Exp. Date (MM/YY)</label>
            <div className="flex-flow card-expiration-flex">
              <div
                className={`input-border ${
                  formErrors.expirationMonth !== "" ? "error-field" : ""
                }`}
              >
                <input
                  type="text"
                  name="expiration-month"
                  maxLength="2"
                  size="2"
                  id="expirationMonth"
                  placeholder="MM"
                  ref={expMonth}
                  onClick={clearField}
                />
              </div>

              <div
                className={`input-border ${
                  formErrors.expirationYear !== "" ? "error-field" : ""
                }`}
              >
                <input
                  type="text"
                  name="expiration-year"
                  maxLength="2"
                  size="2"
                  id="expirationYear"
                  placeholder="YY"
                  ref={expYear}
                  onClick={clearField}
                />
              </div>
            </div>
            <p className="error-message">
              {formErrors.expirationMonth !== ""
                ? errorsMessages[formErrors.expirationMonth]
                : formErrors.expirationYear !== ""
                ? errorsMessages[formErrors.expirationYear]
                : ""}
            </p>
          </div>

          <div className="cvc-field-wrapper field-wrapper flex-flow">
            <label htmlFor="cvcField">CVC</label>
            <div
              className={`input-border ${
                formErrors.cvcField !== "" ? "error-field" : ""
              }`}
            >
              <input
                type="text"
                name="expiration-year"
                maxLength="3"
                size="3"
                id="cvcField"
                placeholder="e.g. 123"
                ref={cardCVC}
                onClick={clearField}
              />
            </div>
            <p className="error-message">
              {formErrors.cvcField !== ""
                ? errorsMessages[formErrors.cvcField]
                : ""}
            </p>
          </div>
        </div>
        <button type="submit" className="submit-btn">
          Confirm
        </button>
      </form>
    </section>
  );
}
