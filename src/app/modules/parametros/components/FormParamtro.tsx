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


export const FormParametro = (props: any) => {
    const { guardar, cancelar, handleSubmit, control } = props;

    return (
        <Box sx={styleModal} >
            <InputTextFieldCustomNormal
                label="Nombre"
                control={control}
                isRequired={true}
                nameRegister="nombre"
            />

            <InputTextFieldCustomNormal
                label="Grupo"
                control={control}
                isRequired={false}
                nameRegister="grupo"
            />

            <InputTextFieldCustomNormal
                label="Descripcion"
                control={control}
                isRequired={true}
                nameRegister="descripcion"
            />

            <InputTextFieldCustomNormal
                label="Codigio"
                control={control}
                isRequired={true}
                nameRegister="codigo"
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button sx={{ backgroundColor: '#7066E0' }} onClick={cancelar} variant="contained">Cancelar</Button>
                &nbsp;&nbsp;
                <Button onClick={handleSubmit(guardar)} variant="contained">Guardar</Button>
            </div>
        </Box>
    );
};
