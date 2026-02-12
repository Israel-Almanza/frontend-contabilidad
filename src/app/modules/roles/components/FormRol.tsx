import { Typography, Button, Divider } from '@mui/material'
import Box from '@mui/material/Box';
import ControlledTextField from '../../../components/ControlledTextField';
import ControlledSelectField from '../../../components/ControlledSelectField';
import { TroubleshootSharp } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import AplicationConnect from '../../../../core/api/AplicationConnect';

const styleModal = {
    display: 'flex',
    width: '100%',
    minWidth: 350,
    flexDirection: 'column',
    gap: '15px',
    padding: '20px'
};


export const FormRol = (props: any) => {
    const { guardar, cancelar, handleSubmit, control, tituloFormulario = '' } = props;
    const [menus, setMenus] = useState([]);
    useEffect(() => {
        getMenus()
    }, []);

    const getMenus = async () => {
        const { datos } = await AplicationConnect.get(`/system/menus`)
        console.log('datos :::: ', datos)
        setMenus(datos.rows)
    }
    return (
        <Box sx={styleModal} >

            {/* ===== HEADER ===== */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                }}
            >
                <Typography variant="h6">{tituloFormulario}</Typography>
            </Box>


            <ControlledTextField
                label="Nombre"
                control={control}
                isRequired={TroubleshootSharp}
                nameRegister="nombre"
            />

            <ControlledTextField
                label="Descripcion"
                control={control}
                isRequired={false}
                nameRegister="descripcion"
            />

            <ControlledTextField
                label="Entidad/Sucural"
                control={control}
                isRequired={false}
                nameRegister="idEntidad"
            />

            <ControlledSelectField
                label="Menus"
                nameRegister="menus"
                control={control}
                isRequired={true}
                multiple={true}
                options={menus}
                valueField="id"
                labelField="nombre"
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button sx={{ backgroundColor: '#7066E0' }} onClick={cancelar} variant="contained">Cancelar</Button>
                &nbsp;&nbsp;
                <Button onClick={handleSubmit(guardar)} variant="contained">Guardar</Button>
            </div>
        </Box>
    );
};
