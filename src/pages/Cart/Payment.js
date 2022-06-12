import React from "react";
import GooglePayButton from '@google-pay/button-react';

function Payment(props) {

  function paymentHandler() {
    //event.preventDefault();
    
    props.onPay();
  }
  console.log(props.orderData);
  return (
    <div>
      Do zapłaty: {props.orderData.orderValue} zł
      
      <br />
      Wybierz metodę płatności:

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
        
        onLoadPaymentData={paymentRequest => {
          console.log(paymentRequest);
        }}
        
        onPaymentAuthorized={paymentData => {
          console.log(paymentData);
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