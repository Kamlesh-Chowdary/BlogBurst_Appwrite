import React, { useEffect, useState } from "react";
import postService from "../appwrite/post";
import { Container, PostCard } from "../components/index";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.userData);
  useEffect(() => {
    postService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (!userData) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read blogs!
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Looks like there are no blogs yet. Why not create one?
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="grid sm:grid-cols-4">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 mx-auto text-center">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
