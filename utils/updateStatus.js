const axios = require('axios');

const updateStatus = (order, newStatus) => {
  if (order.status === undefined) {
    order.status = 'ORDERED';
  }

  if (order.status === 'ORDERED' && newStatus === 'READY_FOR_DELIVERY') {
    order.status = newStatus;

    if (order.weight <= 1) {
      sendToPostalService(order);
    } else {
      sendToCheapexService(order);
    }
  }

  if ((order.status === 'READY_FOR_DELIVERY' || order.status === 'NOBODY_HOME') && newStatus === 'OUT_FOR_DELIVERY') {
    order.status = newStatus;
  }

  if (order.status === 'OUT_FOR_DELIVERY' && newStatus === 'NOBODY_HOME') {
    order.status = newStatus;
  }

  if (order.status === 'OUT_FOR_DELIVERY' && newStatus === 'DELIVERED') {
    order.status = newStatus;
  }
}

const sendToPostalService = (order) => {
  axios.post('http://myfakepostalservice.com/request-shipment/', {
    from: 'Cheap Retail',
    to: order.client.lastName + ', ' + order.client.firstName,
    address: order.address
  }, { authKey: 'AS*&DY*&ASHJ7712JKSDN' });
}

const sendToCheapexService = (order) => {
  axios.post('http://myfakepostalservice.com/request-shipment/', {
    from: 'Cheap Retail',
    to: order.client.lastName + ', ' + order.client.firstName,
    address: {...order.address, deliveryTries: 3}
  }, { customerAuthKey: '**&D*SAJJUU*(SA*&D&HJN)' });
}

module.exports = {updateStatus}
