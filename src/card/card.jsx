import { useState } from "react"
import { useEffect } from "react"
import Cards from "react-credit-cards-2"
import { Link } from "react-router-dom"
import "./card.css"
const token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDFiM2QzM2EyOTM3NDAwMWRlNGUyNWQiLCJpYXQiOjE2Nzk1NDUzOTIsImV4cCI6MzQ3OTU0NTM5MiwidHlwZSI6ImFjY2VzcyJ9.gYgqsR5S3TPzmvsgczG5lmbaq1VzTZRld6pY-WUyBRQ"
//const token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDFjYjE4ZTdkMWEzNjAwMWVkYjQxNzkiLCJpYXQiOjE2Nzk2MDI0NjEsImV4cCI6MzQ3OTYwMjQ2MSwidHlwZSI6ImFjY2VzcyJ9.EVRoO4wZm4Tje1J8BaPdPByM2ZbUNnvjrlVKeTJ46gU"
const UserCard=()=>{
    const[cc,setcc]=useState([])
    const [state, setState] = useState({
        cardNumber: '',
        cardExpiration: '',
        cvc: '',
        cardHolder: '',
        focus: '',
        category:" ",
      });
      //fetch
       async function fe(){
       let data = await fetch('https://interview-api.onrender.com/v1/cards', { 
            method: 'get', 
            headers: new Headers({
                'Authorization': `Bearer ${token}`, 
            }), 
        });

        let dd= await data.json()
        
        setcc(dd.results)
    }
    useEffect(()=>{fe()},[])
     console.log(cc)
     console.log(cc.length)
    return(
        <>
        
         <h1 id="top">Hey..! Your all Cards are here ...!!</h1>
         <button id="new-card-button"><Link to="/new/card" id="l1">New Card</Link> </button>
        {
          cc.length!==0 && cc.length<11 && cc.map((value,key)=>{
            return(
                <div id="card-main"> 
                <ul key={key} id="ul" type="none">
                 <li>  <Cards
                   number={value.cardNumber}
                    expiry={value.cardExpiration}
                    name={value.cardHolder}
                 /></li>
                 <div className="cards1">
                   <div className="card1">
                   <li>{value.name}</li>
                    <li>{value.cardNumber}</li>
                    <li id="cate">{value.category}</li>
                    <div id="cvc">
                    <li>  Enter your CVC</li>
                    </div>
                    
                   </div>
                   </div>
                </ul>
                </div>
            )
                
            })
        }
      
        </>
    )
}
export default UserCard