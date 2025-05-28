// src/App.js
import React, { useState } from 'react';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'İlk Yazı', content: 'Bu benim ilk blog yazım!' },
    { id: 2, title: 'Merhaba Dünya', content: 'React öğrenmeye başladım, heyecanlıyım!' }
  ]);

  console.log(setPosts);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Blog Uygulaması</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id} style={{ marginBottom: '10px' }}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
