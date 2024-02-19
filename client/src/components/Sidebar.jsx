import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// Icons
import {
  RiLogoutCircleRLine,
  RiArrowRightSLine,
  RiMenu3Line,
  RiCloseLine,
  RiAdminFill,
  RiDashboardLine,
  RiStore3Line,
  RiBookletFill,
  RiBookReadLine,
  RiCalendarCheckFill,
  RiBillLine,
} from "react-icons/ri";

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const navigate = useNavigate();
  const Logout = async () => {
    await localStorage.removeItem("token");
    await navigate("/login");
  };
  return (
    <>
      <div
        className={`xl:h-[100vh] overflow-y-scroll fixed xl:static w-[80%] md:w-[40%] lg:w-[30%] xl:w-auto h-full top-0 bg-secondary-100 p-4 flex flex-col justify-between z-50 ${
          showMenu ? "left-0" : "-left-full"
        } transition-all`}
      >
        <div>
          <div className="flex flex-col items-center">
            <h1 className="text-center text-xl font-bold text-white mb-2">
              Daziz <span className="text-orange-400">Wood</span>
              <span className="text-primary text-4xl">.</span>
            </h1>
            <img
              src="/dazizwood.jpg"
              alt="logo-society"
              className="rounded-full"
              width="100"
              height="100"
            />
            <hr className="w-full my-3 border-white-500/30" />
          </div>
          <ul className="font-bold tracking-wide">
            <li>
              <Link
                to="/"
                className="flex items-center gap-4 py-4 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <RiDashboardLine className="text-primary" /> Statistics
              </Link>
            </li>
            <li>
              <button
                onClick={() => setShowSubmenu(!showSubmenu)}
                className="w-full flex items-center justify-between py-4 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <span className="flex items-center gap-4">
                  <RiStore3Line className="text-primary" />
                  Stock Bois
                </span>
                <RiArrowRightSLine
                  className={`mt-1 ${
                    showSubmenu && "rotate-90"
                  } transition-all`}
                />
              </button>
              <ul
                className={` ${
                  showSubmenu ? "h-auto" : "h-0"
                } overflow-y-hidden transition-all text-orange-300`}
              >
                <li>
                  <Link
                    to="/list-boisblanc"
                    className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors"
                  >
                    Bois Blanc
                  </Link>
                </li>
                <li>
                  <Link
                    to="/list-boisdur"
                    className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-gray-500 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors"
                  >
                    Bois Dur
                  </Link>
                </li>
                <li>
                  <Link
                    to="/creer-bon-bagage"
                    className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors"
                  >
                    Bois Rouge
                  </Link>
                </li>
                <li>
                  <Link
                    to="/creer-bon-bagage"
                    className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors"
                  >
                    Contre-Plaque
                  </Link>
                </li>
                <li>
                  <Link
                    to="/creer-bon-bagage"
                    className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors"
                  >
                    Panneaux
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                to="/users"
                className="flex items-center gap-4 py-4 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <RiBookletFill className="text-primary" />
                Bon Livraison
              </Link>
            </li>
            <li>
              <Link
                to="/users"
                className="flex items-center gap-4 py-4 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <RiBookReadLine className="text-primary" />
                Bon Commande
              </Link>
            </li>
            <li>
              <Link
                to="/users"
                className="flex items-center gap-4 py-4 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <RiCalendarCheckFill className="text-primary" />
                Devis
              </Link>
            </li>
            <li>
              <Link
                to="/users"
                className="flex items-center gap-4 py-4 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <RiBillLine className="text-primary" />
                Facteur
              </Link>
            </li>

            <li>
              <Link
                to="/users"
                className="flex items-center gap-4 py-4 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <RiAdminFill className="text-primary" />
                Utilisateurs
              </Link>
            </li>
            <li>
              <Link
                to="/clients"
                className="flex items-center gap-4 py-4 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <RiAdminFill className="text-primary" />
                Clients
              </Link>
            </li>
          </ul>
        </div>
        <button
          onClick={() => Logout()}
          className="flex items-center gap-4 py-4 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
        >
          <RiLogoutCircleRLine className="text-red-500" /> Log out
        </button>
      </div>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="xl:hidden fixed top-3 left-4 bg-primary text-black p-3 rounded-full z-50"
      >
        {showMenu ? <RiCloseLine /> : <RiMenu3Line />}
      </button>
    </>
  );
};

export default Sidebar;
