import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card, Button, Spinner, Alert, Container } from "react-bootstrap";
import { generateMockPosts } from "../../mockdata";
import _ from "lodash";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  useEffect(() => {
    loadPosts(page);
  }, [page]);

  const loadPosts = async (pageNum) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newPosts = generateMockPosts(pageNum, 10);

      // If there are no new posts, start fetching from the beginning
      if (newPosts.length === 0) {
        setPage(1);
        setPosts([]);
        setHasMore(true);
        return;
      }

      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      setError("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedLoadPosts = useCallback(
    _.debounce((pageNum) => loadPosts(pageNum), 300),
    []
  );

  const lastPostElementRef = (node) => {
    if (loading || !hasMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        debouncedLoadPosts(page);
      }
    });
    if (node) observer.current.observe(node);
  };

  const retryFetch = () => {
    setError(null);
    loadPosts(page);
  };

  return (
    <Container>
      <h2>Feed</h2>
      {error && (
        <Alert variant="danger">
          {error} <Button onClick={retryFetch}>Retry</Button>
        </Alert>
      )}
      {posts.length === 0 && !loading && !error && <p>No posts available.</p>}
      {posts.map((post, index) => (
        <Card
          key={post.id}
          className="mb-3"
          ref={posts.length === index + 1 ? lastPostElementRef : null}
        >
          <Card.Img variant="top" src={post.imageUrl} />
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.description}</Card.Text>
            <Button variant="primary">Like</Button>
            <Button variant="secondary" className="ml-2">
              Comment
            </Button>
          </Card.Body>
          <Card.Footer className="text-muted">{post.timestamp}</Card.Footer>
        </Card>
      ))}
      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Loading more posts...</p>
        </div>
      )}
      {!hasMore && !loading && <p>No more posts to load.</p>}
    </Container>
  );
};

export default Feed;
