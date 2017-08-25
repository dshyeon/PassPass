var stripe = require('stripe')(
  "sk_test_J9JR0cXKMJL61WGB8O0CWgfG"
);

module.exports.createTransferToPassPass = (data, cb) => {
  stripe.transfers.create ( {
    amount:'' ,
    currency: "usd",
    destination: "acct_1032D82eZvKYlo2C",
    transfer_group: "ORDER_95"
  }, function (err, transfer) {
    // asynchronously called
    if(err) {
      callback(err, null);
    }
    callback(null, transfer);
  });
}

module.exports.getTransactions = (userId) => {
  stripe.accounts.retreive(userId, (err, account) => {

  })
}
