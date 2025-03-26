import './App.css';
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Keeper from "./Keeper";
import notes from "./list";


function App() {
  const[button,buttMouse]=React.useState({fontSize: "1.1em"});
  const[inputbutton,inpbuttMouse]=React.useState({width: "36px",height: "36px",fontSize:"1.1em"});
  const[obj,inp]=React.useState({title:"",content:""});
  const[arr,sub]=React.useState([]);
  const[nt,setnt]=React.useState(notes);
  // const[trig,statetrigger]=React.useState(false);
  const[inputBar,inputBarVis]=React.useState(false);
  // const[edIndex,editNote]=React.useState(null);
  
  function mouseOver(){
    buttMouse({fontSize: "2.1em",color: "#6C6A64"});
  }
  function mouseOut(){
    buttMouse({fontSize: "1.1em",color:"black"});
  }
function inpmouseOver(){ //console.log("gliiter");
  inpbuttMouse({width: "72px",height: "72px",fontSize:"2.2em"});
}
function inpmouseOut(){
  inpbuttMouse({width: "36px",height: "36px",fontSize:"1.1em"});
}

  function inputButt(){
    return inputBarVis(true);
  }

  function textGrab(e){
      const x=e.target.value; //console.log(x);
      const y=e.target.name;
      inp(old=>{
      if(y==="input"){return({title:x,content:old.content});}
      if(y==="textarea"){return({title:old.title,content:x});}
    });
  }

  function textSubmit(){ 
    var x1=obj.title.trim(); var x2=obj.content.trim(); //console.log(x1+" "+x2);
    var time=new Date().toLocaleDateString()+new Date().toLocaleTimeString();
    if(x2!==""){ 
      if(x1==="") x1="Untitled"+time;
      const newArr=[...arr,{title:x1,content:x2}];
      sub(newArr); 
      setnt(old => [...old, {title:x1, content:x2}]);
      inp({title:"",content:""});
      inputBarVis(false);
      // statetrigger(e=>!e);
      
    }
    if(x1===""&&x2==="") inputBarVis(false);
    inpbuttMouse({width: "36px",height: "36px",fontSize:"1.1em"});
  }
  
  function deletenote(e){
    if(window.confirm("Delete This Note?")){
      setnt(old=>{
        var newNotes = [...old];
        newNotes.splice(e, 1); 
        return newNotes;
      });
    }
  }

  function extractF(e){
    // editNote(e);
    setnt(old=>{
      var newNotes = [...old];
      inp(newNotes[e] || { title: "", content: "" });
      newNotes.splice(e, 1); 
      return newNotes;
    });
    inputBarVis(true);

  }

  function f(e,index){
    return <Keeper key={index} heading={e.title} para={e.content} delButton={()=>deletenote(index)} extractingnote={()=>extractF(index)}/>
  }
  return (
    <div >
      <Header/>
      <h1><button className="buttoncs" style={button} onClick={inputButt} onMouseOver={mouseOver}onMouseOut={mouseOut}>+</button></h1>
    <div style={{position:"absolute"}}> 
      {inputBar&&(
        <form autoComplete="off">
          <input name="input" placeholder="What is it?" onChange={textGrab} value={obj.title} maxLength={70}></input>
          <textarea name="textarea" placeholder="Write your thoughts..." rows="3" className="webkitscroll"  onChange={textGrab} value={obj.content} />
          <button type="button" className="buttoncs" onClick={textSubmit} style={inputbutton} onMouseOver={inpmouseOver}onMouseOut={inpmouseOut}>+</button>
       </form>
      )} 
      
      {nt.map(f)}
    </div> 
      <Footer/>
     
    </div>
  );
}

export default App;
