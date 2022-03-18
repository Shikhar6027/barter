import React, { useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useHistory } from 'react-router-dom';
const axios = require('axios');


const About = () => {
  const [user, setUser] = useState({});
 
  const history = useHistory();
  const callAbout = async () => {
    try {
      const res = await axios.get('/about', { withCredentials: true });
      const data = await res.data;
      setUser(data);
      console.log(data);
      if (!res.status === 200)
      {
        const error = new Error(res.error);
        throw error;
        }
    } catch (error) {
      history.push('/Login');
      console.log(error);
      
    }
    
  }
  useEffect(() => {
    callAbout();
    
  },[])

  return (
    <>
      <div>
        Name:   <span>{ user.name}</span>
      </div>
        <div>
       Email:   <span>{ user.email}</span>
      </div>
            <div>
       Phone No. :   <span>{ user.phone}</span>
      </div>
    </>
    )
};

export default About;
