import InputMask from "react-input-mask";

interface InputProps {
    value: string;
    onChange: any;
    name: string;
    mask: string;
    placeholder: string;
}
const onlyNumbers = (str: any) => str.replace(/[^0-9]/g, '');

export const Input = ({ value, onChange, name, mask, placeholder }: InputProps) => {
    function handleChange(event: any) {
        onChange({
          ...event,
          target: {
            ...event.target,
            name,
            value: onlyNumbers(event.target.value)
          }
        });
    }

    return (
        <InputMask
            className="border-2 border-zinc-600 p-1 rounded focus:border-cyan-200"
            name={name}
            mask={mask}
            value={value}
            id={name}
            onChange={handleChange}
            placeholder={placeholder}
            required={true}
        />
    );
}