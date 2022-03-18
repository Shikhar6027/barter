import axios from 'axios';
import React, { useState } from 'react'; 
import { useHistory } from 'react-router-dom';
import './Addpost.css';

const AddPost = () => {
	const history = useHistory();

	const [file, setFile] = useState("");

	const [state, setState] = useState({
		title: "",
		desc: "",
	});
	 const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
	const handlePhoto = (e) => {
		setFile(e.target.files[0]);
	}

	const postData = async (e) => {
		e.preventDefault();

		

		try {
			const { title, desc } = state;
			const formData = new FormData();
			formData.append("articleImage", file);
			formData.append("title", title);
			formData.append("desc", desc);
			axios.post('/upload', formData, {
				headers: {
              "Content-Type": "multipart/form-data",
            },
       
    });
			 window.alert('uploaded successfully');

		} catch (error) {
			console.log(error);
		}
		history.push('./AllPosts');
	}
    return (
        <>
           
  <div className="container">
	<div className="row">
	    
	    <div className="col-md-8 col-md-offset-2">
	        
    		<h1>Add post</h1>
    		
    		<form onSubmit={postData} encType="multipart/form-data" method="POST">
    		    
    		    {/* <div className="form-group has-error">
    		        <label for="slug">Slug <span className="require">*</span> <small>(This field use in url path.)</small></label>
    		        <input type="text" className="form-control" name="slug" />
    		        <span className="help-block">Field not entered!</span>
    		    </div> */}
    		    
    		    <div className="form-group">
    		        <label for="title">Title <span className="require">*</span></label>
    		        <input type="text" value={state.title} onChange={handleInputChange} className="form-control" name="title" />
    		    </div>
    		    
    		    <div className="form-group">
    		        <label for="description">Description</label>
    		        <textarea rows="5" value={state.desc}  onChange={handleInputChange} className="form-control" name="desc" ></textarea>
							</div>
							
				<div>
						<input type="file" onChange={handlePhoto} fileName="articleImage"/>
						{/* <input type="submit"/> */}
				</div>			
    		    
    		    {/* <div className="form-group">
    		        <p><span className="require">*</span> - required fields</p>
    		    </div>
    		     */}
    		    <div className="form-group">
    		        <button type="submit" className="btn btn-primary">
    		            Create
    		        </button>
    		        <button className="btn btn-default">
    		            Cancel
    		        </button>
    		    </div>
    		    
    		</form>
		</div>
		
	</div>
</div>
        </>
  );
};

export default AddPost;
