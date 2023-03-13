import { useContext } from "react";
import { AppContext } from "../App";
import logoHeader from "../assets/logoHeader.png";
import cartIcon from '../assets/cart-icon.svg'

export function Header() {
  const { setOpen } = useContext(AppContext);

  function openCart() {
    setOpen(true);
  }

  return (
    <header>
      <nav className="px-2 sm:px-4 py-2.5 rounded bg-slate-800">
        <div className="flex justify-between items-center headerMobile:gap-2">

          <div className="flex items-center">
            <img className="w-20 h-auto headerMobile:w-12" src={logoHeader} alt="Logo" />
            <h5 className="text-white font-bold text-lg headerMobile:hidden">BUY GAMES</h5>
          </div>

          <div>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-white dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-white rounded-lg placeholder-white bg-slate-700 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Game"
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition duration-300"
              >
                Search
              </button>
            </div>
          </div>

          <button onClick={openCart}>
            <img src={cartIcon} alt="Carrinho" className="w-16 headerMobile:w-12" />
          </button>
        </div>
      </nav>
    </header>
  );
}
