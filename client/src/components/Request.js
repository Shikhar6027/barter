import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useLocation,useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
const Request = () => {
  const history = useHistory();
  const location = useLocation();
  const [view, setView] = useState([])
  const [exchangeObj_id, setExchangeObj_id] = useState();
  const requestedObj_id = location.state.id;
  
  const handleCall = async () => {
    
   // const res=await axios.get('/req', {params:{id:location.state.id}})
    try {
      console.log("hi");
      const res = await axios.get('/req');
    setView(res.data);
      
    } catch (error) {
      console.log(error);
    }
    

    
  }
  const handleClick = (e) => {
    setExchangeObj_id(e.target.value);

  }
  useEffect(() => handleCall(), []);
  
  const handleSubmit = async () => {
    
    try {
     await axios.post('/req', { exchangeObj_id, requestedObj_id })
      //console.log(res);
      history.push('/')
      
    } catch (error) {
      if (error.response.status === 501)
      {
        window.alert('This Item already traded');
        }
      console.log(error);
    }
    
  }

  console.log(location.state.id);
  return (
    <>
      <h1 style={{"text-align": "center"}}>Select Article you want to exchange...</h1>
      {console.log(view)}
      {view.map((article) => (<div style={{padding: "25px 50px 75px 100px"}}>
        <div className='container' key={article._id} style={{ border: "5px solid black", float: "left" }}>
          <input type="radio" value={article._id} onClick={handleClick} name="article" />
            <h2>{article.title}</h2>
            <img src={article.file_path} style={{height:"150px",width:"150px"}}/>
            <p>{article.desc}</p>
            <span className='badge badge-secondary p-2'>{article.owner}</span>
           
      </div>
        </div>
      ))}
    <div style={{position: "fixed", bottom: "-4px",right:"10px"}}> <button type="button" class="btn btn-outline-success" onClick={handleSubmit}>Submit</button></div> 
      
      
    
    </>
  )
}

export default Request;