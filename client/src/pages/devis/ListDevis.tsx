import { useEffect, useState, Fragment } from "react";
import { Box, Button, Typography } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { RiAddCircleLine, RiDeleteBin3Fill } from "react-icons/ri";

import { useDispatch } from "react-redux";
import { detailsAcc } from "../../actions/action";
import custom_axios from "../../axios/AxiosSetup";

function ListDevis() {
  const [listProd, setListProd] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    custom_axios
      .get("/devis", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setListProd(res.data);
      });
  }, []);

  const details = (dts: any) => {
    dispatch(detailsAcc(dts) as any);
    navigate("/devis/" + dts.id);
  };
  const columns = [
    {
      field: "lastName",
      headerName: "Commerciel:",
      headerClassName: "super-app-theme--cell",

      width: 200,
    },
    {
      field: "fullName",
      headerName: "Nom Complete Client:",
      headerClassName: "super-app-theme--cell",

      width: 260,
    },
    {
      field: "date_creation",
      headerName: "Date Creation:",
      headerClassName: "super-app-theme--cell",

      width: 190,
    },
    {
      field: "id",
      headerName: "Num Devis:",
      headerClassName: "super-app-theme--cell",

      width: 120,
    },

    {
      field: "modification",
      headerName: "Modifications",
      width: 160,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => {
        return (
          <>
            {/* update data of collabs */}
            <button
              className="collabListEdit"
              onClick={() => details(params.row)}
            >
              Detail
            </button>
          </>
        );
      },
    },
  ];
  return (
    <Fragment>
      <Fragment>
        <div className="flex justify-center gap-6 m-10">
          <Link to="/creer-dev-BD">
            <button className="bg-orange-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded h-10">
              Bois Dur
            </button>
          </Link>
          <Link to="/creer-dev-BL">
            <button className="bg-green-400 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded h-10">
              Bois Blanc
            </button>
          </Link>
          <Link to="/creer-dev-BR">
            <button className="bg-red-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded h-10">
              Bois Rouge
            </button>
          </Link>
          <Link to="/creer-dev-CP">
            <button className="bg-green-300 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded h-10">
              Contre Plaque
            </button>
          </Link>
          <Link to="/creer-dev-PN">
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded h-10">
              Panneaux
            </button>
          </Link>
        </div>
        <div className="m-10 bg-slat-950">
          <Link to="/creer-devis">
            <Button variant="contained" startIcon={<RiAddCircleLine />}>
              Devis
            </Button>
          </Link>
          <Typography
            variant="h3"
            color="blue"
            className="text-center font-sans"
          >
            La List Des Devis:
          </Typography>
          <Box
            sx={{
              height: "auto",
              width: "100%",
              backgroundColor: "#fff",

              marginTop: "20px",
              borderRadius: "3px",
              fontWeight: "bold",
              boxShadow: 2,
              border: 2,
              borderColor: "primary.light",
              "& .MuiDataGrid-cell": {
                backgroundColor: "#fff",

                color: "#444",
                fontSize: "20px",
                fontWeight: "bold",
              },
              "& .super-app-theme--cell": {
                backgroundColor: "#fff",
                color: "#1a3e72",
                fontWeight: "bold",
                borderRadius: "3px",
                fontSize: "20px",
              },
            }}
          >
            <DataGrid
              rows={listProd}
              columns={columns}
              getRowId={(row: any) => row.id}
            />
          </Box>
        </div>
      </Fragment>
    </Fragment>
  );
}

export default ListDevis;
