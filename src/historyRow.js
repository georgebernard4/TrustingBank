 //creates row of info user.history
 export function actionInfo(event, index){
  let amount  = 'none found';
  let balance = 'none found';
  let userID = event.userID;
  let type = event.type;
  if( 'data' in event){
    
    let data = event.data;
    if( 'amount' in data)  amount = data.amount;
    if( 'balance' in data) balance = data.balance;
  }
  let color = 'primary'
  let typedescr = 'unrecognized event type';
  switch (type){
    case 'login':        
      color = 'warning';
      typedescr = 'Login'
      break;
    case 'newUser':
       color = 'dark';
       typedescr = 'New User Created'
       break;
    case 'deposit':
       color = 'success';
       typedescr = 'Deposit';
       break;
    case 'withdraw':
       color = 'danger';
       typedescr = 'Withdrawal';
       break;
    case 'balanceShown': 
       color = 'info';
       typedescr = 'Balance Inquiry' 
       break;   
      }
      let colorClass = 'btn-' + color;
    
    console.log('colorClass: '      + colorClass);
    console.log('typedescr: '  + typedescr);
    console.log('index: '      + index);
    console.log('type: '       + type);
    console.log('balance: '    + balance);
    console.log('amount: '     + amount);
    //console.log('event.data.amount: ' + event.data.amount)
    //console.log('event.data.balance: ' + event.data.balance)

  }
  ////end actionInfo 
  function tester(userID, type, balance, amount, index){
    let hisObj = {userID, type};
    if( balance !== false || amount !== false){ 
      let data = {};
      if( balance !== false) data = {balance};
      if(amount !== false) data = { amount, ...data};
      hisObj = { data, ...hisObj}
    }
    let objString = JSON.stringify(hisObj);
    console.log('actionInfo(  ' + objString +'  , '+ index + ')')
    // console.log('actionInfo({ type:login, userID:0})');
    actionInfo( hisObj, index);
  }
 tester(0,'login',false,false,0);
  tester(7,'newUser',false,false,4);
  tester(6,'deposit',60,200,5);
  tester(5,'withdraw',100,-50,3);
  tester(4,'balanceShown',120,false,1);

