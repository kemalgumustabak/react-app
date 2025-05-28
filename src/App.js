import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      // Düzenleme modu
      const updatedPosts = posts.map(post =>
        post.id === editingId ? { ...post, title, content } : post
      );
      setPosts(updatedPosts);
      setEditingId(null);
    } else {
      // Yeni ekleme modu
      const newPost = {
        id: Date.now(),
        title,
        content
      };
      setPosts([newPost, ...posts]);
    }

    setTitle('');
    setContent('');
  };

  const handleDelete = (id) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
  };

  const handleEdit = (post) => {
    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content);
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
        <Button type="submit" variant="primary">
          {editingId ? 'Kaydet' : 'Yeni Yazı Ekle'}
        </Button>
      </Form>

      {posts.map(post => (
        <Card key={post.id} className="mb-3">
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.content}</Card.Text>
            <Button
              variant="warning"
              className="me-2"
              onClick={() => handleEdit(post)}
            >
              Düzenle
            </Button>
            <Button variant="danger" onClick={() => handleDelete(post.id)}>
              Sil
            </Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default App;
