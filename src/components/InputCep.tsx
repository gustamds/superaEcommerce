import axios from "axios"
import { ChangeEvent, useContext, useState } from "react"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../App";
import FreteValue from '../data/freteValue.json';

interface InputCepProps{
    setFreteValue: (value: number) => void;
    freteValue: number;
}


export function InputCep({ setFreteValue, freteValue }:InputCepProps) {
    const { products } = useContext(AppContext);
    const [cep, setCep] = useState('');
    const [result, setResult] = useState('');

    function handleCepChange(event : ChangeEvent<HTMLInputElement>){
        setCep(event?.target.value);
    }

    function searchCep(){
        if(products.length > 0){
            if(cep.length === 8){
                axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                .then((response) => {
                    if(response.data.erro === true){
                        toast.error('Não encontramos seu cep', {
                            position: "bottom-left",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                    }else{
                        setResult(response.data);
                        const freteEncontrado = FreteValue.find(frete => frete.uf === response.data.uf);
                        if (freteEncontrado) {
                        setFreteValue(freteEncontrado.frete);
                        }
                        toast.success('Cep Encontrado!', {
                            position: "bottom-left",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                        setCep('');
                    }
                })
                .catch((error) => {
                    console.log(error);
                    toast.error('Não conseguimos processar a requisição', {
                        position: "bottom-left",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                })
            }else{
                toast.warn('Digite todos os digitos do CEP!', {
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
            toast.error('Adicione um produto para calcular o frete', {
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
            placeholder='Insira o seu CEP' 
            value={cep}
            onChange={handleCepChange}
            className="rounded-md placeholder:text-black p-2"
            />
            <button className="min-w-[11rem] flex items-center justify-center rounded-md border border-transparent transition duration-300 bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700" onClick={searchCep}>Calcular Frete</button>
        </div>
    )
}