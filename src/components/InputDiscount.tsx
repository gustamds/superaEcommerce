import { ChangeEvent, useContext, useState } from "react"
import { toast } from "react-toastify";
import { AppContext } from "../App";
import discountValue from '../data/discountValue.json';

interface InputDiscountProps{
    setDiscountValue: (value: number) => void;
    valueDiscount: number;
}

export function InputDiscount({ setDiscountValue, valueDiscount }: InputDiscountProps){
    const { products } = useContext(AppContext);

    const [discountName, setDiscountName] = useState("");

    function handleDiscountChange(event : ChangeEvent<HTMLInputElement>){
        setDiscountName(event?.target.value)
    }

    function applyDiscount(){
        if(products.length > 0){
            if(discountName.length > 0){
                const descontoEncontrado = discountValue.find(discount => discount.name === discountName);
                if(descontoEncontrado){
                    setDiscountValue(descontoEncontrado.value)
                    toast.success('Cupom Aplicado!', {
                        position: "bottom-left",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    setDiscountName('');
                }else{
                    toast.error('Cupom Não Existe!', {
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
            }else{
                toast.warn('Por favor, Digite O Cupom De Desconto', {
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
        }else{
            toast.error('Adicione um produto para adicionar um cupom de desconto', {
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


    return(
        <div className="py-6 px-4 sm:px-6 flex justify-between">
            <input 
            type="text" 
            placeholder='Insira o seu Cupom' 
            value={discountName}
            onChange={handleDiscountChange}
            className="rounded-md placeholder:text-black p-2"
            />
            <button className="min-w-[11rem] flex items-center justify-center rounded-md border border-transparent transition duration-300 bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700" onClick={applyDiscount}>Aplicar Desconto</button>
        </div>
    )
}