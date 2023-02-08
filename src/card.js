
import './card.css';

export function Card(props){
  function classes(){
    const bg  = props.bgcolor  ? ' bg-'   + props.bgcolor : ' ';
    const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
    return 'card mb-3 ' + bg + txt; 
  }
  let maximize = false;
  if( props.maximize !== undefined) maximize = props.maximize;
  
  // if( maximize)

  const statColor = props.statusTxtColor ? ' text-' + props.statusTxtColor: '';
  return (
    <div className={classes()} style={maximize ? { maxWidth:''} : { maxWidth: "18rem"}}>
      <div className="card-header">{props.header}</div>
      <div className="card-body">
        {props.title && (<h5 className="card-title">{props.title}</h5>)}
        {props.text  && (<p  className="card-text"> {props.text} </p>)}
        {props.body}
        {/* <div className="text-danger" >hello</div> */}
        {props.status && ( <div className={statColor} id='createStatus'>{props.status}</div> )}
      </div>
    </div>
  );
}

export default Card;
