import { Typography, Button, TextField } from '@mui/material'
import React from 'react'
import { Controller } from "react-hook-form";
import Box from '@mui/material/Box';
import InputTextFieldCustomNormal from '../../../components/ControlledTextField';
import InputDateFieldCustomNormal from '../../../components/ControlledDateField';

const styleModal = {
    display: 'flex',
    width: '100%',
    minWidth: 350,
    flexDirection: 'column',
    gap: '15px',
    padding: '20px'
};


export const FormContact = (props: any) => {
    const { guardar, cancelar, handleSubmit, control } = props;

    return (
        <Box sx={styleModal} >
            <InputTextFieldCustomNormal
                label="Primer Nombre"
                control={control}
                isRequired={true}
                nameRegister="primerNombre"
            />

            <InputTextFieldCustomNormal
                label="Segundo Nombre"
                control={control}
                isRequired={false}
                nameRegister="segundoNombre"
            />

            <InputTextFieldCustomNormal
                label="Apellido"
                control={control}
                isRequired={true}
                nameRegister="apellido"
            />

            <InputTextFieldCustomNormal
                label="Dirección"
                control={control}
                isRequired={true}
                nameRegister="direccion"
            />

            <InputTextFieldCustomNormal
                label="Sexo"
                control={control}
                isRequired={true}
                nameRegister="sexo"
            />

            <InputDateFieldCustomNormal
                label="Fecha de Nacimiento"
                control={control}
                isRequired={true}
                nameRegister="fechaNacimiento"
            />

            <InputTextFieldCustomNormal
                label="Número WhatsApp"
                control={control}
                isRequired={true}
                nameRegister="numeroContacto"
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button sx={{ backgroundColor: '#7066E0' }} onClick={cancelar} variant="contained">Cancelar</Button>
                &nbsp;&nbsp;
                <Button onClick={handleSubmit(guardar)} variant="contained">Guardar</Button>
            </div>
        </Box>
    );
};
