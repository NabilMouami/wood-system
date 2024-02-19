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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import { detailsAcc } from "../../../actions/action";

import { ajouteEnBon } from "../../../actions/action";
import { GetBoisDur } from "../../../models/bois/BoisDur";
import custom_axios from "../../../axios/AxiosSetup";
import { RiAddCircleLine, RiDeleteBin3Fill } from "react-icons/ri";
const ListBoisDur: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [listBois, setListBois] = useState<Array<GetBoisDur>>([]);
  const [quantity, setQuantity] = useState(0);
  const [remiseItem, setRemiseItem] = useState(1);

  const [rowTable, setRowTable] = useState<GetBoisDur>({} as GetBoisDur);
  const [numBon, setNumBon] = useState({
    num_bon: "1",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const details = (dts: GetBoisDur) => {
    dispatch(detailsAcc(dts) as any);
    navigate("/changer-boisdur/" + dts.id);
  };
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
        remiseItem *
        Math.pow(10, -6),
      remise: remiseItem,
    };
    dispatch(ajouteEnBon(item) as any);
    setOpen(!open);
    const data = {
      type: "boisdur",
      marque: rowTable.marque,
      pieces: rowTable.pieces - quantity,
      quantity: toPrecision(
        quantity *
          rowTable.long *
          rowTable.larg *
          rowTable.epaisseur *
          Math.pow(10, -6),
        2
      ),
      qte: quantity,
      prix_unity: rowTable.prix_vente,
      prix_total: toPrecision(
        quantity *
          rowTable.long *
          rowTable.larg *
          rowTable.epaisseur *
          Math.pow(10, -6) *
          rowTable.prix_vente *
          remiseItem,
        2
      ),
      long: rowTable.long,
      remise: remiseItem,
      num_bon: numBon?.num_bon + 1,
    };
    custom_axios
      .put(`/bon/boisblanc/livrbl/${rowTable.id}`, data)
      .then((res) => {
        toast.success("Changement En Stock Success !!", {
          position: "top-right",
        });

        const indexOfItemInArray = listBois.findIndex(
          (q) => q.id === rowTable.id
        );
        if (indexOfItemInArray > -1) {
          listBois[indexOfItemInArray].pieces = rowTable.pieces - quantity;
        }
      });
  };
  //Delete Bois
  const deleteBois = (id: number) => {
    custom_axios
      .delete(`/stock/boisdur/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        setListBois(listBois.filter((row) => row.id !== id));
      });
  };
  function popup(id: number, fname: string) {
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
        deleteBois(id);
        Swal.fire("Supprimé!", "Bois Dur a été supprimé.", "success");
      }
    });
  }

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

      width: 130,
    },
    {
      field: "n_fardou",
      headerName: "Num Fardou:",
      headerClassName: "super-app-theme--cell",

      width: 150,
    },
    {
      field: "pieces",
      headerName: "Piece Total:",
      headerClassName: "super-app-theme--cell",
      width: 150,
    },
    {
      field: "long",
      headerName: "Longeur:",
      headerClassName: "super-app-theme--cell",
      width: 120,
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
      headerName: "P.Achat:",
      headerClassName: "super-app-theme--cell",

      width: 120,
    },
    {
      field: "prix_vente",
      headerName: "P.Vente:",
      headerClassName: "super-app-theme--cell",

      width: 120,
    },

    {
      field: "date_creation",
      headerName: "Date Ajoute:",
      headerClassName: "super-app-theme--cell",
      width: 150,
    },
    {
      field: "modification",
      headerName: "Modifications",
      headerClassName: "super-app-theme--cell",
      width: 420,
      renderCell: (params: any) => {
        return (
          <>
            {/* update data of collabs */}
            <button
              className="collabListEdit"
              onClick={() => ajouteAuBon(params.row)}
            >
              Ajoute au List
            </button>
            <button
              className="collabListEdit"
              onClick={() => details(params.row)}
            >
              Changer
            </button>

            {/* delete a Bois */}
            <RiDeleteBin3Fill
              className="collabListDelete"
              onClick={() => {
                popup(params.row.id, params.row.marque);
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <Fragment>
      <div className="">
        <div className="ml-6 grid gap-10">
          <Link to="/ajoute-boisdur">
            <Button variant="contained" startIcon={<RiAddCircleLine />}>
              Bois Dur
            </Button>
          </Link>
          <Typography className="mt-8" variant="h4" color="gray">
            List Des Bois Dur En Stock:
          </Typography>
        </div>
        <Fragment>
          <Dialog open={open}>
            <DialogTitle>Ajoute Item en Bon.</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmitBon}>
                <div className="flex justify-around items-center mb-5">
                  <div className="flex flex-col">
                    <label>Entrez Une Quantity:</label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                      defaultValue={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                  </div>
                  <div className="w-72">
                    <label>Remise:</label>
                    <select
                      className="font-bold p-4"
                      value={remiseItem}
                      onChange={handleSelectRemise}
                    >
                      <option value="1">0%</option>
                      <option value="0.95">5%</option>
                      <option value="0.90">10%</option>
                    </select>
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
            height: 700,
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
};

export default ListBoisDur;
