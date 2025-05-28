import React, { useState } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';

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
      id: Date.now(), // benzersiz id
      title,
      content
    };
    setPosts([newPost, ...posts]);
    setTitle('');
    setContent('');
  };

  const handleDelete = (id) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Blog Uygulaması</h1>

      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group className="mb-2">
          <Form.Control
            type="text"
            placeholder="Başlık"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            as="textarea"
            placeholder="İçerik"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">Yeni Yazı Ekle</Button>
      </Form>

      {posts.map(post => (
        <Card key={post.id} className="mb-3">
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.content}</Card.Text>
            <Button variant="danger" onClick={() => handleDelete(post.id)}>Sil</Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default App;
