import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddUpdateUser = () => {
    return (
        <div className='container'>
            <div className='row'>
                <div classNameName='col-md-3'>
                    <button classNameName='btn btn-outline-primary col-md-12'> Añadir un nuevo usuario</button>
                    <div>
                        <input type="text" className="form-control mt-1" aria-label="Sizing example input" placeholder='Nombre' />
                        <input type="text" className="form-control mt-1" aria-label="Sizing example input" placeholder='Alias del usuario' />
                        <input type="text" className="form-control mt-1" aria-label="Sizing example input" placeholder='Correo electronico' />
                        <input type="text" className="form-control mt-1" aria-label="Sizing example input" placeholder='Cedula' />
                        <input type="text" className="form-control mt-1" aria-label="Sizing example input" placeholder='Contraseña' />
                        <input type="text" className="form-control mt-1" aria-label="Sizing example input" placeholder='Id reunión zoom' />
                        <label>¿Puede votar?</label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                            <label class="form-check-label" for="flexRadioDefault1">
                                Default radio
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                            <label class="form-check-label" for="flexRadioDefault2">
                                Default checked radio
                            </label>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AddUpdateUser;
