import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

const Notification = () => {
    const history = useHistory();
  const [arrayObj, setArrayObj] = useState([]);
  const handleEffect = async () => {
    try {
      const res = await axios.get('/notification');
    
      setArrayObj(res.data);
      console.log(res.data);

    } catch (error) {
      console.log(error);
    }
  }
    useEffect(() => handleEffect(), []);
    const handleClick = async (e,exchangeObj_id,requestedObj_id,_id) => {
        const name = e.target.name;
        try {
            await axios.post('/notification', { exchangeObj_id, requestedObj_id,_id ,name});
            console.log("hi");
            history.push('/');
        } catch (error) {
            console.log(error);
        }
        
    }
  return (
    <>
      
        {
          arrayObj.map((ele) => (<>
          <h1>product offered in exchange</h1>
      < div className="container pb50">
        <div class="row">
            <div class="col-md-9 mb40">
                {/* <article> */}
               
              <img src={`/${ele.exchangeObj_id.file_path}`} style={{ height: "150px", width: "150px" }}/>
                        {console.log(ele.exchangeObj_id.file_path)}
                <div className="post-content">
                            <h3>{ ele.exchangeObj_id.title}</h3>
                    <ul className="post-meta list-inline">
                        <li className="list-inline-item">
                                    <i className="fa fa-user-circle-o"></i> <a href="#">{ele.exchangeObj_id.owner}</a>
                        </li>
                        <li className="list-inline-item">
                                    <i className="fa fa-calendar-o"></i> <a href="#">{ele.exchangeObj_id.createdAt}</a>
                        </li>
                        {/* <li className="list-inline-item">
                            <i className="fa fa-tags"></i> <a href="#">Bootstrap4</a>
                        </li> */}
                    </ul>
                   
                            <p className="lead">{ele.exchangeObj_id.desc}</p>
                  
                    <ul className="list-inline share-buttons">
                        <li className="list-inline-item">Share Post:</li>
                        <li className="list-inline-item">
                            <a href="#" className="social-icon-sm si-dark si-colored-facebook si-gray-round">
                                <i className="fa fa-facebook"></i>
                                <i className="fa fa-facebook"></i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="#" className="social-icon-sm si-dark si-colored-twitter si-gray-round">
                                <i className="fa fa-twitter"></i>
                                <i className="fa fa-twitter"></i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="#" className="social-icon-sm si-dark si-colored-linkedin si-gray-round">
                                <i className="fa fa-linkedin"></i>
                                <i className="fa fa-linkedin"></i>
                            </a>
                                </li>
                                <li className="list-inline-item">
                            
                        </li>
                    </ul>
                
                    
                  
                  
                </div>
                

            </div>
           
        </div>
      </div>
        <hr />
        <h1>Your Requested Product</h1>
       < div className="container pb50">
        <div class="row">
            <div class="col-md-9 mb40">
                {/* <article> */}
               
              <img src={`/${ele.requestedObj_id.file_path}`} style={{ height: "150px", width: "150px" }} />
                        {console.log(ele.requestedObj_id.file_path)}
                <div className="post-content">
                            <h3>{ ele.requestedObj_id.title}</h3>
                    <ul className="post-meta list-inline">
                        <li className="list-inline-item">
                                    <i className="fa fa-user-circle-o"></i> <a href="#">{ele.requestedObj_id.owner}</a>
                        </li>
                        <li className="list-inline-item">
                                    <i className="fa fa-calendar-o"></i> <a href="#">{ele.requestedObj_id.createdAt}</a>
                        </li>
                        {/* <li className="list-inline-item">
                            <i className="fa fa-tags"></i> <a href="#">Bootstrap4</a>
                        </li> */}
                    </ul>
                   
                            <p className="lead">{ele.requestedObj_id.desc}</p>
                  
                    <ul className="list-inline share-buttons">
                        <li className="list-inline-item">Share Post:</li>
                        <li className="list-inline-item">
                            <a href="#" className="social-icon-sm si-dark si-colored-facebook si-gray-round">
                                <i className="fa fa-facebook"></i>
                                <i className="fa fa-facebook"></i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="#" className="social-icon-sm si-dark si-colored-twitter si-gray-round">
                                <i className="fa fa-twitter"></i>
                                <i className="fa fa-twitter"></i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="#" className="social-icon-sm si-dark si-colored-linkedin si-gray-round">
                                <i className="fa fa-linkedin"></i>
                                <i className="fa fa-linkedin"></i>
                            </a>
                                </li>
                                <li className="list-inline-item">
                            {/* <button type="button" class="btn btn-outline-success" onClick={handleClick}>Request</button> */}
                        </li>
                    </ul>
                <button type="button" name="ACCEPT" class="btn btn-outline-success" onClick={(e)=>handleClick(e,ele.exchangeObj_id,ele.requestedObj_id,ele._id)}>Accept</button>
                <button type="button" name="REJECT" class="btn btn-outline-danger" onClick={(e)=>handleClick(e,ele.exchangeObj_id,ele.requestedObj_id,ele._id)}>Reject</button>
                    
                  
                  
                </div>
                

            </div>
           
        </div>
    </div>
        </>))}
        
      </>
  )
};

export default Notification