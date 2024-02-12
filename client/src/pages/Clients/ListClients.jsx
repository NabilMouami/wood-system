import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Swal from "sweetalert2";
import { detailsAcc } from "../../actions/action";
import { RiDeleteBack2Fill } from "react-icons/ri";
import custom_axios from "../../axios/AxiosSetup";

function ListClients() {
  const [listUsers, setListUsers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    custom_axios
      .get(`/clients/`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setListUsers(res.data);
      });
  }, []);

  const deleteEmployee = (id) => {
    custom_axios
      .delete(`/clients/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        setListUsers(listUsers.filter((row) => row.id !== id));
      });
  };
  function popup(id, fname) {
    Swal.fire({
      title: "Êtes vous sûr?",
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Annuler",
      confirmButtonText: "Oui, supprimez " + fname + " ",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEmployee(id);
        Swal.fire("Supprimé!", "Client a été supprimé.", "success");
      }
    });
  }
  const details = (dts) => {
    dispatch(detailsAcc(dts));
    navigate("/client/" + dts.id);
  };
  const columns = [
    {
      field: "fullName",
      headerName: "Nom Complete:",
      headerClassName: "super-app-theme--cell",

      width: 240,
    },
    {
      field: "phone",
      headerName: "Telephone:",
      headerClassName: "super-app-theme--cell",

      width: 150,
    },
    {
      field: "ville",
      headerName: "Ville:",
      headerClassName: "super-app-theme--cell",

      width: 150,
    },
    {
      field: "adresse",
      headerName: "Adresse:",
      headerClassName: "super-app-theme--cell",

      width: 220,
    },
    {
      field: "cne",
      headerName: "Id Carte Nationel:",
      headerClassName: "super-app-theme--cell",

      width: 160,
    },
    {
      field: "modification",
      headerName: "Modifications",
      width: 260,
      renderCell: (params) => {
        return (
          <>
            {/* update data of collabs */}
            <button
              className="collabListEdit"
              onClick={() => details(params.row)}
            >
              Éditer
            </button>
            {/* delete a collab */}
            <RiDeleteBack2Fill
              className="collabListDelete"
              onClick={() => {
                popup(params.row.id, params.row.fullName);
              }}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="collabList">
      <Link to="/ajoute-client">
        <button className="addnewCollab">
          <span className="text-xl mr-5">+</span>Ajouter un Client
        </button>
      </Link>
      <Box
        sx={{
          height: 600,
          width: "90%",
          "& .super-app-theme--cell": {
            backgroundColor: "#66CDAA",
            color: "#1a3e72",
            fontWeight: "600",
          },
        }}
      >
        <DataGrid
          rows={listUsers}
          columns={columns}
          getRowId={(row) => row.id}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </div>
  );
}

export default ListClients;
