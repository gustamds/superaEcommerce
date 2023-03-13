import { Dispatch, SetStateAction } from "react";

interface InputQuantityProps {
    handleDecrement: () => void;
    handleIncrement: () => void;
    value: number;
    setValue: Dispatch<SetStateAction<number>>;
}

export function InputQuantity({ handleDecrement, handleIncrement, value, setValue }: InputQuantityProps) {
  return (
    <div className="flex text-white justify-center items-center mt-4 gap-4">
      <button onClick={handleDecrement}>-</button>
      <input
        className="rounded w-12 text-black text-center"
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <button onClick={handleIncrement}>+</button>
    </div>
  );
}
