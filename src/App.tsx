import { useState, createContext, useEffect } from 'react'
import './App.css'
import { ICardGameProps } from './components/CardGame'
import { Home } from './components/Home';
import Games from './data/products.json';

interface IProducts{
  id: number,
  image: string,
  brand: string,
  name: string,
  price: number,
  quantity: number,
}

export interface IAppContenxt{
  allGames: ICardGameProps[];
  setAllGames: React.Dispatch<React.SetStateAction<ICardGameProps[]>>;
  products: IProducts[];
  setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>
  open : boolean;
  setOpen:  React.Dispatch<React.SetStateAction<boolean>>
}

export const AppContext = createContext<IAppContenxt>({
  allGames: [],
  setAllGames: () => {},
  products: [],
  setProducts: () => {},
  open: false,
  setOpen: () => {},
})

export function App() {
  const [allGames, setAllGames] = useState<ICardGameProps[]>([]);
  const [products, setProducts] = useState<IProducts[]>([]);
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // @ts-ignore
    setAllGames(Games);
  }, []);

  return (
    <AppContext.Provider value={{ allGames, setAllGames, products, setProducts, open, setOpen }}>
      <div className="bg-slate-900 p-16 pt-0">
        <Home/>
      </div>
    </AppContext.Provider>
  )
}
