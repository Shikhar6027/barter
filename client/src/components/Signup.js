import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink,useHistory } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
	const history = useHistory();
    const [user, setUser] = useState({
        name: "", phone: "", email: "", password: "", cpassword:""
        
    })
    let name, value;
    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
		// setUser((oldUser) => {
		// 	return {
		// 		...oldUser
		// 	}
			
		// });
	}
	const postData = async (e) => {
		e.preventDefault();
		try {
			await axios.post('/register', user);
			window.alert("user registered successfully");
			history.push('/login');
			

		    }
		catch (err) {
			if (err.response.status === 422)
			{
				window.alert("user already exist");
				}
		}
		
      
	}
    return (
        <>
   <div className="signup-form">
    <form method="post" onSubmit={postData}>
		<h2>Sign Up</h2>
		<p>Please fill in this form to create an account!</p>
		<hr/>
        <div className="form-group">
			<div className="input-group">
				<div className="input-group-prepend">
					<span className="input-group-text">
						<span className="fa fa-user"></span>
					</span>                    
				</div>
				<input type="text" className="form-control" value={user.name} onChange={handleChange} name="name" placeholder="Username" required="required" autoComplete='off'/>
			</div>
        </div>
        <div className="form-group">
			<div className="input-group">
				<div className="input-group-prepend">
					<span className="input-group-text">
						<i className="fa fa-paper-plane"></i>
					</span>                    
				</div>
				<input type="email" className="form-control" value={user.email} onChange={handleChange} name="email" placeholder="Email Address" required="required"  autoComplete='off'/>
			</div>
         </div>
        <div className="form-group">
			<div className="input-group">
				<div className="input-group-prepend">
					<span className="input-group-text">
						<span className="fa fa-phone"></span>
					</span>                    
				</div>
				<input type="text" className="form-control" value={user.phone} onChange={handleChange} name="phone" placeholder="phone" required="required" autoComplete='off'/>
			</div>
        </div>
		<div className="form-group">
			<div className="input-group">
				<div className="input-group-prepend">
					<span className="input-group-text">
						<i className="fa fa-lock"></i>
					</span>                    
				</div>
				<input type="text" className="form-control" value={user.password} onChange={handleChange} name="password" placeholder="Password" required="required"/>
			</div>
        </div>
		<div className="form-group">
			<div className="input-group">
				<div className="input-group-prepend">
					<span className="input-group-text">
						<i className="fa fa-lock"></i>
						<i className="fa fa-check"></i>
					</span>                    
				</div>
				<input type="text" className="form-control" value={user.cpassword} onChange={handleChange} name="cpassword" placeholder="Confirm Password" required="required"/>
			</div>
        </div>
        <div className="form-group">
			<label className="form-check-label"><input type="checkbox" required="required"/> I accept the <NavLink to="#">Terms of Use</NavLink> &amp; <NavLink to="#">Privacy Policy</NavLink></label>
		</div>
		<div className="form-group">
            <button type="submit"  className="btn btn-primary btn-lg">Sign Up</button>
        </div>
    </form>
	<div className="text-center">Already have an account? <NavLink to="/Login">Login here</NavLink></div>
</div>
        </>
    )
};

export default Signup;
