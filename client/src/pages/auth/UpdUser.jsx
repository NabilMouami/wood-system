import "./users.css";

import { useState } from "react";
import { RiMailAddFill, RiUser2Fill, RiUser2Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import custom_axios from "../../axios/AxiosSetup";

function UpdUser() {
  const Detail = useSelector((state) => state.Load);
  const { Col } = Detail;
  const [firstName, setNom] = useState(Col.firstName);
  const [lastName, setPrenom] = useState(Col.lastName);
  const [email, setEmail] = useState(Col.email);
  const [password, setPassword] = useState(Col.password);
  const [role, setRole] = useState(Col.role);
  const handleSelect = (e) => {
    setRole(e.target.value);
  };
  const post = { firstName, lastName, email, password };
  console.log(JSON.stringify({ ...post, role }));

  const submitHandler = (e) => {
    e.preventDefault();
    custom_axios
      .put(`/user/${Col.id}`, JSON.stringify({ ...post, role }), {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        toast.success("Changement Success !!", {
          position: "bottom-left",
        });
      });
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Éditer Utilisateur:</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <div className="userShowTopTitle">
              <span className="userShowUsername">
                {Col.firstName + " " + Col.lastName}
              </span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Détails du compte</span>
            <div className="userShowInfo">
              <RiUser2Fill className="userShowIcon" />
              <span className="userShowInfoTitle">{Col.firstName}</span>
            </div>
            <div className="userShowInfo">
              <RiUser2Line className="userShowIcon" />
              <span className="userShowInfoTitle">{Col.lastName}</span>
            </div>
            <span className="userShowTitle">Détails du contact</span>
            <div className="userShowInfo">
              <RiMailAddFill className="userShowIcon" />
              <span className="userShowInfoTitle">{Col.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Éditer</span>
          <form className="userUpdateForm" onSubmit={submitHandler}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Nom</label>
                <input
                  type="text"
                  placeholder="nom"
                  className="userUpdateInput"
                  defaultValue={Col.firstName}
                  onChange={(event) => {
                    setNom(event.target.value);
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label>Prénom</label>
                <input
                  type="text"
                  placeholder="prénom"
                  className="userUpdateInput"
                  defaultValue={Col.lastName}
                  onChange={(event) => {
                    setPrenom(event.target.value);
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="email@gmail.com"
                  className="userUpdateInput"
                  defaultValue={Col.email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label>Role</label>
                <select value={role} onChange={handleSelect}>
                  <option value="ADMIN">Admin</option>
                  <option value="NORMAL_USER_ROLE">No-Admin</option>
                </select>
              </div>

              <div className="userUpdateItem">
                <label>Mot de passe</label>
                <input
                  type="text"
                  placeholder="password"
                  className="userUpdateInput"
                  defaultValue={Col.password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <button type="submit" className="userUpdateButton">
                Mettre à jour
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdUser;
