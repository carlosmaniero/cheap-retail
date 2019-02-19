# Welcome to Order Service

The Order Service is a REST API, where customer's orders are persisted and
it manages the order status.

# Endpoints

## POST `/customers/:customerId/orders/`

Creates an order for the `customerId`.

### Request Body

```json
{
  "items": [
    {
      "productName": "My Product",
      "price": "11.20",
      "weight": 2
    }
  ],
  "weight": 2,
  "client": {
    "firstName": "Carlos",
    "lastName": "Maniero"
  },
  "address": {}
}
```

## PUT `/customers/:customerId/orders/:id/status`

Updates the status based on a `customerId` and a order `id`.

### Request Body

```json
{
  "status": "string"
}
```

| Status             | Description                                                         |
|--------------------|---------------------------------------------------------------------|
| ORDERED            | The order was just made by the customer                             |
| READY_FOR_DELIVERY | The product is ready to be collected by delivery services companies |
| OUT_FOR_DELIVERY   | The product is arriving the customer's house                        |
| NOBODY_HOME        | The delivery service did't found the customer at their home.        |
| DELIVERED          | The product was delivered.                                          |

## GET `/customers/:customerId/orders/`

It returns all the orders given a `customerId`.


# Disclaimer

This is a hypothetical is part of the article "Agile practices on legacy code".
