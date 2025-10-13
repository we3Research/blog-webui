import { RoutePath } from "@/routes/Route";
import { Link, Outlet } from "react-router";

const blogIdList = [1, 2, 3];
const Home = () => {
  return (
    <div>
      Home
      <nav>
        {blogIdList.map((id) => (
          <Link to={RoutePath.Blog + "/" + id}>Blog {id}</Link>
        ))}
      </nav>
      <Outlet />
    </div>
  );
};

export default Home;
