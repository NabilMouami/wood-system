import { useEffect, useState, Fragment } from "react";
import { Box, Button, Typography } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import {
  RiAddCircleLine,
  RiDeleteBin3Fill,
  RiFilter2Fill,
} from "react-icons/ri";

import { useDispatch } from "react-redux";
import { detailsAcc } from "../../actions/action";
import custom_axios from "../../axios/AxiosSetup";

function ListFacture() {
  const [listProd, setListProd] = useState([]);
  const [listFiltred, setListFiltred] = useState([]);

  const [date, setDate] = useState("");
  const [status, setSelectPayer] = useState("Tous");
  const [reglement, setSelectReglement] = useState("Tous");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    custom_axios
      .get("/facturation/factures", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(async (res) => {
        await setListProd(res.data);
        await setListFiltred(res.data);
      });
  }, []);

  const details = (dts) => {
    dispatch(detailsAcc(dts));
    navigate("/app/list-facture/" + dts.id);
  };
  const filterDate = () => {
    if (date === "") {
      setListFiltred(listProd);
    } else {
      const newFilter = listFiltred.filter((bon) => bon.date_creation === date);
      setListFiltred(newFilter);
    }
  };
  const filterImpayer = (e) => {
    if (listProd.length > 0) {
      setSelectPayer(e.target.value);
      if (listProd.length > 0) {
        const newFilter = listProd.filter(
          (bon) => bon.payer === e.target.value
        );
        setListFiltred(newFilter);
        if (e.target.value === "Tous") {
          setListFiltred(listProd);
          return;
        }
      }
    }
  };
  const filterReglement = (e) => {
    if (listProd.length > 0) {
      setSelectReglement(e.target.value);
      if (listProd.length > 0) {
        const newFilter = listProd.filter(
          (bon) => bon.reglement === e.target.value
        );
        setListFiltred(newFilter);
        if (e.target.value === "Tous") {
          setListFiltred(listProd);
          return;
        }
      }
    }
  };
  const Annuler = () => {
    setListFiltred(listProd);
    setSelectPayer("Tous");
    setSelectReglement("Tous");
  };
  const columns = [
    {
      field: "fullName",
      headerName: "Nom Complete Client:",
      headerClassName: "super-app-theme--cell",

      width: 230,
    },
    {
      field: "id",
      headerName: "Num Facture:",
      headerClassName: "super-app-theme--cell",

      width: 120,
    },
    {
      field: "reglement",
      headerName: "Reglement:",
      headerClassName: "super-app-theme--cell",

      width: 120,
    },
    {
      field: "payer",
      headerName: "Payer:",
      headerClassName: "super-app-theme--cell",

      width: 120,
    },
    {
      field: "sum",
      headerName: "Montant Total:",
      headerClassName: "super-app-theme--cell",

      width: 180,
    },
    {
      field: "date_creation",
      headerName: "Date Creation:",
      headerClassName: "super-app-theme--cell",

      width: 180,
    },

    {
      field: "modification",
      headerName: "Modifications",
      width: 160,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
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
        <div className="bg-slat-950">
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
          <Link to="/creer-facture">
            <Button variant="contained" startIcon={<RiAddCircleLine />}>
              Facturer
            </Button>
          </Link>
          <div className="bg-white p-4 mt-6 rounded-xl flex items-center justify-between">
            <div>
              <label className="ml-12 mb-2 block text-lg font-bold text-black">
                Status Facture:
              </label>

              <select
                className="ml-12 mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={status}
                onChange={(e) => filterImpayer(e)}
              >
                <option value="Tous">Tous</option>
                <option value="payer">Payer</option>
                <option value="non-payer">Impayer</option>
              </select>
            </div>
            <div>
              <label className="ml-12 mb-2 block text-lg font-bold text-black">
                Reglement:
              </label>

              <select
                className="ml-12 mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={reglement}
                onChange={(e) => filterReglement(e)}
              >
                <option value="Tous">Tous</option>
                <option value="espece">Espece</option>
                <option value="credit">Cridet</option>
                <option value="effet">Effet</option>
                <option value="check">Check</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-black font-bold">
                Choisir une date a afficher:{" "}
              </label>
              <input
                type="date"
                className="p-4 m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500"
                onChange={(event) => {
                  setDate(event.target.value);
                }}
              />
              <button
                className="bg-secondary-100/50 hover:bg-secondary-100 flex items-center justify-center gap-2 py-2 px-4 rounded-lg hover:text-primary transition-colors"
                onClick={filterDate}
              >
                <RiFilter2Fill /> Afficher
              </button>
            </div>
            <div>
              <button
                onClick={() => Annuler()}
                className="text-red-400 bg-secondary-100 p-2 rounded-xl"
              >
                Annuler
              </button>
            </div>
          </div>
          <Typography
            variant="h3"
            color="blue"
            className="text-center font-sans"
          >
            La List Des Factures:
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
              "& .espece": {
                color: "#008B8B",
              },
              "& .credit": {
                color: "#D2691E",
              },
              "& .effet": {
                color: "#ffff44",
              },
              "& .check": {
                color: "#ff9444",
              },
              "& .payer": {
                color: "#228B22",
              },
              "& .nonpayer": {
                color: "#8B0000",
              },
            }}
          >
            <DataGrid
              rows={listFiltred}
              columns={columns}
              getRowId={(row) => row.id}
              getCellClassName={(params) => {
                switch (params.value) {
                  case "espece":
                    return "espece";
                  case "credit":
                    return "credit";
                  case "effet":
                    return "effet";
                  case "check":
                    return "check";
                  case "payer":
                    return "payer";
                  case "non-payer":
                    return "nonpayer";
                }
              }}
            />
          </Box>
        </div>
      </Fragment>
    </Fragment>
  );
}

export default ListFacture;
