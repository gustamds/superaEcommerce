import { Cart } from "./Cart";
import { Header } from "./Header";
import { ListAllGames } from "./ListAllGames";
import { ListGamesByPrice } from "./ListGamesByPrice";
import { ListGamesByScore } from "./ListGamesByScore";

export function Home(){
    return(
        <>
            <Header/>
            <ListAllGames/>
            <ListGamesByPrice/>
            <ListGamesByScore/>
            <Cart/>
        </>
    )
}