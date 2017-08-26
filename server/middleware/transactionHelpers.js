var db = require('../../database/index.js')
var stripe = require('stripe')(
  "sk_test_J9JR0cXKMJL61WGB8O0CWgfG"
);

module.exports.createTransferToPassPass = (data, callback) => {
  console.log(data, '234234');
  var passInfo = data;
  var profileData = data.profileData;

  var amount = passInfo.amount * 100;
  var merchantAcct = db.getMerchantAcctNum(passInfo.email);
  stripe.charges.create({
    amount: 100,
    currency: "usd",
    source: "tok_visa",
    destination: {
      amount: amount,
      account: "sk_test_J9JR0cXKMJL61WGB8O0CWgfG",
    },
  }).then(
    function (charge) {
      console.log('promise activates')
      stripe.transfers.create ( {
        amount: amount,
        currency: "usd",
        destination: merchantAcct,

    }, function (err, transfer) {
      if(err) {
        callback(err, null);
      }
      callback(null, transfer);
    });
  })

}


// module.exports.getTransactions = (userId) => {
//   stripe.accounts.retreive(userId, (err, account) => {
//
//   })
// }
