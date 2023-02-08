import {Card} from './card.js';
export function Home(){
  
  return (
    <Card 
      bgcolor="primary"
      txtcolor="white"
      header="We trust You Bad Bank Landing Page"
      title="Welcome to the bank"
      text="You can use this bank"
      body={
        (<>
        Zero security
        <br/>
        fictitious balances.
        <br/>
        Bad Bank is Right For You!
        { <img src={process.env.PUBLIC_URL + '/bank.png'} className = "img-fluid" alt="Classically Pillared Bank"/>}
        </> )
        } 
     
    />
  );
}