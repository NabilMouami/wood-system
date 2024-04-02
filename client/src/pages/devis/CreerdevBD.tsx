import React, { useState, useEffect, Fragment } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { ajouteEnDevis } from "../../actions/action";

import { GetBoisDur } from "../../models/bois/BoisDur";
import custom_axios from "../../axios/AxiosSetup";

function CreerdevBD() {
  const [open, setOpen] = useState<boolean>(false);
  const [listBois, setListBois] = useState<Array<GetBoisDur>>([]);
  const [quantity, setQuantity] = useState(0);
  const [remiseItem, setRemiseItem] = useState(1);
  interface NumFacture {
    max: number;
  }
  const [rowTable, setRowTable] = useState<GetBoisDur>({} as GetBoisDur);
  const [numFact, setNumFact] = useState<NumFacture>({ max: 1 });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    custom_axios
      .get("/stock/boisdur", {
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
      .get("/devis/lastid/NumDEv", {
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
  const handleSelectRemise = (e: any) => {
    setRemiseItem(e.target.value);
  };

  const handleSubmitBon = (e: React.FormEvent) => {
    e.preventDefault();
    const item = {
      classbois: "boisdur",
      type: rowTable.marque,
      pieces: quantity,
      long: rowTable.long,
      quantity:
        quantity *
        rowTable.long *
        rowTable.larg *
        rowTable.epaisseur *
        Math.pow(10, -6),
      unity: "M3",
      prix_unity: rowTable.prix_vente,
      prix_total:
        rowTable.prix_vente *
        quantity *
        rowTable.long *
        rowTable.larg *
        rowTable.epaisseur *
        Math.pow(10, -6),
    };
    dispatch(ajouteEnDevis(item) as any);
    setOpen(!open);
    const data = {
      type: "boisdur",
      designation: rowTable.marque,
      qte: quantity,
      pieces: rowTable.pieces - quantity,
      quantity: toPrecision(
        quantity *
          rowTable.long *
          rowTable.larg *
          rowTable.epaisseur *
          Math.pow(10, -6),
        2
      ),
      long: rowTable.long,
      unity: "M3",

      prix_ht: rowTable.prix_vente,
      montant_ht: toPrecision(
        quantity *
          rowTable.long *
          rowTable.larg *
          rowTable.epaisseur *
          Math.pow(10, -6) *
          rowTable.prix_vente,
        2
      ),
      num_devis: numFact?.max + 1,
    };
    custom_axios
      .post("/devis/boisdur", data, {
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
      field: "marque",
      headerName: "Marque:",
      headerClassName: "super-app-theme--cell",

      width: 150,
    },
    {
      field: "fornisseur",
      headerName: "Fornisseur:",
      headerClassName: "super-app-theme--cell",

      width: 120,
    },
    {
      field: "n_fardou",
      headerName: "Num Fardou:",
      headerClassName: "super-app-theme--cell",

      width: 150,
    },
    {
      field: "pieces",
      headerName: "Pieces:",
      headerClassName: "super-app-theme--cell",
      width: 130,
    },
    {
      field: "long",
      headerName: "Long:",
      headerClassName: "super-app-theme--cell",
      width: 100,
    },
    {
      field: "larg",
      headerName: "Largeur:",
      headerClassName: "super-app-theme--cell",
      width: 120,
    },
    {
      field: "epaisseur",
      headerName: "Epaisseur:",
      headerClassName: "super-app-theme--cell",
      width: 120,
    },
    {
      field: "volume",
      headerName: "Volume Fardou:",
      headerClassName: "super-app-theme--cell",
      width: 120,
    },
    {
      field: "prix_achat",
      headerName: "Prix Achat:",
      headerClassName: "super-app-theme--cell",

      width: 120,
    },
    {
      field: "prix_vente",
      headerName: "Prix Vente:",
      headerClassName: "super-app-theme--cell",

      width: 120,
    },
    {
      field: "date_creation",
      headerName: "Date Ajoute:",
      headerClassName: "super-app-theme--cell",
      width: 140,
    },
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
  ];

  return (
    <Fragment>
      <div className="">
        <div className="ml-6 grid gap-10">
          <Typography className="mt-8" variant="h4" color="gray">
            List Des Bois Dur En Stock:
          </Typography>
        </div>
        <Fragment>
          <Dialog onClose={() => setOpen(!open)} open={open}>
            <DialogTitle>Ajoute Item en Facture.</DialogTitle>
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
              backgroundColor: "#ffff1a",
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

export default CreerdevBD;
