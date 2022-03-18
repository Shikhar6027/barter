import React,{useEffect,useState} from 'react';
import { useParams,useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';


const OnePost = () => {
    let { id } = useParams();
    const history = useHistory();
    const handleClick = () => {
        history.push({
            pathname: '/Request',
            state: {
                id: id
            }
        });
    }
    
    const [view, setView] = useState(null);
    const handleView = async () => {
       
        try {
            const res = await axios.get(`/allPosts/${id}`);
        
            setView(res.data);
            console.log(view);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => handleView(), []);
    return (<>
        {view ? (
          
            < div className="container pb50">
        <div class="row">
            <div class="col-md-9 mb40">
                {/* <article> */}
               
                        <img src={`/${view.file_path}`} />
                        {console.log(view.file_path)}
                <div className="post-content">
                            <h3>{ view.title}</h3>
                    <ul className="post-meta list-inline">
                        <li className="list-inline-item">
                                    <i className="fa fa-user-circle-o"></i> <a href="#">{view.owner}</a>
                        </li>
                        <li className="list-inline-item">
                                    <i className="fa fa-calendar-o"></i> <a href="#">{view.createdAt}</a>
                        </li>
                        {/* <li className="list-inline-item">
                            <i className="fa fa-tags"></i> <a href="#">Bootstrap4</a>
                        </li> */}
                    </ul>
                   
                            <p className="lead">{view.desc}</p>
                  
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
                            <button type="button" class="btn btn-outline-success" onClick={handleClick}>Request</button>
                        </li>
                    </ul>
                
                    
                  
                  
                </div>
                {/* </article> */}
                {/* <!-- post article--> */}

            </div>
           
        </div>
    </div>
    ) : (<h1>Loading...</h1>)}</>);
};

export default OnePost;
