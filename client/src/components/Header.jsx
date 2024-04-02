import React, { useEffect } from "react";
import {
  RiNotification3Line,
  RiArrowDownSLine,
  RiSettings3Line,
  RiLogoutCircleRLine,
  RiThumbUpLine,
  RiChat3Line,
  RiTranslate,
  RiUser2Fill,
} from "react-icons/ri";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { Link, useNavigate } from "react-router-dom";
import { getLoginInfo } from "../utils/LoginInfo";
import { useSelector } from "react-redux";
const Header = () => {
  const { Bon } = useSelector((state) => state);
  const { cart } = Bon;
  const navigate = useNavigate();

  useEffect(() => {
    if (getLoginInfo() == null) return navigate("/login");
  }, []);
  const userId = getLoginInfo()?.userId;
  const firstName = getLoginInfo()?.firstName;
  const lastName = getLoginInfo()?.lastName;
  const email = getLoginInfo()?.email;

  const Logout = async () => {
    await localStorage.removeItem("token");
    await navigate("/login");
  };

  return (
    <header className="h-[7vh] md:h-[10vh] bg-white border-b border-secondary-100 p-8 flex items-center justify-end">
      <nav className="flex items-center gap-2">
        <Menu
          menuButton={
            <MenuButton className="relative hover:bg-secondary-100 p-2 rounded-lg text-black">
              <RiTranslate />
            </MenuButton>
          }
          align="end"
          arrow
          transition
          arrowClassName="bg-secondary-100"
          menuClassName="bg-secondary-100 p-4"
        >
          <h1 className="text-gray-300 text-center font-medium">Langues (2)</h1>
          <hr className="my-6 border-gray-500" />
          <MenuItem className="p-0 hover:bg-transparent">
            <div className="text-orange-300 flex flex-1 items-center gap-4 py-2 px-4 hover:bg-secondary-900 transition-colors rounded-lg">
              <img
                src="/images/france.jpg"
                className="w-8 h-8 object-cover rounded-full"
              />
              <div className="text-sm flex flex-col">
                <span className="font-bold ml-4">Francais</span>
              </div>
            </div>
          </MenuItem>

          <MenuItem className="p-0 hover:bg-transparent">
            <div className="text-orange-500 flex flex-1 items-center gap-4 py-2 px-4 hover:bg-secondary-900 transition-colors rounded-lg">
              <img
                src="/images/espagne.jpg"
                className="w-8 h-8 object-cover rounded-full"
              />
              <div className="text-sm flex flex-col">
                <span className="font-bold ml-4">Espagne</span>
              </div>
            </div>
          </MenuItem>
        </Menu>
        <Menu
          menuButton={
            <MenuButton className="relative hover:bg-secondary-100 p-2 rounded-lg transition-colors">
              <RiNotification3Line />
              <span className="absolute -top-0.5 right-0 bg-primary py-0.5 px-[5px] box-content text-black rounded-full text-[8px] font-bold">
                {cart?.length}
              </span>
            </MenuButton>
          }
          align="end"
          arrow
          transition
          arrowClassName="bg-secondary-100"
          menuClassName="bg-secondary-100 p-4"
        >
          <h1 className="text-gray-300 text-center font-medium">
            Notificaciones (2)
          </h1>
          <hr className="my-6 border-gray-500" />
          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              to="/"
              className="text-gray-300 flex flex-1 items-center gap-4 py-2 px-4 hover:bg-secondary-900 transition-colors rounded-lg"
            >
              <img
                src="https://img.freepik.com/foto-gratis/feliz-optimista-guapo-gerente-ventas-latina-apuntando-lado-mirando-camara_1262-12679.jpg"
                className="w-8 h-8 object-cover rounded-full"
              />
              <div className="text-sm flex flex-col">
                <div className="flex items-center justify-between gap-4">
                  <span>Jorge Luis Trejo</span>{" "}
                  <span className="text-[8px]">21/10/2022</span>
                </div>
                <p className="text-gray-500 text-xs">
                  Lorem ipsum dolor sit amet...
                </p>
              </div>
            </Link>
          </MenuItem>
          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              to="/"
              className="text-gray-300 flex flex-1 items-center gap-4 py-2 px-4 hover:bg-secondary-900 transition-colors rounded-lg"
            >
              <RiThumbUpLine className="p-2 bg-blue-200 text-blue-700 box-content rounded-full" />
              <div className="text-sm flex flex-col">
                <div className="flex items-center justify-between gap-4">
                  <span>Nuevo like</span>{" "}
                  <span className="text-[8px]">21/10/2022</span>
                </div>
                <p className="text-gray-500 text-xs">
                  A Jorge Trejo le gusta tu pub...
                </p>
              </div>
            </Link>
          </MenuItem>
          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              to="/"
              className="text-gray-300 flex flex-1 items-center gap-4 py-2 px-4 hover:bg-secondary-900 transition-colors rounded-lg"
            >
              <RiChat3Line className="p-2 bg-yellow-200 text-yellow-700 box-content rounded-full" />
              <div className="text-sm flex flex-col">
                <div className="flex items-center justify-between gap-4">
                  <span>Nuevo comentario</span>{" "}
                  <span className="text-[8px]">21/10/2022</span>
                </div>
                <p className="text-gray-500 text-xs">
                  Jorge Trejo ha comentado tu...
                </p>
              </div>
            </Link>
          </MenuItem>
          <hr className="my-6 border-gray-500" />
          <MenuItem className="p-0 hover:bg-transparent flex justify-center cursor-default">
            <Link
              to="/"
              className="text-gray-400 text-sm hover:text-white transition-colors"
            >
              Todas las notificaciones
            </Link>
          </MenuItem>
        </Menu>
        <Menu
          menuButton={
            <MenuButton className="flex items-center gap-x-2 hover:bg-secondary-100 p-2 rounded-lg transition-colors">
              <img
                src="https://img.freepik.com/foto-gratis/feliz-optimista-guapo-gerente-ventas-latina-apuntando-lado-mirando-camara_1262-12679.jpg"
                className="w-6 h-6 object-cover rounded-full"
              />
              <span>
                {firstName} {lastName}
              </span>
              <RiArrowDownSLine />
            </MenuButton>
          }
          align="end"
          arrow
          arrowClassName="bg-secondary-100"
          transition
          menuClassName="bg-secondary-100 p-4"
        >
          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              to={"/perfil/" + userId}
              className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 py-2 px-6 flex-1"
            >
              <img
                src="https://img.freepik.com/foto-gratis/feliz-optimista-guapo-gerente-ventas-latina-apuntando-lado-mirando-camara_1262-12679.jpg"
                className="w-8 h-8 object-cover rounded-full"
              />
              <div className="flex flex-col text-sm">
                <span className="text-sm">
                  {firstName} {lastName}
                </span>
                <span className="text-xs text-gray-500">{email}</span>
              </div>
            </Link>
          </MenuItem>
          <hr className="my-4 border-gray-500" />
          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              to={"/perfil/" + userId}
              className="rounded-lg transition-colors text-red-400 hover:bg-secondary-900 flex items-center gap-x-4 py-2 px-6 flex-1"
            >
              <RiUser2Fill /> Profile
            </Link>
          </MenuItem>
          <MenuItem className="p-0 hover:bg-transparent">
            <Link to="/cerrar-sesion">
              <button
                onClick={() => Logout()}
                className="rounded-lg transition-colors text-red-400 hover:bg-secondary-900 flex items-center gap-x-4 py-2 px-6 flex-1"
              >
                <RiLogoutCircleRLine /> Log out
              </button>
            </Link>
          </MenuItem>
        </Menu>
      </nav>
    </header>
  );
};

export default Header;
