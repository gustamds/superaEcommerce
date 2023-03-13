import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Slider from "react-slick";
import { CardGame } from "./CardGame";

import { useContext } from "react";
import { AppContext } from "../App";

export function ListGamesByPrice(){
    const {allGames, setProducts, products, setOpen} = useContext(AppContext);
    
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 920,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 660,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    console.log(allGames, 'LISTALLGAMES');

    const IMAGE_PATH = import.meta.env.BASE_URL + "src/assets/";

    function handleBuyGame(id: number, quantity: number, price: number, name: string, brand: string, image: string) {
        if (quantity > 0) {
          const existingIndex = products.findIndex((product) => product.id === id);
          console.log(existingIndex, 'INDEX')
          if (existingIndex !== -1) {
            const updatedProducts = [...products];
            updatedProducts[existingIndex].quantity += quantity;
            setProducts(updatedProducts);
            setOpen(true);
          } else {
            setProducts([
              ...products,
              {
                id: id,
                image: image,
                brand: brand,
                name: name,
                price: price,
                quantity: quantity,
              },
            ]);
            setOpen(true);
          }
      
          toast.success("Item adicionado com sucesso!", {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          toast.warn("Escolha uma quantidade para o item", {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
    }

    const sorteGames = allGames.sort((game1 , game2) => game1.price - game2.price);

    console.log(products, 'PRODUTOS DO CARRINHO');

    return(
        <div>
            <p className="ml-28 mb-4 text-white font-bold mt-8 headerMobile:ml-0 headerMobile:mb-2 headerMobile:mt-8">JOGOS MAIS BARATOS</p>
            <Slider {...settings}>
                {sorteGames.map(game => {
                    return(
                        <CardGame
                        brand={game.brand}
                        image={IMAGE_PATH + game.image}
                        name={game.name}
                        price={game.price}
                        key={game.id}
                        score={game.score} 
                        id={game.id}
                        onBuy={handleBuyGame}
                        />
                    );
                })}    
            </Slider>
            <ToastContainer
            position="bottom-left"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
        </div>
    )
}