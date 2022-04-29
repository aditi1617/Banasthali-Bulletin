import React from 'react';
import PostS from './PostS';

const PostsS=({category,refreshto})=>{
    const cat=category;
	return(
       <>
       <div className="posts-container">
        <h2>Notice Board</h2>
        <PostS category={cat} refreshto={refreshto}/>
        
       </div>
       </>
		)
}

export default PostsS;