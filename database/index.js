var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'pass_database'
});
 
connection.connect(
  function (err) {
    if (err) { console.log(err)
  }else{
    console.log('DATABASE CONNECTED')
  }
});


var create_users_table = 

CREATE TABLE users (
  id int PRIMARY KEY AUTO_INCREMENT,
  userName VARCHAR(50),
  password VARCHAR(50),
  salt VARCHAR(50),
  email VARCHAR(50),
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  phone VARCHAR(50),
  created_at DATE,
  updated_at DATE
  );


INSERT INTO users (
  userName,
  password,
  salt,
  email,
  first_name,
  last_name,
  phone,
  created_at,
  updated_at
  ) VALUES (
  'Kelly CM',
  'Svds356password1',
  'cPjfn67sdvfg456salt1',
  'billy@bob.com',
  'Kelly',
  'Cody-Martin',
  '3332224444',
  '2017-03-05',
  '2017-03-09'
  ), (
  'Brenda B.',
  'oniyGyf67password2',
  '8nJHBh665vhJhsalt2',
  'sally@sal.com',
  'Brenda',
  'Brenton',
  '1112224444',
  '2017-04-15',
  NULL),(
  'Hippo415',
  'Lcdf87gf8HJpassword3',
  'vByt76912salt3',
  'david45@gmail.com',
  'David',
  'Drummer',
  '9998887777',
  '2017-06-09',
  NULL
  );


CREATE TABLE sessions (
    id int PRIMARY KEY AUTO_INCREMENT,
    hash VARCHAR(100),
    user_id int,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );


INSERT INTO sessions (
    hash,
    user_id
  ) VALUES (
    'HASHcacfG65H78jkjIp0i',
    2
  ),( 
    'HASHacdnfd87v6bYT',
    1
  );


  CREATE TABLE reviews (
    id int PRIMARY KEY AUTO_INCREMENT,
    review_receiver_id int,
    review_giver_id int,
    transaction_type VARCHAR(20),
    rating_given float,
    comment_text VARCHAR(255),
    created_at DATE,
    updated_at DATE
  );



INSERT INTO reviews (
  review_receiver_id,
  review_giver_id,
  transaction_type,
  rating_given,
  comment_text,
  created_at,
  updated_at
  ) VALUES (
  2,
  1,
  'sale',
  5,
  'Amazing person to work with!',
  '2017-02-01',
  '2017-04-03'
  ), (
  3,
  1,
  'conversation',
  2.4,
  'Avoid them. They are super flaky.',
  '2017-04-21',
  NULL
  );

  CREATE TABLE for_sale_block (
    id int PRIMARY KEY AUTO_INCREMENT,
    pass_volume int,
    seller_id int,
    FOREIGN KEY (seller_id) REFERENCES users (id),
    current_price float,
    period_start DATE,
    period_end DATE,
    passes_sold int
  );


INSERT INTO for_sale_block (
    pass_volume,
    seller_id,
    current_price,
    period_start,
    period_end,
    passes_sold
  ) VALUES (
    15,
    2,
    8.90,
    '2017-04-11',
    '2017-04-30',
    4
  ), (
    9,
    2,
    9.00,
    '2017-05-03',
    '2017-06-01',
    1
  ), (
    11,
    1,
    10.00,
    '2017-03-03',
    '2017-03-15',
    1
  );


CREATE TABLE messages (
    id int PRIMARY KEY AUTO_INCREMENT,
    sender_id int,
    reciever_id int,
    time_sent DATETIME,
    text VARCHAR(255)
  );




INSERT INTO messages (
    sender_id,
    reciever_id,
    time_sent,
    text
  ) VALUES (
    1, 
    2, 
    '2017-05-06 11:12:13',
    'Hi, how are you doing?'
  ),  (
    2, 
    1, 
    '2017-05-06 11:12:45',
    'I\'m great! Do you have class passes?'
  ),  (
    1, 
    2, 
    '2017-05-06 11:13:40',
    'Absolutely!'
  ),  (
    3, 
    2, 
    '2017-02-05 15:40:01',
    'I\'d like to buy passes from you.'
  );

CREATE TABLE sold_passes (
    id int PRIMARY KEY AUTO_INCREMENT,
    seller_id int,
    FOREIGN KEY (seller_id) REFERENCES users (id),
    buyer_id int,
    notes VARCHAR(255),
    sell_date DATE
  );


INSERT INTO sold_passes (
    seller_id,
    buyer_id,
    notes,
    sell_date
  ) VALUES (
    1,
    2,
    'Easy to work with',
    '2017-02-05'
  ),(
    3,
    2,
    NULL,
    '2017-07-12'
);


CREATE TABLE restricted_list (
    id int PRIMARY KEY AUTO_INCREMENT,
    studio VARCHAR(255),
    user_id int,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );


INSERT INTO restricted_list (
    studio,
    user_id
  ) VALUES (
    'C.C. Cycling',
    2
  ), (
    'Edmond Climbing, Gold Gym',
    1
  );





CREATE TABLE restricted_studios (
    block_id int,
    FOREIGN KEY (block_id) REFERENCES for_sale_block (id),
    exempt_studio_id int,
    FOREIGN KEY (exempt_studio_id) REFERENCES restricted_list (id)
  );

INSERT INTO restricted_studios (
    block_id,
    exempt_studio_id
  ) VALUES (
    1,
    2
  );


 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
connection.end();