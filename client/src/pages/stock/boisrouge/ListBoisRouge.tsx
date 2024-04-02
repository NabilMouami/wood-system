import React, { useState, useEffect, Fragment } from "react";
import {
  DataGridPro,
  GridColDef,
  GridRowsProp,
  DataGridProProps,
} from "@mui/x-data-grid-pro";
import { DataGridPremium } from "@mui/x-data-grid-premium";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { RiAddCircleLine, RiDeleteBin3Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import { detailsAcc } from "../../../actions/action";

import { ajouteEnBon } from "../../../actions/action";
import { GetBoisRouge } from "../../../models/bois/BoisRouge";
import custom_axios from "../../../axios/AxiosSetup";
const ListBoisRouge = () => {
  const [listBois, setListBois] = useState<Array<GetBoisRouge>>([]);

  const [quantity, setQuantity] = useState(0);
  const [remiseItem, setRemiseItem] = useState(1);
  const [open, setOpen] = useState(false);

  const [rowTable, setRowTable] = useState<GetBoisRouge>({} as GetBoisRouge);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const details = (dts: GetBoisRouge) => {
    dispatch(detailsAcc(dts) as any);
    navigate("/changer-boisrouge/" + dts.id);
  };

  useEffect(() => {
    custom_axios
      .get("stock/boisrouge", {
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
    setQuantity(row.piece);
  };
  const handleSelectRemise = (e: any) => {
    setRemiseItem(e.target.value);
  };

  const handleSubmitBon = (e: React.FormEvent) => {
    e.preventDefault();
    const item = {
      classbois: "boisrouge",
      type: rowTable.type,
      pieces: quantity,
      long: rowTable.long,
      quantity: rowTable.long * quantity,
      unity: "ML",
      prix_unity: rowTable.prix_unity,
      prix_total: rowTable.long * quantity * rowTable.prix_unity * remiseItem,
      remise: remiseItem,
    };
    dispatch(ajouteEnBon(item) as any);
    setOpen(!open);
    const data = {
      type: "boisrouge",
      marque: rowTable.type,
      pieces: rowTable.piece - quantity,
      pieces_total: rowTable.pieces - quantity,
      quantity: toPrecision(rowTable.long * quantity, 2),
      qte: quantity,
      prix_unity: rowTable.prix_unity,
      prix_total: toPrecision(
        rowTable.long * quantity * rowTable.prix_unity * remiseItem,
        2
      ),
      long: rowTable.long,
      remise: remiseItem,
    };
  };
  //Delete Bois
  const deleteBois = (id: number) => {
    custom_axios.delete(`stock/boisrouges/${id}`).then(() => {
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
        Swal.fire("Supprimé!", "Accessoire a été supprimé.", "success");
      }
    });
  }

  const columns = [
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
      width: 150,
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
      field: "date_creation",
      headerName: "Date Ajoute:",
      headerClassName: "super-app-theme--cell",
      width: 150,
    },
    {
      field: "long",
      headerName: "Long En Fardou:",
      headerClassName: "super-app-theme--cell",
      width: 120,
    },
    {
      field: "piece",
      headerName: "Piece En Fardou:",
      headerClassName: "super-app-theme--cell",
      width: 120,
    },
    {
      field: "modification",
      headerName: "Modifications",
      headerClassName: "super-app-theme--cell",
      width: 180,
      renderCell: (params: any) => {
        return (
          <>
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
                popup(params.row.id, params.row.type);
              }}
            />
          </>
        );
      },
    },
  ];

  const getTreeDataPath: DataGridProProps["getTreeDataPath"] = (row) =>
    row.hierarchy;

  return (
    <Fragment>
      <div className="bons">
        <Link to="/ajoute-boisrouge">
          <button className="addnewCollab">
            <span className="text-xl mr-5">+</span>Ajouter Bois Rouge
          </button>
        </Link>
        <Typography className="m-4 underline" variant="h4" color="red">
          List Des Bois Rouge En Stock:
        </Typography>

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
              fontSize: "18px",
              fontFamily: "cursive",
            },
          }}
        >
          <DataGridPremium
            rows={listBois}
            columns={columns}
            getRowId={(row) => row.id}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            disableDensitySelector
            disableColumnSelector
            defaultGroupingExpansionDepth={-1}
            initialState={{
              rowGrouping: {
                model: ["n_fardou"],
              },
            }}
          />
        </Box>
      </div>
    </Fragment>
  );
};

export default ListBoisRouge;
