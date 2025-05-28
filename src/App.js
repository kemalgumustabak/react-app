import React, { useState } from 'react';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'İlk Yazı', content: 'Bu benim ilk blog yazım!' },
    { id: 2, title: 'Merhaba Dünya', content: 'React öğrenmeye başladım, heyecanlıyım!' }
  ]);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: posts.length + 1,
      title: title,
      content: content
    };
    setPosts([newPost, ...posts]);
    setTitle('');
    setContent('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Blog Uygulaması</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Başlık"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: 'block', marginBottom: '10px', width: '300px' }}
        />
        <textarea
          placeholder="İçerik"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ display: 'block', marginBottom: '10px', width: '300px', height: '100px' }}
        />
        <button type="submit">Yeni Yazı Ekle</button>
      </form>

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
