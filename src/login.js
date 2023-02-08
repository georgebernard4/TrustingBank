import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext} from './index.js';
import {Card} from './card.js';
export function Login(){
  
  //holds input values
  const [ nameEmail, setNameEmail]          = useState('');
  const [ password,  setPassword]           = useState('');
  //sets Error message which appear below
  const [ statusError,   setStatusError]            = useState('');
  //sets Success Message
  const [sMessage, setSMessage]        = useState('');
  //keeps track of latest timeoutID to avoid overlapping timeouts
  const [ timeoutID, setTimeoutID]          = useState(0);
  //accepts data for 1 user at login
  const [ data,      setData]               = useState({});
  const location = useLocation();
  const ctx = useContext(UserContext);
 // console.log(ctx)
 //  console.log('status: ' + statusError) 
 
 //reRenderNav sets nav's loggin/out boolean
 let reRenderNav = ctx.tools.updateNavbar;   
 
 //handling sign out when navbar button is pressed, and already on login route
 //if location.state is falsy nav sign-out but hasn't been hit away from login yet
useEffect(() =>{
  console.log('useEffect to handle sign-Off Button triggered away from login route')
  // let navLoggedOut = location.state ? location.state.navLoggedOut : false;
  // console.log('navLoggedOut',navLoggedOut); 
  // if( navLoggedOut) handleSignOut();
  if(location.state) handleSignOut();
},[location.state && location.state.navLoggedOut])

//handling just created account
if(ctx.status.justCreatedFlag === true) fromCreate();
function fromCreate(){
  ctx.status.justCreatedFlag = false;
  setNameEmail(ctx.status.tempEmail);
  setPassword(ctx.status.tempPassword);
}

 function clearForm(){
    setNameEmail('');
    setPassword('');
    setStatusError('')
  }

  function handleSignOutClear(){
    setNameEmail('');
    setPassword('');
    ctx.activeUser = {};
    ctx.status.loggedIn = false;
    ctx.status.tempName = '';
    ctx.status.tempEmail= '';
    ctx.status.recentSignOut = false;
    setSMessage('');
    reRenderNav(false);
  }

  function handleSignOut(){
    setNameEmail('');
    setPassword('');
    ctx.status.loggedIn = false;
    ctx.status.tempName = ctx.activeUser.name;
    ctx.status.tempEmail= ctx.activeUser.email;
    ctx.activeUser = {};
    setSMessage(`Thanks for using Bad Bank ${ctx.status.tempName}.
    you have successfully signed-out!`);
    ctx.status.recentSignOut = true;
    reRenderNav(false);
  }
  //passing sign-out function to navbar to use when button clicked away from navpage
  if(ctx.tools.signOut === null){
    ctx.tools.signOut = handleSignOut;
  }

  function handleSignBackIn(){
    setNameEmail(ctx.status.tempEmail);
    setPassword('');
    ctx.activeUser = {};
    ctx.status.loggedIn = false;
    ctx.status.tempName = '';
    ctx.status.tempEmail= '';
    ctx.status.recentSignOut = false;
    setSMessage('');
  }

  function tempErrorMessage( errorMsg, displayTime = 3000){
    setStatusError(errorMsg);
    clearTimeout(timeoutID);
    setTimeoutID(setTimeout( ()=> setStatusError(''), displayTime));
  }

  function check4Empty(field, label){
    //checking if field is empty
    if( !field){
      let errorMsg = 'Error: No ' + label + ' given';
      tempErrorMessage(errorMsg);
      return false;
    }
    return true;
  }

  function handleSignIn(){
    console.log(nameEmail,password);
    
    if( !check4Empty(nameEmail, 'name or email')){         return;}
    if( !check4Empty(password, 'password')){               return;}
    
    console.log('Attempting Login: ', nameEmail, '-', password)
    const url = '/account/login/' + nameEmail +'/' +password;
    let message = '';
    (async () => {
      var res  = await fetch(url);
      var dataX = await res.json();
      
      console.log('dataX: ', dataX);
      console.log('typeof(dataX): ', typeof (dataX));

      let logsuccess = dataX['logsuccess'];
      console.log(`here's the logsuccess ${logsuccess}`);
      let message = dataX.message;
      console.log(`message ${message}`);
      if( !logsuccess){
        tempErrorMessage(message);
        return;
      }else{
        //ctx is context used across pages, userData labeled in non-public index.js file
        ctx.activeUser = dataX.userData;
        ctx.status.loggedIn = true;
        ctx.status.tempName = ctx.activeUser.name;
        ctx.status.tempEmail= ctx.activeUser.email;
        setSMessage(message);
        ctx.status.recentSignOut = false;
        //session history started in context (to be added later)
        
        // //recording session history locally
        // let nameX = user['name'];
        // //ctx.history.push('Login: loginID = ' + user.userID  );
        // let userID = user.userID;
        // let type = 'login';
        // let data = null;
        // ctx.history.push({userID, type, data});
        // return;
        reRenderNav(true);
      }
    })();
  }
  


  let recentSignOut = ctx.status.recentSignOut;
  let loggedIn      = ctx.status.loggedIn;
  console.log(`determining show ... 
  recentSignOut: ${recentSignOut}
  loggedIN: ${loggedIn}
  `)
  let show          = !recentSignOut && !loggedIn;
  console.log('show: ', show)

  let xHeader ='Account Login';
  let userNameHeader = '';
  if( loggedIn){
    xHeader = `signed on as `;
    userNameHeader = ctx.activeUser.name;
  } else{
    if(recentSignOut){
      xHeader = `signed off as `;
      userNameHeader = ctx.status.tempName;
    }
  }
  function LogInSignOutMessages(){
   console.log(`inside LOGInSignOutMessages - value of ctx.status.loggedIn: ${ctx.status.loggedIn}`);
    let loggedInX = ctx.status.loggedIn;

    return(
      <>
     {loggedInX ? <>
      <h5>{sMessage}</h5>
      <br/>
      <button type="submit" className="btn btn-light"
      onClick={handleSignOut}
      >
        Sign-Out 
      </button>
      <br/>
      <br/>
      <button type="submit" className="btn btn-light"
      onClick={handleSignOutClear}
      >
        Sign-Out <br/>
        and <br/>
        login to another account
      </button>

      </>


:(
  <>
      <h5>{sMessage}</h5>
      <br/>
      <button type="submit" className="btn btn-light"
      onClick={handleSignBackIn}
      >
        Sign Back In 
      </button>
      <br/>
      <br/>
      <button type="submit" className="btn btn-light"
      onClick={handleSignOutClear}
      >
        login to another account
      </button>

      </>
    )
  }
  </>
    )

  }
  
  function LoginHeader(){
    return(
      <>{xHeader} <i>{userNameHeader}</i>
      </>
      )
  }

  
  return(
    <>
    <Card
      bgcolor = "primary"
      // header  = {xHeader +'<i>' + userNameHeader+ '</i>'}
      header = <LoginHeader></LoginHeader>
      status  = {statusError}
      statusTxtColor="danger"
      body    = { show ? (
        <>
            Name or Email Address<br/>
            <input type="input" className="form-control" id=   "nameEmail"
              placeholder="Enter name or Email"                   value={nameEmail} 
              onChange={ e =>
                setNameEmail(e.currentTarget.value)}
                /><br/>
            Password<br/>
            <input type="input" className="form-control" id=    "password"
              placeholder="Enter password"               value= {password} 
              onChange={ e =>
                setPassword(e.currentTarget.value)}
                /><br/>
            <span>

            <button type="submit" className="btn btn-light" onClick={handleSignIn}>
              Sign in
            </button>&emsp;
            <button type="submit" className="btn btn-light" onClick={handleSignIn}>
              <a className="nav-link" href="#/CreateAccount/" >New Account<span className="sr-only"></span></a>
              </button>
            </span>

            <br/>
          </>
        ):(
         <>
          <LogInSignOutMessages></LogInSignOutMessages>
         </>
        )
        
        
      }
      
      
      />  
      
      </>
  )
}