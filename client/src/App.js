import React, { useState, useEffect } from 'react';
import axios from 'axios';

//components
import { Card } from './components/Card';

function App() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(res => {
        setPosts(res.data);
        console.log('res.data: ', res.data);
      })
      .catch(err => {
        console.log('err:', err);
      })
  }, [])

  return (
    <div className="App">
      Hello World
      {
        posts && posts.map(post => {
          return <Card
            key= {Date.now()*Math.random()}
            post={post}
          />
        })
      }
    </div>
  );
}

export default App;
