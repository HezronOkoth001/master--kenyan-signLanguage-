import React from "react";

const Payment = () => {
  const selectedService = JSON.parse(
    localStorage.getItem("selectedService")
  );

  return (
    <section className="payment-page">
      <div className="payment-container">

        <h1>Complete Your Booking</h1>

        {selectedService && (
          <div className="payment-service">

            <h2>{selectedService.title}</h2>

            <p>{selectedService.description}</p>

            <h3>{selectedService.price}</h3>

          </div>
        )}

        <div className="payment-method">

          <h2>Pay with M-Pesa</h2>

          <p>
            Enter your M-Pesa phone number and continue
            to complete your payment.
          </p>

          <input
            type="tel"
            placeholder="07XXXXXXXX"
          />

          <button className="mpesa-button">
            Pay with M-Pesa
          </button>

        </div>

      </div>
    </section>
  );
};

export default Payment;