import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Form, Spinner, Alert } from 'react-bootstrap';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
      .then(response => {
        if (!response.ok) {
          throw new Error('Veri alınamadı');
        }
        return response.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

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
                {loading && <Spinner animation="border" />}
                {error && <Alert variant="danger">{error}</Alert>}

                {!loading && !error && posts.map(post => (
                  <Card key={post.id} className="mb-3">
                    <Card.Body>
                      <Card.Title>
                        <Link to={`/post/${post.id}`} style={{ textDecoration: 'none' }}>
                          {post.title}
                        </Link>
                      </Card.Title>
                      <Card.Text>{post.body}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </>
            }
          />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </Container>
    </Router>
  );
}

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response => response.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner animation="border" />;

  if (!post) return <Alert variant="danger">Yazı bulunamadı</Alert>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <Button onClick={() => navigate('/')}>Geri Dön</Button>
    </div>
  );
}

export default App;
