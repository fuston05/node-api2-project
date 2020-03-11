import React from 'react';
import Moment from 'react-moment';

export const Card = ({post}) => {
  return (
    <div className= 'card'>
      <h1>Title: {post.title}</h1>
      <p>Post: {post.contents}</p>
      <p>Created: 
        <Moment format= {"LLL"}>
          {post.created_at}
        </Moment></p>
      <p>Last Updated: {
        <Moment format= {"LLL"}>
         {post.updated_at}
        </Moment>
      }</p>
    </div>
  )
}
