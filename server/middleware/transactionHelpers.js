var db = require('../../database/index.js')
var stripe = require('stripe')(
  "sk_test_J9JR0cXKMJL61WGB8O0CWgfG"
);

module.exports.createTransferToPassPass = (data, callback) => {
  console.log(data, '234234');

  var passInfo = data;
  var profileData = data.profileData;

  var amount = passInfo.amount * 100;
  db.getMerchantAcctNum(passInfo.email, (err, res) => {
    console.log(res)
    stripe.charges.create({
      amount: amount,
      currency: "usd",
      source: data.source,
      destination: {
        amount: amount,
        account: res,
      },
    }).then(
      function (charge) {
        console.log(charge.destination, 'promise activates')
        stripe.transfers.create ( {
          amount: amount,
          currency: "usd",
          destination: charge.destination,

        }, function (err, transfer) {
          if(err) {
            callback(err, null);
          }
          callback(null, transfer);
        });
      })

    })




}


// module.exports.getTransactions = (userId) => {
//   stripe.accounts.retreive(userId, (err, account) => {
//
//   })
// }
