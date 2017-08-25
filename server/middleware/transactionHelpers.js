var stripe = require('stripe')(
  "sk_test_J9JR0cXKMJL61WGB8O0CWgfG"
);

module.exports.createTransferToPassPass = (data, cb) => {
  stripe.transfers.create ( {
    amount:'' ,
    currency: "usd",
    destination: "data.merchant_acct",
    transfer_group: "data.userId"
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
