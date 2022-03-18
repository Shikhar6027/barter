import React,{useState} from 'react';
import { NavLink,useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(email);
		console.log(password);
		try {
			await axios.post('/signin', { email, password })
			window.alert('logged in successfully');
			history.push('/');

		} catch (error) {
			if(error.response.status===400);
			window.alert(error.response.data);
			
			setEmail('');
			setPassword('');
			
		}
		
		
	}
    return (
        <>
         <div className="signup-form">
    <form method="post" onSubmit={handleSubmit}>
		<h2>LogIn</h2>
		<p>Please Enter Details to Log In</p>
		<hr/>
       
        <div className="form-group">
			<div className="input-group">
				<div className="input-group-prepend">
					<span className="input-group-text">
						<i className="fa fa-paper-plane"></i>
					</span>                    
				</div>
				<input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} name="email" placeholder="Email Address" required="required"  autoComplete='off'/>
			</div>
         </div>
      
		<div className="form-group">
			<div className="input-group">
				<div className="input-group-prepend">
					<span className="input-group-text">
						<i className="fa fa-lock"></i>
					</span>                    
				</div>
				<input type="text" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} name="password" placeholder="Password" required="required"/>
			</div>
        </div>
		
        {/* <div className="form-group">
			<label className="form-check-label"><input type="checkbox" required="required"/> I accept the <NavLink to="#">Terms of Use</NavLink> &amp; <NavLink to="#">Privacy Policy</NavLink></label>
		</div> */}
		<div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg">Log In</button>
        </div>
    </form>
	<div className="text-center">Does Not Have Accoount<NavLink to="/Signup">Create Account</NavLink></div>
</div>
        </>
    )
};

export default Login;
