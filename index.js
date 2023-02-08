

var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');

app.use(cors());


//used to serve static files from public directory
app.use(express.static('build'));

// create user account

app.get('/account/create/:name/:email/:password', function (req, res){
  // else create user
  dal.create(req.params.name, req.params.email, req.params.password).
    then((user) => {
      console.log(user);
      res.send(user);
    });
});


//all accounts

app.get('/account/all', function(req, res) {

  dal.all().
    then((docs) => {
      console.log(docs);
      res.send(docs);
    });
});

// deposit into user account
app.get('/account/deposit/:email/:password/:amount', function (req, res){
  dal.findByEmail(req.params.email).
    then( (emailArray) => checkAccountOperation(req.params.email, emailArray, req.params.password, req.params.amount, 'deposit')).
    then( (answerArray) => {
      let [ approved, rejectReason, balance, counterOffer] = answerArray;
        if(!approved){
          if( rejectReason === null){
            //balance is a message for unapproved transactions
             return Error(balance);}else{
              console.log(answerArray);
              return res.send( answerArray);
             }
        }else{
        
            
            dal.updateBalance(req.params.email, balance).catch( Error(`Failed to update account balance for email: ${req.params.email}`))
            return res.send(answerArray);
          
         } 
    })
});

// withdraw from user account
app.get('/account/withdraw/:email/:password/:amount', function (req, res){
  dal.findByEmail(req.params.email).
    then( (emailArray) => checkAccountOperation(req.params.email, emailArray, req.params.password, req.params.amount, 'withdraw')).
    then( (answerArray) => {
      let [ approved, rejectReason, balance, counterOffer] = answerArray;
        if(!approved){
          if( rejectReason === null){
            //balance is a message for unapproved transactions
             return Error(balance);}else{
              return res.send( answerArray);
             }
        }else{
        
            console.log('balance: ' , balance ,' being put into updateBalance')
            dal.updateBalance(req.params.email, balance).catch( Error(`Failed to update account balance for email: ${req.params.email}`))
            return res.send(answerArray);
          
         } 
    })
});

// check balance
app.get('/account/balance/:email/:password/', function (req, res){
  dal.findByEmail(req.params.email).
    then( (emailArray) => checkAccountOperation(req.params.email, emailArray, req.params.password, 0, 'balance')).
    then( (answerArray) => {
      let [ approved, rejectReason, balance, counterOffer] = answerArray;
        if(!approved){
          if( rejectReason === null){
            //balance is a message for unapproved transactions
             return Error(balance);}else{
              return res.send( answerArray);
             }
        }else{
            return res.send(answerArray);         
         } 
    })
});


//login (nameEmail, password) => (T,userInfo,welcomeMsg) or (F,{},errorMsg) 
//  assumes users have unique emails
// if multiple users have same name, the email must be used to login, even if password matches
app.get('/account/login/:nameEmail/:password/', function(req, res){
  dal.all().
    then((docs) => {
      let nameEmail = req.params.nameEmail;
      console.log('name/email inputed into login:' , nameEmail);
      let passwordEntry = req.params.password;
      console.log('password inputed into login:' , passwordEntry);
      let customerlist = docs;
      console.log('customer list: ', customerlist);
      let userFound = false;
      let userIndex = NaN;
      let nameMatches = [];
      let messageToUser ='';
      let customer = {};
      let passwordMatch = false;
      let name = '';

      //ID user
        //checking for matching email address
        console.log(`customerlist: ${customerlist}`)
      for( let i = 0; i < customerlist.length && !userFound; i++ ){
        console.log('Inside for loop: i = ', i)
        customer = customerlist[i];
        console.log(`customer: ${JSON.stringify( customer)}`)
        let email    = customer.email;
            name     = customer.name;
        if( nameEmail === email){
          userFound = true;
          userIndex = i;
          break;
        }
        if( name === nameEmail){
          nameMatches.push(i);
          console.log('named matched')
          console.log(`name: ${name}
         nameEmail: ${nameEmail} `)
        }
      }
        //checking for matching name, that is unique account name
      if( !userFound){
          if(nameMatches.length === 1){
            userFound = true;
            userIndex = nameMatches[0];
            customer = customerlist[ userIndex];
            name = customer.name;
          } else{

            if(nameMatches.length > 1){
              messageToUser = `Login Failed: Multiple users are named '${nameEmail}'.
              Please use your email address to login.` ;
            } else{
              messageToUser = `Login Failed: Name or email, '${nameEmail}' not found.` ;
            }
          }

      }
      //checking password if user has been identified
      if( userFound){
        let customerPassword = customer.password;
        if( customerPassword === passwordEntry){
          passwordMatch = true;
          messageToUser = `Welcome to Bad Bank!` ;
        }else{
          messageToUser = `Login Failed: password incorrect`;
        }
      }
        if( !passwordMatch) customer = {};
      

        res.send({
          logsuccess : passwordMatch,
          userData   : customer,
          message    : messageToUser
        });
      })
    });




// Start the Express server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port', port);
});