import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Header } from './components/Header';
import { Empresa } from './pages/Empresa';
import { EmpresaFormComponent } from './pages/Empresa/FormComponent';
import { Fornecedor } from './pages/Fornecedor';
import { FornecedorFormComponent } from './pages/Fornecedor/FormComponent';

export const Routers = () => (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path='/' element={<Empresa />} />
            <Route path='/fornecedores' element={<Fornecedor />} />
            <Route path='/fornecedor_form' element={<FornecedorFormComponent />} />
            <Route path='/fornecedor_form/:id' element={<FornecedorFormComponent />} />
            <Route path='/empresa_form' element={<EmpresaFormComponent />} />
            <Route path='/empresa_form/:id' element={<EmpresaFormComponent />} />
        </Routes>
    </BrowserRouter>
)