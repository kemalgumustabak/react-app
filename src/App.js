import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import { Container, Card, Button, Spinner, Alert } from "react-bootstrap";
import useFetch from "./hooks/useFetch";

function App() {
  const {
    data: posts,
    loading,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/posts?_limit=10");

  return (
    <Router>
      <Container className="py-4">
        <h1 className="mb-4">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
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

                {!loading &&
                  !error &&
                  posts &&
                  posts.map((post) => (
                    <Card key={post.id} className="mb-3">
                      <Card.Body>
                        <Card.Title>
                          <Link
                            to={`/post/${post.id}`}
                            style={{ textDecoration: "none" }}
                          >
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
  const {
    data: post,
    loading,
    error,
  } = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const navigate = useNavigate();

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!post) return <Alert variant="warning">Yazı bulunamadı</Alert>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <Button onClick={() => navigate("/")}>Geri Dön</Button>
    </div>
  );
}

export default App;
