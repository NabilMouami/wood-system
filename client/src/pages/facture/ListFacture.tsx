import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { Typography } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { detailsAcc } from "../../actions/action";
import custom_axios from "../../axios/AxiosSetup";
function ListFacture() {
  const [listProd, setListProd] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    custom_axios.get("/boncomm").then((res) => {
      setListProd(res.data);
    });
  }, []);

  const details = (dts: any) => {
    dispatch(detailsAcc(dts) as any);
    navigate("/fct/" + dts.id);
  };
  const columns = [
    {
      field: "nom",
      headerName: "Nom Commerc:",
      headerClassName: "super-app-theme--cell",

      width: 220,
    },
    {
      field: "prenom",
      headerName: "Pre Commerc:",
      headerClassName: "super-app-theme--cell",

      width: 220,
    },
    {
      field: "fullname",
      headerName: "Nom Complete Client:",
      headerClassName: "super-app-theme--cell",

      width: 260,
    },
    {
      field: "date",
      headerName: "Date Creation:",
      headerClassName: "super-app-theme--cell",

      width: 190,
    },
    {
      field: "num_bon_comm",
      headerName: "Num Dev:",
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
          <Link to="/creer-fct-BD">
            <button className="bg-orange-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded h-10">
              Bois Dur
            </button>
          </Link>
          <Link to="/creer-fct-BL">
            <button className="bg-green-400 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded h-10">
              Bois Blanc
            </button>
          </Link>
          <Link to="/creer-fct-BR">
            <button className="bg-red-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded h-10">
              Bois Rouge
            </button>
          </Link>
          <Link to="/creer-fct-CP">
            <button className="bg-green-300 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded h-10">
              Contre Plaque
            </button>
          </Link>
          <Link to="/creer-fct-PN">
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded h-10">
              Panneaux
            </button>
          </Link>
        </div>
        <div className="m-10 bg-slat-950">
          <Typography
            variant="h3"
            color="blue"
            className="text-center font-sans"
          >
            La List Des Factures:
          </Typography>
          <Box
            sx={{
              height: 700,
              width: "100%",
              marginTop: "20px",
              borderRadius: "3px",
              fontWeight: "bold",
              boxShadow: 2,
              border: 2,
              borderColor: "primary.light",
              "& .MuiDataGrid-cell": {
                color: "#444",
                fontSize: "20px",
                fontWeight: "bold",
              },
              "& .super-app-theme--cell": {
                backgroundColor: "#FAEBD7",
                color: "#1a3e72",
                fontWeight: "bold",
                borderRadius: "3px",
                fontSize: "28px",
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

export default ListFacture;
