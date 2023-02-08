// import React, { useState, useContext, useEffect } from "react";
import React, { useState, useContext} from "react";
import { useLocation, Navigate } from "react-router-dom";
import { UserContext} from './index.js';
export function NavBar(){
 const [ loggedInZ, setLoggedInZ]  = useState(false);
  const ctx = useContext(UserContext);
  const location = useLocation();
  //trigger to re-render navbar, always from the login page
  // useEffect( setLoggedInZ(ctx && ctx.activeUser && ctx.activeUser.loggedIn),
  //   [ ctx && ctx.activeUser && ctx.activeUser.loggedIn]);
  //creating hoverOver messages
  let hoverH = 'Welcome & learn a little about Bad Bank';
  let hoverC = 'create a new account\n and receive $100 credit';
  let hoverL  = 'acess your account'; 
  let hoverD  = 'add to your account'; 
  let hoverW  = 'take money out of your account'; 
  let hoverB  = 'check the balance of your account'
  let hoverA  = 'see all the info we\'re storing'
  
  const handleSignOBut = () => {
    console.log('signOut Nav button pressed');
    console.log('location.pathname: ' + location.pathname);
    if(location.pathname === "/login/"){
      console.log('executing signout from loggin')
      ctx.tools.signOut();
    }else{ 
      console.log('executing signout AWAY from loggin')
      //toggling location.state.navLoggedOut, the locaction.state is added to the condition to ensure functionality when the location.state initializes without a navLoggedOut field
      let newNavLoggedOut = !(location.state && location.state.navLoggedOut);
      console.log('navigating from navbar, with location.state.navLoggedOut = ' , newNavLoggedOut);
      Navigate( { 
        pathname:"/login/", 
         state:{ navLoggedOut: newNavLoggedOut}
      });
    }
  };
  
  //disabling buttons if not logged in
 // console.log('loggedInZ: ',loggedInZ)
  let userName = '';
  let disabledHover = '';
  let disabledHoverLable = 'login to access'
  let disabler      = '';
  if(loggedInZ){
    userName = ctx.activeUser.name ||''; 
  }else{
    disabler = ' disabled';
    hoverD=hoverW=hoverB= disabledHover;
    disabledHover = disabledHoverLable;
  }
  
  return(
    <>
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="container-fluid">
      <a className="navbar-brand" href="#/home/" title={hoverH} >Trusting Bank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
        <li className="nav-item">
          <a className="nav-link" href="#/CreateAccount/" title={hoverC}>Create Account<span className="sr-only"></span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#/login/" title={hoverL}>Login</a>
        </li>
        <li className="nav-item">
          <div className="container-fluid" title={'login to access'}>

          <a className= {"nav-link" + disabler} href="#/deposit/" title={hoverD}>Deposit</a>
          </div>
        </li>
        <li className="nav-item">
          <div className="container-fluid" title={'login to access'}>
          <a className={"nav-link" + disabler} href="#/withdraw/" title={hoverW}>Withdraw</a>
          </div>
        </li>
        <li className="nav-item">
          <div className="container-fluid" title={'login to access'}>
          <a className={"nav-link"  + disabler} href="#/balance/" title={hoverB}>Balance</a>
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#/alldata/" title={hoverA}>All Data</a>
        </li>
        <li className="nav-item">
          {loggedInZ ? <a className="nav-link" onClick={handleSignOBut} title={'sign out'}>Sign Out</a> 
          : <a className="nav-link" href="#/login/" onClick={handleSignOBut} title={'sign in'}>Sign In</a> }
        </li>
      </ul>
          {!loggedInZ ?  <span>
            <div className="btn btn-sm btn-danger font-italic text-right" >Signed Out</div>
        
          </span>  
          : <span>
            <div className="btn btn-sm btn-success font-italic text-right" >Signed In:</div>
            <button className="btn btn-sm green font-weight-bold text-left" >{userName}</button>
          </span> 
            }
    </div>
  </div>
</nav>
       

    
    
    </>
  );
}