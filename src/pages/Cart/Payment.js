import React from "react";
import GooglePayButton from '@google-pay/button-react';
import classes from './CartPage.module.css';

function Payment(props) {

  function paymentHandler() {
    props.onPay();
  }
  return (
    <div className={classes.payment}>
      <p>Do zapłaty:</p>
      <p className={classes.price}>{props.orderData.orderValue.toFixed(2)} zł</p>
      <p>Wybierz metodę płatności:</p>
      <GooglePayButton
        environment='TEST'
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: "CARD",
              parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["MASTERCARD", "VISA"]
              },
              tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                  gateway: "example",
                  gatewayMerchantId: "exampleGateMerchantID"
                }
              }
            }
          ],
          merchantInfo: {
            merchantId: "1234567890123",
            merchantName: "Cukiernia Słodzianki"
          },
          transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPriceLabel: "Total",
            totalPrice: props.orderData.orderValue.toString(),
            currencyCode: "PLN",
            countryCode: "PL"
          },
          shippingAddressRequired: false,
          callbackIntents: ["PAYMENT_AUTHORIZATION"]
        }}

        onPaymentAuthorized={paymentData => {
          paymentHandler();
          return { transactionState: 'SUCCESS' };
        }}
        
        existingPaymentMethodRequired='false'
        buttonColor="Black"
        buttonType="buy"
      >
      </GooglePayButton>
    </div>
  );
}

export default Payment;