import { useEffect, useState } from "react";
import { AiOutlineClose } from 'react-icons/ai';
import { deleteCompanyById, getCompanyById } from "../../services/empresa";
import { deleteSupplierById, getSupplierById } from "../../services/fornecedor";

interface Modal {
    nmEmpresa: string;
    nmFornecedor: string;
}
export const Modal = ({id, closeModal, origin}: any) => {
    const showModal = false;
    const [values, setValues] = useState<Modal>();

    useEffect(() => {
        if(origin === 'Empresa'){
            getCompanyById(id).then(data => setValues(data.data))
            .catch(err => console.error(err))
        } else {
            getSupplierById(id).then(data => setValues(data.data))
            .catch(err => console.error(err))
        }
    }, []);

    const handleDeletingCompany = (event: any) => {
        event.preventDefault();
        if(origin === 'Empresa'){
            deleteCompanyById(id).then(() => window.location.reload())
            .catch(err => console.error(err))
        } else {
            deleteSupplierById(id).then(() => window.location.reload())
            .catch(err => console.error(err))
        }
    }

    return (
        <>
            <div id="defaultModal" tabIndex={-1} aria-hidden="true" className={`fixed inset-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto flex justify-center items-center`}>
                <div className="relative w-full h-full max-w-2xl md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <div></div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Deletar o registro de {origin === 'Empresa' ? values?.nmEmpresa : values?.nmFornecedor}
                            </h3>
                            <button 
                                type="button" 
                                onClick={() => closeModal(showModal)} 
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <AiOutlineClose size={20}/>
                            </button>
                        </div>
                        <div className="p-6 space-y-6 flex justify-center">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Esse processo não pode ser desfeito. Deseja continuar?
                            </p>
                        </div>
                        <div className="flex items-center justify-center p-6 space-x-2 dark:border-gray-600">
                            <button onClick={handleDeletingCompany}type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Deletar</button>
                            <button onClick={() => closeModal(showModal)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Fechar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed inset-0 w-full h-full bg-black z-20 opacity-80 duration-500"></div>
        </>
    )
}