import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../components/index";
import postService from "../appwrite/post";
import { useParams, useNavigate } from "react-router-dom";

const EditPost = () => {
  const [post, setPost] = useState([]);
  const { slug } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    if (slug) {
      postService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  );
};

export default EditPost;
