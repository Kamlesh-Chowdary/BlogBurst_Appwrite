import { useNavigate } from "react-router-dom";
import { Button, Container, PostCard } from "../components/index";
import { useSelector } from "react-redux";

function Home() {
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
  if (!posts || posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <h1 className="text-2xl font-bold ">
            Looks like there are no blogs yet. Why not create one?
          </h1>
        </Container>
      </div>
    );
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
