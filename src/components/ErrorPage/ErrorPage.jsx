import { Link } from "react-router-dom";
import "./ErrorPage.css"

export const ErrorPage = () => {
  return (
    <>
      <div className="main_body">
        <div className="center_body">
          <h1>404</h1>
          <h2>PAGE NOT FOUND</h2>
          <Link to="/">
            {" "}
            go to homepage
          </Link>
        </div>
      </div>
    </>
  );
};
