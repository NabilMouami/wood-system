import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import custom_axios from "../../axios/AxiosSetup";
import { RiChatDeleteFill } from "react-icons/ri";
import { DataGrid } from "@mui/x-data-grid";
import { detailsAcc } from "../../actions/action";

import Box from "@mui/material/Box";

function ListUsers() {
  const [listUsers, setListUsers] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    custom_axios
      .get("/user", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        setListUsers(res.data);
      });
  }, []);

  const details = (dts) => {
    dispatch(detailsAcc(dts));
    navigate("/changer-user/" + dts.iduser);
  };
  const deleteEmployee = (id) => {
    custom_axios
      .delete(`/user/${id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then(() => {
        setListUsers(listUsers.filter((row) => row.iduser !== id));
      });
  };
  function popup(id, fname, lname) {
    Swal.fire({
      title: "Êtes vous sûr?",
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Annuler",
      confirmButtonText: "Oui, supprimez " + fname + " " + lname,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEmployee(id);
        Swal.fire("Supprimé!", "Utilisateur a été supprimé.", "success");
      }
    });
  }
  const columns = [
    {
      field: "lastName",
      headerName: "Nom:",
      headerClassName: "super-app-theme--cell",

      width: 140,
      editable: true,
    },
    {
      field: "firstName",
      headerName: "Prenom:",
      headerClassName: "super-app-theme--cell",

      width: 140,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email:",
      headerClassName: "super-app-theme--cell",

      width: 240,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role:",
      headerClassName: "super-app-theme--cell",

      width: 140,
    },
    {
      field: "password",
      headerName: "Password:",
      headerClassName: "super-app-theme--cell",

      width: 140,
    },

    {
      field: "modification",
      headerName: "Modifications",
      width: 260,
      renderCell: (params) => {
        return (
          <>
            <button
              className="collabListEdit"
              onClick={() => details(params.row)}
            >
              Changer
            </button>
            <RiChatDeleteFill
              className="collabListDelete"
              onClick={() => {
                popup(
                  params.row.iduser,
                  params.row.firstName,
                  params.row.lastName
                );
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="collabList">
      <Link to="/ajoute-user">
        <button className="addnewCollab">
          <span className="text-xl mr-5">+</span>Ajouter un Utilisateur
        </button>
      </Link>
      <Box
        sx={{
          height: 600,
          width: "90%",
          marginLeft: "50px",
          "& .super-app-theme--cell": {
            backgroundColor: "#fff",
            color: "#1a3e72",
            fontWeight: "700",
          },
        }}
      >
        <DataGrid
          rows={listUsers}
          columns={columns}
          getRowId={(row) => row.iduser}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </div>
  );
}

export default ListUsers;
