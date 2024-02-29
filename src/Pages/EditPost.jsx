import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../components/index";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const EditPost = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const allPosts = useSelector((state) => state.post.posts);

  const navigate = useNavigate();
  useEffect(() => {
    if (slug) {
      if (allPosts) {
        allPosts.map((post) => (slug === post.$id ? setPost(post) : null));
        setLoading(false);
      } else {
        setLoading(false);
      }
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  if (!loading) {
    if (post) {
      return (
        <div className="py-8">
          <Container className="w-5xl">
            <PostForm post={post} />
          </Container>
        </div>
      );
    }
  } else {
    return (
      <div className="py-8">
        <Container>
          <h1>Loading...</h1>
        </Container>
      </div>
    );
  }
};

export default EditPost;
