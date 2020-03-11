import React from 'react';
import Moment from 'react-moment';

//styles
import '../sass/Card.scss';

export const Card = ({ post }) => {
  return (
    <div className='card'>
      <h2><b>Title:</b> {post.title}</h2>
      <p><b>Post:</b> {post.contents}</p>
      <p><b>Created:</b>
        <Moment format={"LLL"}>
          {post.created_at}
        </Moment></p>
      <p><b>Last Updated:</b> {
        <Moment format={"LLL"}>
          {post.updated_at}
        </Moment>
      }</p>
     <div className= 'buttonCont'>
        <button>Delete</button>
        <button>Edit</button>
     </div>
    </div>
  )
}//end Card
