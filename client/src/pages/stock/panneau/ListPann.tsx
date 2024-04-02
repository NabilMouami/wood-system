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
import { RiAddCircleLine, RiDeleteBin3Fill } from "react-icons/ri";
import custom_axios from "../../../axios/AxiosSetup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import { detailsAcc } from "../../../actions/action";

import { ajouteEnBon } from "../../../actions/action";

import { GetPanneau, PostPanneau } from "../../../models/bois/Panneau";

function ListPann() {
  const [listBois, setListBois] = useState<Array<GetPanneau>>([]);

  const [quantity, setQuantity] = useState(0);
  const [remiseItem, setRemiseItem] = useState(1);
  const [open, setOpen] = useState(false);

  const [rowTable, setRowTable] = useState<GetPanneau>({} as GetPanneau);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const details = (dts: GetPanneau) => {
    dispatch(detailsAcc(dts) as any);
    navigate("/changer-panneau/" + dts.id);
  };
  useEffect(() => {
    custom_axios
      .get("stock/panneau", {
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
    setQuantity(row.piece_total);
  };
  const handleSelectRemise = (e: any) => {
    setRemiseItem(e.target.value);
  };

  const handleSubmitBon = (e: React.FormEvent) => {
    e.preventDefault();
    const item = {
      classbois: "panneau",
      type: rowTable.type,
      pieces: quantity,
      long: rowTable.long,
      quantity: quantity * rowTable.long * rowTable.larg,
      unity: "M2",
      prix_unity: rowTable.prix_unity,
      prix_total:
        rowTable.prix_unity * quantity * rowTable.long * rowTable.larg,
      remise: remiseItem,
    };
    dispatch(ajouteEnBon(item) as any);
    setOpen(!open);
    const data = {
      type: "panneau",
      marque: rowTable.type,
      pieces: rowTable.piece_total - quantity,
      quantity: toPrecision(quantity * rowTable.long * rowTable.larg, 2),
      qte: quantity,
      prix_unity: rowTable.prix_unity,
      prix_total: toPrecision(
        quantity *
          rowTable.long *
          rowTable.larg *
          rowTable.prix_unity *
          remiseItem,
        2
      ),
      long: rowTable.long,
      remise: remiseItem,
    };
    custom_axios.put(`/bon/panneau/livrpn/${rowTable.id}`, data).then((res) => {
      toast.success("Changement En Stock Success !!", {
        position: "top-right",
      });

      const indexOfItemInArray = listBois.findIndex(
        (q) => q.id === rowTable.id
      );
      if (indexOfItemInArray > -1) {
        listBois[indexOfItemInArray].piece_total =
          rowTable.piece_total - quantity;
      }
    });
  };
  //Delete Bois
  const deleteBois = (id: number) => {
    custom_axios
      .delete(`stock/panneau/${id}`, {
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
        Swal.fire("Supprimé!", "Panneau a été supprimé.", "success");
      }
    });
  }

  const columns = [
    {
      field: "modification",
      headerName: "Modifications",
      headerClassName: "super-app-theme--cell",
      width: 200,
      renderCell: (params: any) => {
        return (
          <>
            <button
              className="collabListEdit"
              onClick={() => details(params.row)}
            >
              Changer
            </button>

            {/* delete Panneau */}
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
      field: "fornisseur",
      headerName: "Fornisseur:",
      headerClassName: "super-app-theme--cell",

      width: 130,
    },

    {
      field: "piece_total",
      headerName: "Piece Total:",
      headerClassName: "super-app-theme--cell",
      width: 100,
    },
    {
      field: "long",
      headerName: "Longeur:",
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
      field: "prix_unity",
      headerName: "Prix Unite:",
      headerClassName: "super-app-theme--cell",

      width: 120,
    },
    {
      field: "date_creation",
      headerName: "Date Ajoute:",
      headerClassName: "super-app-theme--cell",
      width: 120,
    },
    {
      field: "code",
      headerName: "Code:",
      headerClassName: "super-app-theme--cell",

      width: 120,
    },
  ];

  return (
    <Fragment>
      <div className="flex items-center gap-4">
        <div className="bons">
          <Link to="/ajoute-panneau">
            <button className="addnewCollab">
              <span className="text-xl mr-5">+</span>Ajouter Panneau
            </button>
          </Link>
          <Typography className="m-4 underline" variant="h4" color="green">
            List Des Panneaux En Stock:
          </Typography>
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
                backgroundColor: "#1aff66",
                color: "#000",
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
      </div>
    </Fragment>
  );
}

export default ListPann;
