import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
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
      const updatedPosts = posts.map(post =>
        post.id === editingId ? { ...post, title, content } : post
      );
      setPosts(updatedPosts);
      setEditingId(null);
    } else {
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
    <Router>
      <Container className="py-4">
        <h1 className="mb-4">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Blog Uygulaması
          </Link>
        </h1>

        <Routes>
          <Route
            path="/"
            element={
              <>
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
                      <Card.Title>
                        <Link to={`/post/${post.id}`} style={{ textDecoration: 'none' }}>
                          {post.title}
                        </Link>
                      </Card.Title>
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
              </>
            }
          />
          <Route path="/post/:id" element={<PostDetail posts={posts} />} />
        </Routes>
      </Container>
    </Router>
  );
}

function PostDetail({ posts }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = posts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div>
        <h2>Yazı bulunamadı</h2>
        <Button onClick={() => navigate('/')}>Geri Dön</Button>
      </div>
    );
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <Button onClick={() => navigate('/')}>Geri Dön</Button>
    </div>
  );
}

export default App;
