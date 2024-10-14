import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/posts'
    })
    .then(response => setPosts(response.data))
    .catch(error => console.error('Error fetching posts:', error));
  }, []);  // 빈 배열을 넣어 처음 렌더링될 때만 실행

  return (
    <div>
      <div>{posts.length}</div>
    </div>
  );
}

export default App;
