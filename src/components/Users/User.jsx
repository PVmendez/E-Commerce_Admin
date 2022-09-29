import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const User = ({ users }) => {
  const navigate = useNavigate();
  const adminStore = useSelector((state) => state.admin[0]);
  const handleDeleteAdmin = (id) => {
    const result = axios({
      method: "DELETE",
      baseURL: process.env.REACT_APP_API_BASE_URL,
      url: `/administrators/delete/${id}`,
      data: users,
      headers: {
        Authorization: `Bearer ${adminStore.token}`,
      },
    });
    // if (result.data.error) {
    //   return navigate("/login");
    // }
    navigate("/administradores");
  };
  const showAlert = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Estas eliminando al usuario de la base de datos, no podrás revertirlo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#b0aaa9",
      cancelButtonColor: "#8a7357",
      cancelButtonText: "No, cancelar",
      confirmButtonText: "Si, estoy seguro",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteAdmin(id);
        Swal.fire({
          title: "Eliminado",
          text: "El administrador ha sido eliminado",
          icon: "success",
          showConfirmButton: false,
        });
      }
    });
  };

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
          </>
        ) : (
          <>
            <td>
              <i
                style={{ color: "#8a7357" }}
                className="far fa-edit me-3"
                onClick={() =>
                  navigate(`/administradores/actualizar/${users.id}`)
                }
              ></i>

              <i
                style={{ color: "#8a7357" }}
                className="fas fa-trash-alt"
                onClick={() => {
                  showAlert(users.id);
                }}
              ></i>
            </td>
          </>
        )}
      </tr>
    </>
  );
};
