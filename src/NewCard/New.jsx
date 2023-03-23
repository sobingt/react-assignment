import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import "./new.css"
import { Navigate, useNavigate } from 'react-router-dom';
//const token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDFiM2QzM2EyOTM3NDAwMWRlNGUyNWQiLCJpYXQiOjE2Nzk1NDUzOTIsImV4cCI6MzQ3OTU0NTM5MiwidHlwZSI6ImFjY2VzcyJ9.gYgqsR5S3TPzmvsgczG5lmbaq1VzTZRld6pY-WUyBRQ"
const PaymentForm = () => {
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
    category:''
  });
 const navigate=useNavigate()
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    const { cardExpiration, value1 } = evt.target;
    const { cardHolder, value2 } = evt.target;
    const { cardNumber, value3 } = evt.target;
    const { category, value4 } = evt.target;
    
    setState((prev) => ({ ...prev, [name]: value,[cardExpiration]:value1,[cardHolder]:value2,[cardNumber]:value3,[category]: value4 }));
  }

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  }

  const handler=async()=>{
    // let formdata=new FormData()
    // formdata.append("name",state.name)
    // formdata.append ("cardExpiration",state.expiry)
    // formdata.append ("cardHolder",state.name)
    // formdata.append ("cardNumber",state.number)
    // formdata.append('category', " ")
     fetch('https://interview-api.onrender.com/v1/cards', { 
        method: 'POST', 
        headers: {
            'Authorization': localStorage.getItem("jwt"), 

        },
        body: JSON.stringify({
            "name": state.name,
            "cardExpiration":state.expiry,
            "cardHolder" : state.name,
            "cardNumber" : state.number,
            "category" : " "
        })
    });
    navigate("/card")
    
  }
   
  return (
    <div id='PaymentForm'>
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      /> <br/> <br/>
      <form>
        <input className='input-box'
          type="number"
          name="number"
          placeholder="Card Number"
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input className='input-box'
          type="expiry"
          name="expiry"
          placeholder="Expiry"
          value={state.expiry}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input className='input-box'
          type="name"
          name="name"
          placeholder="Name"
          value={state.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
         <input className='input-box'
          type="cvc"
          name="cvc"
          placeholder="CVC"
          value={state.cvc}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        
        <button onClick={handler} id="new-card-submit">Submit</button>
      </form>
    </div>
  );
}

export default PaymentForm;