import React from 'react';
import Post from './Post';

const Posts=({category,refreshto})=>{
    const cat=category;
	return(
       <>
       <div className="posts-container">
        <h2>Notice Board</h2>
        <Post category={cat} refreshto={refreshto}/>
        
       </div>
       </>
		)
}

export default Posts;