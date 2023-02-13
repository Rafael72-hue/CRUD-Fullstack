import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Input } from "../../../components/Input";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { addNewSupplier, getSupplierById, updateSupplierById } from "../../../services/fornecedor";

const initialfornecedor = {
    cep: '',
    cnpj_Cpf: '',
    nmFornecedor: '',
    email: ''
};
  
export const FornecedorFormComponent = () => {
    const [fornecedor, setFornecedor] = useState(initialfornecedor);
    const [isCepValid, setIsCepValid] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    
    function handleChange(event: any) {
        setFornecedor({
            ...fornecedor,
            [event.target.name]: event.target.value
        });

        if(event.target && event.target.name === 'cep') {
            checkCepIsValid(event.target.value);
        }
    }

    const checkCepIsValid = (cepNumber: any) => {
        if(cepNumber.length === 8) {
        let getStatus: any;
            const xhr = new XMLHttpRequest();
            xhr.open ("GET", `http://cep.la/${cepNumber}`, true);
            xhr.setRequestHeader ("Accept", "application/json");
            xhr.onreadystatechange = function(){
                if((xhr.readyState == 0 || xhr.readyState == 4) && xhr.status == 200)
                getStatus = JSON.parse(xhr.responseText);
                if(getStatus.cep){
                    setIsCepValid(true);
                }
            };
            xhr.send(null);
        }
    }

    const handleAddingNewCompany = (event: any) => {
        event.preventDefault();
        if (
            !fornecedor.cep || 
            !fornecedor.cnpj_Cpf || 
            !fornecedor.nmFornecedor || 
            !fornecedor.email || 
            (fornecedor.cnpj_Cpf.length < 11 && fornecedor.cnpj_Cpf.length !== 0)
        ) {
            toast.error("Por favor preencher todos os campos!");
        }  else if (!isCepValid) {
            toast.error("Cep inválido! verifque se foi digitado corretamente.")
        } else {
            addNewSupplier(fornecedor)
            .then(data=> {
                toast.success("Fornecedor foi registrada com sucesso!")
                navigate(`/fornecedor_form/${data.data.id}`)}
            )
            .catch(err => toast.error(err))
        }
    }

    const handleUpdatingCompanyById = (event: any) => {
        event.preventDefault();
        if (!isCepValid) {
            toast.error("Cep inválido! verifque se foi digitado corretamente.")
        } else {
            updateSupplierById(fornecedor, id)
            .then(data=> toast.success("Dados do fornecedor foram atualizados com sucesso!"))
            .catch(err => toast.error(err))
        }
    }

    useEffect(() => {
        if(id){
            getSupplierById(id)
            .then(data => setFornecedor(data.data))
            .catch(err => toast.error(err))
        }
    }, [])
    
    return (
        <div className="flex justify-center items-center flex-col mt-12 relative">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <header className="flex justify-between w-3/6">
                <span className="font-bold text-3xl">{id ? 'Atualizar fornecedor' : 'Adicionar fornecedor'}</span>
            </header>

            <section className="grid grid-cols-3 border-gray-800 w-3/6 gap-3 shadow-lg shadow-slate-500 p-10 rounded-sm mt-10" >
                <div className="flex flex-col gap-1 col-span-1">
                    <label htmlFor="cnpj_Cpf" className="font-semibold">Cnpj/Cpf</label>
                    <Input   
                        name="cnpj_Cpf"
                        mask={fornecedor.cnpj_Cpf.length > 11 ?"99.999.999/9999-99" : "999.999.999-999"}
                        onChange={handleChange}
                        value={fornecedor.cnpj_Cpf}
                        placeholder={fornecedor.cnpj_Cpf && fornecedor.cnpj_Cpf.length > 11 ?"00.000.000/0000-00" : "000.000.000-00"}
                        />
                        {(fornecedor.cnpj_Cpf.length < 11 && fornecedor.cnpj_Cpf.length !== 0) && <span className="text-sm text-red-500">Por favor inserir corretamente</span>}
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                    <label htmlFor="nmFornecedor" className="font-semibold">Nome do Fornecedor</label>
                    <input 
                        type="text" 
                        placeholder="Nome do fornecedor" 
                        name="nmFornecedor" 
                        id="nmFornecedor" 
                        className="border-2 border-zinc-600 p-1 rounded focus:border-cyan-200"
                        onChange={handleChange}
                        value={fornecedor.nmFornecedor}
                        required={true}
                        />
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                    <label htmlFor="email" className="font-semibold">Email</label>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        name="email" 
                        id="email" 
                        className="border-2 border-zinc-600 p-1 rounded focus:border-cyan-200"
                        onChange={handleChange}
                        value={fornecedor.email}
                        required={true}
                        />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="Cep" className="font-semibold">Cep</label>
                    <Input   
                        name="cep"
                        mask="99999-999"
                        onChange={handleChange}
                        value={fornecedor.cep}
                        placeholder={"00000-000"}
                    />
                    {(fornecedor.cep.length < 8 && fornecedor.cep.length !== 0) && <span className="text-sm text-red-500">Por favor inserir corretamente</span>}
                </div>
                <div></div>
                <div></div>
                <div className="flex items-center gap-3 row-end-auto mt-3">
                    <Link to="/fornecedores" className=" flex items-center gap-2 py-3 px-5 bg-[#111827] text-white rounded hover:opacity-90 duration-200">
                        <AiOutlineArrowLeft size={18}/>
                        Voltar
                    </Link>
                    <button 
                        onClick={id ? handleUpdatingCompanyById : handleAddingNewCompany} 
                        className="py-3 px-5 bg-sky-500/75 text-white rounded hover:opacity-90 duration-200"
                    >
                        {id ? 'Atualizar' : 'Adicionar'}
                    </button>
                </div>
            </section>
        </div>
    )
}