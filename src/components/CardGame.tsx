import "react-toastify/dist/ReactToastify.css";
import { Coin, Coins, GameController, Play, Star } from "phosphor-react";
import { useState } from "react";
import { InputQuantity } from "./InputQuantity";

export interface ICardGameProps {
  id: number;
  image: string;
  brand: string;
  name: string;
  score: number;
  price: number;
  onBuy: (
    id: number,
    quantity: number,
    price: number,
    name: string,
    brand: string,
    image: string
  ) => void;
}

export function CardGame({
  id,
  image,
  brand,
  name,
  score,
  price,
  onBuy,
}: ICardGameProps) {
  const [gameQuantity, setGameQuantity] = useState(0);

  function handleIncrement() {
    setGameQuantity(gameQuantity + 1);
  }

  function handleDecrement() {
    if (gameQuantity > 0) {
      setGameQuantity(gameQuantity - 1);
    }
  }

  function handleBuy() {
      onBuy(id, gameQuantity, price, name, brand, image);
  }

  return (
    <div className="bg-slate-800 p-2 rounded-lg ml-28 mr-28 smSlider:m-0 smSlider:mb-8 mdSlider:ml-8 mdSlider:mr-8 lgSlider:ml-8 lgSlider:mr-8">
      <div>
        <img src={image} alt="" className="w-full" />
      </div>
      <div
        className={`pill rounded-sm text-xs px-1 gap-4 mr-2 w-28 flex justify-center items-center flex-row flex-wrap 
    ${
      brand === "PS4"
        ? "bg-blue-500"
        : brand === "XBOX"
        ? "bg-green-500"
        : "bg-red-500"
    }`}
      >
        <GameController size={16} color="#FFFFFF" />
        <p className="text-white">{brand}</p>
      </div>

      <div className="flex flex-col w-full justify-between">
        <div className="flex items-center gap-1 mt-4">
          <Play size={16} color="#FFFFFF" />
          <p className="text-white overflow-hidden whitespace-nowrap text-ellipsis">{name}</p>
        </div>
        <div className="flex items-center gap-1 mt-4">
          <Star size={16} color="#FFFFFF" />
          <p className="text-white">{score}</p>
          <p className="text-white">/</p>
          <p className="text-white">1000</p>
        </div>
      </div>
      <div className="flex flex-col w-full justify-between">
        <div className="flex items-center gap-1 mt-4">
          <Coin size={16} color="#FFFFFF" />
          <p className="text-white">{price}</p>
        </div>
        <div className="flex items-center gap-1 mt-4">
          <Coins size={16} color="#FFFFFF" />
          <p className="text-white">3x de {(price / 3).toFixed(2)}</p>
        </div>
      </div>
      <InputQuantity
      handleDecrement={handleDecrement}
      handleIncrement={handleIncrement}
      setValue={setGameQuantity}
      value={gameQuantity}
      />
      <div>
        <button
          onClick={handleBuy}
          className="w-full text-white mt-4 bg-green-800 rounded flex justify-center items-center hover:bg-green-600 transition duration-300 p-2"
        >
          Comprar
        </button>
      </div>
    </div>
  );
}
