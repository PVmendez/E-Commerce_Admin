import axios from "axios";
import { useNavigate } from "react-router-dom";

export const User = ({ users }) => {
  const navigate = useNavigate();

  const handleDeleteAdmin = () => {
    const result = axios({
      method: "DELETE",
      baseURL: process.env.REACT_APP_API_BASE_URL,
      url: `/administrators/delete/${users.id}`,
      data: users
    });
    navigate("/administradores")
    console.log(result)
  };

  const handleDeleteCustomer = () => {

  }

  return (
    <>
      <tr>
        <td>{users.id}</td>
        <td>{users.firstName}</td>
        <td>{users.lastName}</td>
        <td>{users.email}</td>
        {users.address ? (
          <>
            <td>{users.address}</td>
            <td>{users.phone}</td>
            <td>
            <button className="btn btn-primary">Update</button>
            <button className="btn btn-danger" onClick={handleDeleteCustomer}>
              Delete
            </button>
        </td>
          </>
        ) : (
          <>
          <td>
            <button className="btn btn-primary" onClick={() => navigate(`/administradores/actualizar/${users.id}`)}>Update</button>
            <button className="btn btn-danger" onClick={handleDeleteAdmin}>
              Delete
            </button>
          </td>
            
          </>
        )}
        
      </tr>
    </>
  );
};