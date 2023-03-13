import { Fragment, useContext, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X } from "phosphor-react";
import { AppContext } from '../App';
import { InputCep } from './InputCep';
import { InputDiscount } from './InputDiscount';
import { toast } from 'react-toastify';

export function Cart() {
  const { products, setProducts, open, setOpen } = useContext(AppContext);

  const [frete, setFrete] = useState(0);
  const [discount, setDiscount] = useState(0);

  function handleIncreaseQuantity(id: number) {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id
          ? {...product, quantity: product.quantity + 1}
          : product
      )
    );
  }

  function handleDecreaseQuantity(id: number) {
    setProducts(prevProducts =>
      prevProducts.filter(product =>
        product.id !== id || product.quantity > 1
      )
      .map(product =>
        product.id === id && product.quantity > 1
          ? {...product, quantity: product.quantity - 1}
          : product
      )
    );
  }

  function removeItemCart(id : number){
    const productsWithOutDeleteOne = products.filter((product) => product.id !== id);
    setProducts(productsWithOutDeleteOne);
  }

  function alertCheckout(){
    if(total > 0){
      toast.info('No momento o checkout está em contrução, espero que entenda ❤', {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }else{
      toast.warn('Coloque itens no carrinho para finalizar a compra', {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  const subtotal = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);

  const total = subtotal + frete - discount;

  useEffect(() => {
    if(products.length === 0){
      setFrete(0);
      setDiscount(0);
    }
  }, [products]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-slate-800 shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className='flex flex-row gap-8 items-center'>
                          <Dialog.Title className="text-lg font-medium text-white">Carrinho</Dialog.Title>
                          <div className='pill rounded-full w-8 flex justify-center items-center font-bold bg-white text-black'>{products.length}</div>
                        </div>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <X className="h-6 w-6" aria-hidden="true" size={16}/>
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          {products.length === 0 && 
                          <>
                            <p className='text-white'>Seu Carrinho Está Vazio</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill='white' width="50px"
                            height="64px" viewBox="0 0 64 64" version="1.1">
                              <g id="empty-cart">
                                  <path
                                      d="M 29.691406 40.304688 C 29.804688 41.371094 30.703125 42.164062 31.753906 42.164062 C 31.824219 42.164062 31.894531 42.160156 31.96875 42.152344 C 33.105469 42.035156 33.933594 41.015625 33.816406 39.878906 L 32.859375 30.625 C 32.742188 29.488281 31.722656 28.660156 30.585938 28.777344 C 29.445312 28.894531 28.617188 29.914062 28.738281 31.050781 Z M 29.691406 40.304688 " />
                                  <path
                                      d="M 42.667969 42.152344 C 42.738281 42.160156 42.8125 42.164062 42.882812 42.164062 C 43.933594 42.164062 44.832031 41.371094 44.941406 40.304688 L 45.898438 31.050781 C 46.015625 29.914062 45.1875 28.894531 44.050781 28.777344 C 42.910156 28.660156 41.890625 29.488281 41.773438 30.625 L 40.816406 39.875 C 40.699219 41.015625 41.527344 42.035156 42.667969 42.152344 Z M 42.667969 42.152344 " />
                                  <path
                                      d="M 26.613281 51.164062 C 23.074219 51.164062 20.195312 54.042969 20.195312 57.582031 C 20.195312 61.121094 23.074219 64 26.613281 64 C 30.152344 64 33.03125 61.121094 33.03125 57.582031 C 33.03125 54.042969 30.152344 51.164062 26.613281 51.164062 Z M 26.613281 59.855469 C 25.363281 59.855469 24.34375 58.835938 24.34375 57.582031 C 24.34375 56.328125 25.363281 55.308594 26.613281 55.308594 C 27.867188 55.308594 28.886719 56.328125 28.886719 57.582031 C 28.886719 58.835938 27.867188 59.855469 26.613281 59.855469 Z M 26.613281 59.855469 " />
                                  <path
                                      d="M 48.019531 51.164062 C 44.484375 51.164062 41.605469 54.042969 41.605469 57.582031 C 41.605469 61.121094 44.480469 64 48.019531 64 C 51.558594 64 54.4375 61.121094 54.4375 57.582031 C 54.4375 54.042969 51.558594 51.164062 48.019531 51.164062 Z M 48.019531 59.855469 C 46.769531 59.855469 45.75 58.835938 45.75 57.582031 C 45.75 56.328125 46.769531 55.308594 48.019531 55.308594 C 49.273438 55.308594 50.292969 56.328125 50.292969 57.582031 C 50.292969 58.835938 49.273438 59.855469 48.019531 59.855469 Z M 48.019531 59.855469 " />
                                  <path
                                      d="M 60.421875 21.859375 C 60.03125 21.351562 59.425781 21.054688 58.78125 21.054688 L 17.457031 21.054688 L 15.722656 14.382812 C 15.484375 13.46875 14.660156 12.832031 13.714844 12.832031 L 5.21875 12.832031 C 4.074219 12.832031 3.144531 13.757812 3.144531 14.902344 C 3.144531 16.046875 4.074219 16.976562 5.21875 16.976562 L 12.113281 16.976562 L 13.832031 23.597656 C 13.84375 23.632812 13.851562 23.667969 13.863281 23.707031 L 20.261719 48.320312 C 20.5 49.234375 21.324219 49.871094 22.269531 49.871094 L 52.367188 49.871094 C 53.308594 49.871094 54.136719 49.234375 54.371094 48.320312 L 60.789062 23.648438 C 60.949219 23.027344 60.816406 22.367188 60.421875 21.859375 Z M 50.761719 45.726562 L 23.875 45.726562 L 18.535156 25.203125 L 56.101562 25.203125 Z M 50.761719 45.726562 " />
                                  <path
                                      d="M 29.179688 14.609375 C 29.582031 15.015625 30.113281 15.214844 30.644531 15.214844 C 31.175781 15.214844 31.707031 15.015625 32.109375 14.609375 C 32.921875 13.800781 32.921875 12.484375 32.109375 11.675781 L 25.589844 5.160156 C 24.78125 4.351562 23.46875 4.351562 22.65625 5.160156 C 21.847656 5.96875 21.847656 7.28125 22.660156 8.09375 Z M 29.179688 14.609375 " />
                                  <path
                                      d="M 44 15.214844 C 44.53125 15.214844 45.0625 15.011719 45.46875 14.609375 L 51.976562 8.09375 C 52.789062 7.28125 52.785156 5.96875 51.976562 5.160156 C 51.167969 4.351562 49.855469 4.351562 49.042969 5.160156 L 42.535156 11.679688 C 41.726562 12.488281 41.726562 13.800781 42.535156 14.609375 C 42.941406 15.015625 43.46875 15.214844 44 15.214844 Z M 44 15.214844 " />
                                  <path
                                      d="M 37.320312 13.355469 C 38.464844 13.355469 39.394531 12.425781 39.394531 11.28125 L 39.394531 2.074219 C 39.394531 0.929688 38.46875 0 37.324219 0 C 36.179688 0 35.25 0.929688 35.25 2.074219 L 35.246094 11.28125 C 35.246094 12.425781 36.175781 13.355469 37.320312 13.355469 Z M 37.320312 13.355469 " />
                              </g>
                            </svg>
                            <button
                            type="button"
                            className="font-medium transition duration-300 text-indigo-500 hover:text-indigo-600 ml-2"
                            onClick={() => setOpen(false)}
                            >
                              Adicione alguns jogos!
                            </button>
                          </>
                          }
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {products.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.image}
                                    alt="Imagem do Jogo"
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-white">
                                      <h3>
                                        <p>{product.name}</p>
                                      </h3>
                                      <p className="ml-4">R${(product.price * product.quantity).toFixed(2)}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-white">{product.brand}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <button className='text-white' onClick={() => handleDecreaseQuantity(product.id)}>-</button>
                                    <p className="text-white">Quantidade: {product.quantity}</p>
                                    <button className='text-white' onClick={() => handleIncreaseQuantity(product.id)}>+</button>
                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-500 hover:text-indigo-600 transition duration-300"
                                        onClick={() => removeItemCart(product.id)}
                                      >
                                        Remover Item
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <InputCep setFreteValue={setFrete} freteValue={frete}/>
                    <InputDiscount setDiscountValue={setDiscount} valueDiscount={discount}/>

                    <div className="border-t border-b border-gray-200 py-6 px-4 sm:px-6 flex flex-col gap-2">
                      <div className="flex justify-between text-base font-medium text-white">
                        <p>Subtotal</p>
                        <p>R${subtotal.toFixed(2)}</p>
                      </div>
                      {frete > 0 && <div className="flex justify-between text-base font-medium text-white">
                        <p>Frete</p>
                        <p>R${frete.toFixed(2)}</p>
                      </div>}
                      
                      {discount > 0 && <div className="flex justify-between text-base font-medium text-white">
                        <p>Desconto</p>
                        <p>-R${discount.toFixed(2)}</p>
                      </div>}

                    </div>
                    
                    <div className="py-6 px-4 sm:px-6 flex justify-between font-bold text-lg text-white">
                      <p>Total</p>
                      <p>R${total.toFixed(2)}</p>
                    </div>

                    <div className="border-t border-b border-gray-200 py-6 px-4 sm:px-6">
                      <div className="mt-6">
                        <a
                          href='#'
                          className="flex items-center justify-center rounded-md border border-transparent transition duration-300 bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          onClick={alertCheckout}
                        >
                          Ir Para Pagamento
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p className='text-white'>
                          Ou
                          <button
                            type="button"
                            className="font-medium transition duration-300 text-indigo-500 hover:text-indigo-600 ml-2"
                            onClick={() => setOpen(false)}
                          >
                            Continue Comprando!
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}