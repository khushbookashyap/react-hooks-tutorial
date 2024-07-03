import './App.css';
import React, { useState,useEffect, useContext, useReducer, useRef } from 'react';

const ReactContext = React.createContext(); 
const intialCounter = {
  counterValue :0
}

const counterReducer= (state, action) => {
  if(action.type === "increment"){
    return{
      ...state,
      counterValue : state.counterValue + 1
    }
  }else if(action.type === "decrement"){
    return{
      ...state,
      counterValue : state.counterValue - 1
    }
  }
}

function App() {
  const [colorState, updateColorState] = useState("blue"); 

  const [stateValue, updateStateValue] = useState(1); 
  const [objectStateValue , updateObjectState ] =  useState({
    property1:"property 1",
    property2 : "property 2"
  });

 const [counterState,dispatch ] = useReducer(
  counterReducer,
  intialCounter,
 )

  useEffect(()=> { // use effect will  be called when reload or rerendering happens
    console.log("useEffect");

    return () => {
      console.log("clean-up fnction");
    };
  },[stateValue] // this means that whenever state vlaue will change , this clean up will be called
  );

  const inputReference = useRef(null);

  useEffect(()=>{
  
    inputReference.current.focus();
  },[]);
  
  
  return (
    <div className="App">
     React Hooks Tutorial 

     <button onClick={()=>{
       updateStateValue(previousValue => {
        return previousValue + 1;
       });

     }}>+</button>
     {stateValue}


     <p>{objectStateValue.property1}</p>
     <p>{objectStateValue.property2}</p>

     <button onClick={()=> {
      updateObjectState((previousObjectValue)=>{
        return{...previousObjectValue,
          property1:"updated property 1"
        };
      });
     }
     }> update property 1</button>


      <button onClick={()=>{
        dispatch({type: "increment"})
        }}>Increment by useReducer</button>

      <button onClick={()=>{
        dispatch({type: "decrement"})
      }}>Decrement by useReducer</button>

      {counterState.counterValue}
     

    <ReactContext.Provider value ={colorState}>
     <NestedComponent/>
    </ReactContext.Provider>

    <button onClick = {()=>{
      if(colorState === "red"){
        updateColorState("blue");
      }else {
        updateColorState("red");
      }
      }
    }> change color</button>

    <div>
      <input
      ref = {inputReference} placeholder='this needs to be focused'></input>
    </div>

    </div>


    
  );
}

function NestedComponent(){
  const color = useContext(ReactContext);
  return (
    <div>
    <h3 style={{color}}>Nested Component</h3>
    </div>
  )
}

export default App;
