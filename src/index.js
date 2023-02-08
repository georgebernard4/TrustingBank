import React, { createContext } from 'react';//useEffect, useState, 
import ReactDOM from 'react-dom';
import { HashRouter, Route, Routes} from 'react-router-dom';//useHistory, useLocation, Link 
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {NavBar} from './navbar.js';
import {Home} from './home.js';
import {CreateAccount} from './createaccount.js';
import {AllData   } from './alldata.js';
import {Balance }from './balance.js';
import {Deposit }from './deposit.js';
import {Withdraw }from './withdraw.js';
import {Login }from './login.js';
// import Card from './card.js';
// import dollarFormat from './dollarFormat.js';
export const UserContext = createContext(null);


function Spa(){
  
  return (
    <HashRouter>
      <UserContext.Provider value={{
        status: {
          loggedIn:false,
          clickedSignOut:false,
          recentSignOut:false, 
          tempName:'',
          tempEmail:'',
          tempPassword:'',
          awaitingServer: { flag: false,
            inputs: [],
            from: null,
            done: false
            
          }
        },
        accounts:null, 
        //activeUser:{name:'George',email:'george@mit.edu',password:'secret',balance:100}, //for testing
        activeUser:null,
        history:[],
        tools: {
          updateNavbar:  ()=>{return;},
          signOut: null
        }
      }}>
        <NavBar  />
        <Routes>  
        <Route path="/"     exact     element={<Home/>}          />
        <Route path="/home"           element={<Home/>}          />
        <Route path="/CreateAccount/" element={<CreateAccount/>} />
        <Route path="/alldata/"       element={<AllData/>}       />
        <Route path="/balance/"       element={<Balance/>}       />
        <Route path="/deposit/"       element={<Deposit/>}       />
        <Route path="/withdraw/"      element={<Withdraw/>}      />
        <Route path="/login/"         element={<Login/>}         />
        </Routes>
        </UserContext.Provider>
        </HashRouter>
  
  );

}

ReactDOM.render(
  <React.StrictMode>
    <Spa />
  </React.StrictMode>,
  document.getElementById('root')
);
