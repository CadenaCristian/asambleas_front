import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../common/header';
import { LoginService } from '../../axios/usersPetition';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import Footer from '../common/footer';

const Login = () => {

    const navigate = useNavigate();
    const [dataUserValue, setdataUserValue] = useState({ name: "", password: "" })
    const { name, password } = dataUserValue;
    const [sppiner, setSpinner] = useState(false);

    const credentials = ({ target }) => {
        setdataUserValue({
            ...dataUserValue,
            [target.name]: target.value,
        });
    }

    const login = async () => {
        setSpinner(true)
        const resp = await LoginService(dataUserValue);
        if (resp.status === 200 && resp.data.token !== '') {
            Swal.fire('alert', 'Bienvenido!', 'success');
            localStorage.setItem('Token', resp.data.token);
            localStorage.setItem('userName', resp.data.userName);
            localStorage.setItem('groupId', resp.data.groupId);
            localStorage.setItem('idMeeting', resp.data.idMeeting);
            { resp.data.rol === 'admin' ? navigate('/adminPanel') : navigate('/assemblies') };
        } else {
            Swal.fire('alert', 'Los datos ingresados son incorrectos!', 'error');
            setSpinner(false)
        }
    }

    return (
        <div>
            <div className='conatiner-fluid'>
                <div className='row'>
                    <Header />
                </div>
                <div className='row mt-5' style={{ minHeight: '75vh' }}>
                    <div className='col-md-4 offset-4'>
                        <form>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Usuario</label>
                                <input type="text" className="form-control" name='name' onChange={credentials} value={name} />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Contraseña</label>
                                <input type="password" className="form-control" name='password' onChange={credentials} value={password} />
                            </div>
                            <div className="text-center">
                                <button type="button" className="btn btn-primary" onClick={login}>
                                    {sppiner === false ?
                                        'Iniciar sesión' : <span className="spinner-border text-light" role="status" />
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Login;