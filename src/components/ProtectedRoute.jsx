import axios from "axios";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const adminState = useSelector((state) => state.admin[0]);
  const navigate = useNavigate();
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    if (!adminState) {
      navigate("/login");
    } else {
      const verification = async () => {
        const result = await axios({
          method: "get",
          baseURL: process.env.REACT_APP_API_BASE_URL,
          url: `/administrators/verify`,
          headers: {
            Authorization: `Bearer ${adminState.token}`,
          },
        });
        return result.data;
      };
      verification().then((verify) => {
        if (verify.error) {
          setData(false);
          setIsLoading(false);
        } else if (verify.success) {
          setData(true);
          setIsLoading(false);
        }
      });
    }
  }, [adminState]);
  if (isLoading) {
    return <h2>loading</h2>;
  } else {
    return data ? children : <Navigate to="/login" replace />;
  }
}
