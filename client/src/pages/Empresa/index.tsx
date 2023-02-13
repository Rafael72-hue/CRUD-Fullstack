import { Link } from "react-router-dom"
import { TableEmpresa } from "./TableEmpresa";

export const Empresa = () => {
    return (
        <div className="flex justify-center items-center flex-col mt-12">
            <header className="flex justify-between w-3/6">
                <span className="font-bold text-3xl">Empresas</span>
                <Link to="/empresa_form" className="py-4 px-5 bg-[#111827] text-white rounded hover:opacity-90 duration-200">Adicionar</Link>
            </header>
            <section className="w-3/6 mt-10">
                <TableEmpresa/>
            </section>
        </div>
    )
} 