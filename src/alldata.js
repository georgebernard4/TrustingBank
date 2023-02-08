import {useEffect, useState} from "react";
export function AllData(){
  // const ctx =useContext(UserContext);
  const [data, setData] = useState('');
  useEffect(() => {
    //fetch all accounts from API
    fetch('/account/all')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setData(JSON.stringify(data));
    });
  }, []);
  
return (<>
  <h5>All Data in Store:</h5>
  {data}
</>);
}
//  Code from version without server
//   //creates row of info from user object
//   const userInfo = (user, index, color1, color2) => {
//     let userID = user.userID;
//     let name = user.name;
//     let email = user.email;
//     let password = user.password;
//     let balance = user.balance;
//     let color = index % 2;
//     let colorClass = color === 0 ?  'btn-' + color1 : 'btn-' + color2 ;

//     //return for user Info
//     return(
//       <>
//     <div className={"btn-group " + colorClass} role="group" aria-label="userinfo" key={index}>
//       <button type="button" className={"btn " + colorClass}  >{'userID: '   + userID}   </button>
//       <button type="button" className={"btn " + colorClass}  >{'name: '     + name }    </button>
//       <button type="button" className={"btn " + colorClass}  >{'email: '    + email }   </button>
//       <button type="button" className={"btn " + colorClass}  >{'password: ' + password }</button>
//       <button type="button" className={"btn " + colorClass}  >{'balance: '  + balance } </button>
    
//     </div>
//     <br/>
//       </>
//       // <li>{'userID: ' + userID + '  name: ' + name + '  email: ' + email + '  password: ' + password } </li>
//     )
//   }
// ////end userInfo

  
//   let users = ctx.users;
//   const userList = users.map( (userObj, index) =>
//   userInfo(userObj, index, 'light', 'secondary')
//   );
  
  
  
  
//   let activeUser = ctx.activeUser;
//   const aUCardBody = activeUser === null ? (
//     <div className="btn-group btn-danger" role="group" aria-label="activeUser" index={6} key={7}>
//       <button type="button" className="btn btn-danger" key={6} index = {7}>No one is currently logged in. </button>
      
//     </div>
//   ):(
    
//     userInfo( activeUser, 200, 'success', 'success')
//     )
    

//   //creates row of info user.history
// const actionInfo = (event, index) =>{
//   if(event === undefined) return;
//   let amount  = '';
//   let balance = '';
//   let userID = event.userID;
//   let type = event.type;
//   let data = event.data;
//   if( data !== null){
//     if( 'amount' in data)  amount = data.amount;
//     if( 'balance' in data) balance = data.balance;
//   }
//   let color = 'primary'
//   let typedescr = 'unrecognized event type';
//   switch (type){
//     case 'login':        
//       color = 'warning';
//       typedescr = 'Login'
//       break;
//     case 'newUser':
//        color = 'dark';
//        typedescr = 'New User Created'
//        break;
//     case 'deposit':
//        color = 'success';
//        typedescr = 'Deposit';
//        break;
//     case 'withdraw':
//        color = 'danger';
//        typedescr = 'Withdrawal';
//        break;
//     case 'balanceShown': 
//        color = 'info';
//        typedescr = 'Balance Inquiry' 
//        break;   
//       }
//       let colorClass = 'btn-' + color;
//    //return for actionInfo
//    return(
//     <>
//      <div className={"btn-group " + colorClass} role="group" aria-label="userinfo" key={index + 100}>
//      <button type="button" className={"btn " + colorClass} key={6} >{typedescr + '=>' }</button>
//      <button type="button" className={"btn " + colorClass} key={7} >{'userID: ' + userID} </button>
//     { amount !== '' && 
//     <button type="button" className={"btn " + colorClass} key={8} >{'Amount: ' + amount }</button>
//   }
//     { balance !== '' && 
//     <button type="button" className={"btn " + colorClass} key={9} >{'Balance: ' + balance }</button>
//   }
//   </div>
//   <br/>
//   </>
//     // <li>{'userID: ' + userID + '  name: ' + name + '  email: ' + email + '  password: ' + password } </li>
//     )
//   }
//   ////end actionInfo 
    
//   let history = ctx.history;
//   const hisList = history.map( (hisObj, index) =>
//     actionInfo( hisObj, index)
//   );
    
    
    
    
    
    
//   //  return for AllData 
//     return (
      
//       <>
//       {/* bootstrap button example */}
//       {/* {}
//     <div className="btn-group bg-danger" role="group" aria-label="Basic example">
//     <button type="button" className="btn btn-secondary">Left</button>
//     <button type="button" className="btn btn-secondary">Middle</button>
//     <button type="button" className="btn btn-secondary">Right</button>
//     </div>
//   <br/> */}
      
    
    
    
      
    
//       <Card 
//       bgcolor="primary"
//       txtcolor="white"
//       header=""
//       title="Active User:"
//       text=""
//       maximize = {true}
//       body={
//         (<>
//           {aUCardBody}
        
//         </> )
//         } 
        
//         />
    
//     <Card 
//       bgcolor="primary"
//       txtcolor="white"
//       header=""
//       title="User Information"
//       text=""
//       maximize = {true}
//       body={
//         (<>
//           {userList}
        
//         </> )
//         } 
        
//         />

//     <Card 
//       bgcolor="primary"
//       txtcolor="white"
//       header=""
//       title="User History"
//       text=""
//       maximize = {true}
//       body={
//         (<>
//           {hisList}
        
//         </> )
//         } 
        
//         />

        
    
    
    
    
//     {/* <div>{JSON.stringify(ctx)}</div> */}
//     {/* <div>ctx.history</div> */}
//     {/* <h2>ctx.history[0]:</h2>
//     <div>{JSON.stringify(ctx.history[0])}</div>
//     <h2>ctx.history[1]:</h2>
//     <div>{JSON.stringify(ctx.history[1])}</div>
//     <h2>ctx.history[2]:</h2>
//     <div>{JSON.stringify(ctx.history[2])}</div> */}
    
//     {/* {ctx.history.length > 0 && <div>{actionInfo(ctx.history[0])}</div>} */}
    
//     {/* {actionInfo(ctx.history[0],9)} */}
    
//     </>
    
    
    
    
    
    
    
    
//     )
//   // end of all data  
//   }