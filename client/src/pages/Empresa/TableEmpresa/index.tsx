import { useEffect, useState } from "react";
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import { Link } from "react-router-dom";
import { Modal } from "../../../components/Modal";
import { getCompany } from "../../../services/empresa";
import { RX_CNPJ } from "../../../Utils/utils";

export const TableEmpresa = () => {
    const [ dataCompany, setDataCompany ] = useState<any>();
    const [ showModal, setShowModal ] = useState<any>(false);
    const [ id, setId ] = useState<number>();

    useEffect(() => {
        getCompany().then(resEmp=> {setDataCompany(resEmp.data)});
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

    const cnpjMask = (value: any) => {
        if (value) {
            return value.slice(-14).replace(RX_CNPJ, '$1.$2.$3/$4-$5');
        } else {
            return '';
        }
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Cnpj</th>
                        <th scope="col" className="px-6 py-3">Empresa</th>
                        <th scope="col" className="px-6 py-3">CEP</th>
                        <th scope="col" className="px-6 py-3"></th>
                        <th scope="col" className="px-6 py-3"></th>
                        <th scope="col" className="px-6 py-3">Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {dataCompany && dataCompany.map((item: any) => {
                        return (
                            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={item.id}>
                                <td className="px-6 py-4">{cnpjMask(item.cnpj)}</td>
                                <td className="px-6 py-4">{item.nmEmpresa}</td>
                                <td className="px-6 py-4">{cepMask(item.cep)}</td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4 flex gap-2">
                                    <Link to={`/empresa_form/${item.id }`}>
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
            {showModal && <Modal id={id} closeModal={showModal_} origin={"Empresa"}/>}
        </div>
    )
}