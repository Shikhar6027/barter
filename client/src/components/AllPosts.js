import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
const axios = require('axios');




const AllPosts = () => {
    const history = useHistory();
    const [post, setPost] = useState([]);
    const callPost = async () => {
        
        try {
            const res =await  axios.get('/allPosts');
            console.log(res);
            setPost(res.data);


        } catch (error) {
            history.push('/Login')
            console.log(error);
            
        }

        
    }
    useEffect(() => callPost(),[]
    )
    const handleClick = (article) => {
        //console.log(article);
        history.push(`/AllPosts/${article._id}`);
       
        
    }
    return(
    <MainContainer>
    {/* <div> */}
        {post.map((article) => (<div className='container' key={article._id}>
            <h2>{article.title}</h2>
            <img src={article.file_path} style={{height:"150px",width:"150px"}}/>
            <p>{article.desc}</p>
            <span className='badge badge-secondary p-2'>{article.owner}</span>
            <button type="button" onClick={()=>handleClick(article)} class="btn btn-primary">View</button>
            </div>
        ))}
            {/* </div> */}
    </MainContainer >
    )
};

const MainContainer = styled.div`
margin:7rem 0;
`

export default AllPosts;
