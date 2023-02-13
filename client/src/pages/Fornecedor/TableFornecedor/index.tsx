import { useEffect, useState } from "react";
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import { Link } from "react-router-dom";
import { Fornecedor } from "../../../interface/fornecedor.interface";
import { Modal } from "../../../components/Modal";
import { RX_CNPJ, RX_CPF } from "../../../Utils/utils";
import { getSupplier } from "../../../services/fornecedor";

export const TableFornecedor = () => {
    const [ showModal, setShowModal ] = useState<any>(false);
    const [ id, setId ] = useState<number>();
    const [ fornecedor, setFornecedor ] = useState<Fornecedor[]>();

    useEffect(() => {
        getSupplier()
        .then(data => setFornecedor(data.data))
    }, []);
    
    const showModal_ = (id: any) => {
        setShowModal(!showModal);
        setId(id);
    }

    const cepMask = (value: any) => {
        const mask = value.split('');
        mask.splice(5, 0, "-");
        return mask
    }

    const cnpj_cpfMask = (value: any) => {
        if (value.length <= 11) {
            return value.replace(RX_CPF, '$1.$2.$3/$4');
        } else if(value.length > 11) {
            return value.slice(-14).replace(RX_CNPJ, '$1.$2.$3/$4-$5');
        }
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Cnpj/Cpf</th>
                        <th scope="col" className="px-6 py-3">Fornecedor</th>
                        <th scope="col" className="px-6 py-3">CEP</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {fornecedor && fornecedor.map((item: Fornecedor) => {
                        return (
                            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={item.id}>
                                <td className="px-6 py-4">{cnpj_cpfMask(item.cnpj_Cpf)}</td>
                                <td className="px-6 py-4">{item.nmFornecedor}</td>
                                <td className="px-6 py-4">{cepMask(item.cep)}</td>
                                <td className="px-6 py-4">{item.email}</td>
                                <td className="px-6 py-4 flex gap-2">
                                    <Link to={`/fornecedor_form/${item.id}`}>
                                        <BsFillPencilFill />
                                    </Link>
                                    <button onClick={() => showModal_(item.id)}>
                                        <BsFillTrashFill />
                                    </button>
                                </td>
                            </tr>
                            )
                        })}
                </tbody>
            </table>
            {showModal && <Modal id={id} closeModal={showModal_} origin={"Fornecedor"}/>}
        </div>
    )
}