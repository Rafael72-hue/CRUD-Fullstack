import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Input } from "../../../components/Input";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { Fornecedor } from "../../../interface/fornecedor.interface";
import { addNewCompany, getCompanyById, updateCompanyById } from "../../../services/empresa";
import { getSupplier } from "../../../services/fornecedor";

const initialValues = {
    cep: '',
    cnpj: '',
    nmEmpresa: '',
  };

interface InitialValues {
    cep: string,
    cnpj: string,
    nmEmpresa: string,
    idFornecedor?: number,
}

  
export const EmpresaFormComponent = () => {
    const [empresa, setEmpresa] = useState<InitialValues>(initialValues);
    const [fornecedor, setFornecedor] = useState<Fornecedor[]>();
    const [isCepValid, setIsCepValid] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams<string>();
    
    function handleChange(event?: any) {
        setEmpresa({
            ...empresa,
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
            !empresa.cep || 
            !empresa.cnpj || 
            !empresa.nmEmpresa || 
            (empresa.cnpj.length < 14 && empresa.cnpj.length !== 0)
        ) {
            toast.error("Por favor preencher todos os campos!");
        } else if (!isCepValid) {
            toast.error("Cep inválido! verifque se foi digitado corretamente.")
        } else {
            addNewCompany(empresa)
            .then(data => {
                toast.success("Empresa foi registrada com sucesso!")
                navigate(`/empresa_form/${data.data.id}`
            )});
        }
    }

    const handleUpdatingCompanyById = (event: any) => {
        event.preventDefault();
        if (!isCepValid) {
            toast.error("Cep inválido! verifque se foi digitado corretamente.")
        } else {
            updateCompanyById(empresa, id)
            .then(data=> toast.success("Dados da empresa foram atualizados com sucesso!"))
            .catch(err => toast.error(err))
        }
    }

    useEffect(() => {
        if(id){
            getCompanyById(id)
            .then(data => setEmpresa(data.data))
            .catch(err => toast.error(err))
        }
        getSupplier().then(data => setFornecedor(data.data))
    }, [])

    return (
        <div className="flex justify-center items-center flex-col mt-12 relative">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <header className="flex justify-between w-3/6">
                <span className="font-bold text-3xl">{id ? 'Atualizar empresa' : 'Adicionar empresa'}</span>
            </header>

            <section className="grid grid-cols-3 border-gray-800 w-3/6 gap-3 shadow-lg shadow-slate-500 p-10 rounded-sm mt-10" >
                <div className="flex flex-col gap-1 col-span-1">
                    <label htmlFor="Cnpj" className="font-semibold">Cnpj</label>
                    <Input   
                        name="cnpj"
                        mask="99.999.999/9999-99"
                        onChange={handleChange}
                        value={empresa.cnpj}
                        placeholder={"00.000.000/0000-0"}
                    />
                    {(empresa.cnpj.length < 14 && empresa.cnpj.length !== 0) && <span className="text-sm text-red-500">Por favor inserir corretamente</span>}
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                    <label htmlFor="NmEmpresa" className="font-semibold">Nome da Empresa</label>
                    <input 
                        type="text" 
                        placeholder="Nome da Empresa" 
                        name="nmEmpresa" 
                        id="NmEmpresa" 
                        className="border-2 border-zinc-600 p-1 rounded focus:border-cyan-200"
                        onChange={handleChange}
                        value={empresa.nmEmpresa}
                        required={true}
                        />
                        <span>
                        </span>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="Cep" className="font-semibold">Cep</label>
                    <Input   
                        name="cep"
                        mask="99999-999"
                        onChange={handleChange}
                        value={empresa.cep}
                        placeholder={"00000-000"}
                    />
                    {(empresa.cep.length < 8 && empresa.cep.length !== 0) && <span className="text-sm text-red-500">Por favor inserir corretamente</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="Fornecedor" className="font-semibold">Fornecedor</label>
                    <select name="idFornecedor" value={empresa.idFornecedor ? empresa.idFornecedor : 0} onChange={handleChange}>
                        <option value={0}>Selecione um fornecedor</option>
                        {fornecedor && fornecedor.map((item: any) => <option value={item.id} key={item.id}>{item.nmFornecedor}</option>)}
                    </select>
                </div>
                <div className="flex items-center gap-3 col-start-4 mt-3">
                    <Link to="/" className=" flex items-center gap-2 py-3 px-5 bg-[#111827] text-white rounded hover:opacity-90 duration-200">
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