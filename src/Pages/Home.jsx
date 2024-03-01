import { useNavigate } from "react-router-dom";
import { Button, Container, PostCard } from "../components/index";
import { useSelector } from "react-redux";
import { setLoading } from "../store/postSlice";

function Home() {
  const loading = useSelector((state) => state.post.loading);
  const posts = useSelector((state) => state.post.posts);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  if (!userData) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <h1 className="text-2xl font-bold ">Login to read blogs!</h1>
          <Button
            className="hover:bg-blue-800 mt-5"
            onClick={() => navigate("login")}
          >
            Login
          </Button>
        </Container>
      </div>
    );
  }

  if (loading) {
    return <div className="bg-neutral-800">loading..</div>;
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="grid sm:flex sm:flex-wrap">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="p-2 mx-auto text-center sm:w-1/4 sm:m-0"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
