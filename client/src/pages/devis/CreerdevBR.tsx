import React, { useState, useEffect, Fragment } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Breadcrumbs,
  Link as Linka,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { ajouteEnDevis } from "../../actions/action";
import custom_axios from "../../axios/AxiosSetup";
import { GetBoisRouge } from "../../models/bois/BoisRouge";

function CreerdevBR() {
  const [open, setOpen] = useState<boolean>(false);
  const [listBois, setListBois] = useState<Array<GetBoisRouge>>([]);
  const [quantity, setQuantity] = useState(0);
  const [remiseItem, setRemiseItem] = useState(1);
  interface NumFacture {
    max: number;
  }
  const [rowTable, setRowTable] = useState<GetBoisRouge>({} as GetBoisRouge);
  const [numFact, setNumFact] = useState<NumFacture>({ max: 1 });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    custom_axios
      .get("/stock/boisrouge", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setListBois(res.data);
      });
  }, []);
  useEffect(() => {
    custom_axios
      .get("/devis/lastid/NumDev", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        setNumFact(res.data);
      });
  }, []);
  // function retun number float with his precision to two number after vigule
  function toPrecision(num: number, precision: number) {
    num = Math.trunc(num * 10 ** precision) / 10 ** precision;
    return num;
  }

  //Ajoute Bois En Bon De Livraison
  const ajouteAuBon = (row: any) => {
    setOpen(!open);
    setRowTable(row);
    setQuantity(row.pieces);
  };

  const handleSubmitBon = (e: React.FormEvent) => {
    e.preventDefault();
    const item = {
      classbois: "boisrouge",
      type: rowTable.type + " " + rowTable.marque,
      pieces: quantity,
      long: rowTable.long,
      quantity: quantity * rowTable.long,
      unity: "ML",
      prix_unity: rowTable.prix_unity,
      prix_total: rowTable.prix_unity * quantity * rowTable.long,
    };
    dispatch(ajouteEnDevis(item) as any);
    setOpen(!open);
    const data = {
      type: "boisrouge",
      designation: rowTable.type + " " + rowTable.marque,
      qte: quantity,
      pieces: rowTable.pieces - quantity,
      piece: rowTable.piece - quantity,
      metre_lineare: rowTable.metre_lineare - quantity * rowTable.long,
      n_fardou: rowTable.n_fardou,
      quantity: toPrecision(quantity * rowTable.long, 2),
      long: rowTable.long,
      unity: "ML",

      prix_ht: rowTable.prix_unity,
      montant_ht: toPrecision(
        quantity * rowTable.long * rowTable.prix_unity,
        2
      ),
      num_devis: numFact?.max + 1,
    };
    custom_axios
      .post("/devis/boisrouge", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        toast.success("Changement En Stock Success !!", {
          position: "top-right",
        });
      });
  };

  const columns = [
    {
      field: "modification",
      headerName: "Modifications",
      headerClassName: "super-app-theme--cell",
      width: 190,
      renderCell: (params: any) => {
        return (
          <>
            {/* update data of collabs */}
            <button
              className="collabListEdit"
              onClick={() => ajouteAuBon(params.row)}
            >
              Ajoute au Devis
            </button>
          </>
        );
      },
    },
    {
      field: "type",
      headerName: "Type:",
      headerClassName: "super-app-theme--cell",

      width: 150,
    },
    {
      field: "marque",
      headerName: "Marque:",
      headerClassName: "super-app-theme--cell",

      width: 150,
    },
    {
      field: "quality",
      headerName: "Quality:",
      headerClassName: "super-app-theme--cell",

      width: 120,
    },
    {
      field: "fornisseur",
      headerName: "Fornisseur:",
      headerClassName: "super-app-theme--cell",
      width: 130,
    },
    {
      field: "n_fardou",
      headerName: "Num Fardou:",
      headerClassName: "super-app-theme--cell",

      width: 150,
    },
    {
      field: "prix_unity",
      headerName: "Prix Unite:",
      headerClassName: "super-app-theme--cell",

      width: 120,
    },
    {
      field: "pieces",
      headerName: "Piece Total:",
      headerClassName: "super-app-theme--cell",
      width: 120,
    },
    {
      field: "long_moyenne",
      headerName: "Long Avg:",
      headerClassName: "super-app-theme--cell",
      width: 120,
    },
    {
      field: "metre_lineare",
      headerName: "ML:",
      headerClassName: "super-app-theme--cell",
      width: 100,
    },
    {
      field: "volume",
      headerName: "Volume Fardou:",
      headerClassName: "super-app-theme--cell",
      width: 110,
    },
    {
      field: "larg",
      headerName: "Largeur:",
      headerClassName: "super-app-theme--cell",
      width: 100,
    },
    {
      field: "epaisseur",
      headerName: "Epaisseur:",
      headerClassName: "super-app-theme--cell",
      width: 110,
    },
    {
      field: "date_creation",
      headerName: "Date Ajoute:",
      headerClassName: "super-app-theme--cell",
      width: 140,
    },
  ];

  return (
    <Fragment>
      <div className="">
        <div
          className="w-[300px] p-4 mb-8 shadow-xl bg-white rounded-2xl"
          role="presentation"
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link to="/list-devis">
              <Linka className="text-2xl" underline="hover" color="inherit">
                Devis
              </Linka>
            </Link>
            <Link to="/creer-devis">
              <Linka underline="hover" color="inherit">
                Creer Devis
              </Linka>
            </Link>

            <Linka underline="hover" color="text.primary" aria-current="page">
              Bois-Rouge
            </Linka>
          </Breadcrumbs>
        </div>
        <div className="bg-white rounded-2xl flex justify-center gap-6 m-10 p-8">
          <h2 className="font-bold text-2xl underline">Vendez Par:</h2>
          <Link to="/creer-dev-BR">
            <button className="bg-orange-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded h-10">
              Vente Par Details
            </button>
          </Link>
          <Link to="/creer-dev-BR/fardou">
            <button className="bg-green-400 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded h-10">
              Vente Par Gros
            </button>
          </Link>
        </div>
        <div className="ml-6 grid gap-10">
          <Typography className="mt-8" variant="h4" color="gray">
            List Des Bois Rouge En Stock:
          </Typography>
        </div>
        <Fragment>
          <Dialog onClose={() => setOpen(!open)} open={open}>
            <DialogTitle>Ajoute Item en Devis.</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmitBon}>
                <div className="flex justify-around items-center mb-5 font-bold">
                  <div className="flex flex-col">
                    <label>Entrez Une Quantity:</label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                      defaultValue={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                  </div>
                </div>
                <Button className="ml-7" type="submit">
                  Confirm
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </Fragment>

        <Box
          sx={{
            height: "auto",
            width: "100%",
            margin: "20px",
            borderRadius: "12px",
            fontWeight: "bold",
            boxShadow: 2,
            border: 2,
            borderColor: "primary.light",
            "& .MuiDataGrid-cell": {
              color: "#444",
              fontSize: "20px",
              fontWeight: "bold",
            },
            backgroundColor: "#fff",
            "& .super-app-theme--cell": {
              backgroundColor: "#ff0000",
              color: "#000",
              fontWeight: "bold",
              fontSize: "18px",
              fontFamily: "cursive",
            },
          }}
        >
          <DataGrid
            rows={listBois}
            columns={columns}
            getRowId={(row) => row.id}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            disableDensitySelector
            disableColumnSelector
          />
        </Box>
      </div>
    </Fragment>
  );
}

export default CreerdevBR;