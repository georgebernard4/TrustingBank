import { UserContext} from './index.js';
import {useContext} from "react";
import {Card} from './card.js';
import {dollarFormat} from './dollarFormat.js';
export function Balance(){
  const ctx = useContext(UserContext);
 let loggedIn  = ctx.status.loggedIn;
 if(loggedIn){
  if(ctx.activeUser === undefined || ctx.activeUser.balance === undefined){
    console.log('ERROR: Balance page found state loggedIn without ctx.activeUser.balance')
    loggedIn = false;
  }
 }
 let balance = ctx.activeUser.balance;
 
//history to be implemented
// let type = 'balanceShown';
// let data = {balance};
// ctx.history.push({userID, type, data});




  return(
    <>
    <Card
      bgcolor = "info"
      header  = "Balance"
      status  = ''
      statusTxtColor="danger"
      body    = { !loggedIn ?(
                             <>
                              <br/>
                                Please Login to see your balance.

                              <br/>
                              <button className={"btn btn-light"}>
                              <a className="nav-link" href="#/login/">Login</a>
                              </button>

                              <button className={"btn btn-light"}>
                              <a className="nav-link" href="#/CreateAccount/">Open a New Account<span className="sr-only"></span></a>
                              </button>
                            </>):(
                            <>
                                <h5>{'Current Balance: '} 
                                  
                                  <span className={(0 > balance) ? 'text-danger' : ''}> {dollarFormat(balance)} </span>
                                </h5>
                                <br/>
                            </>
                            )
   }
   />
    </>
  )
}