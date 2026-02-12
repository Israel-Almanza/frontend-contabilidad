import { Typography, Button, Divider } from '@mui/material'
import Box from '@mui/material/Box';
import ControlledTextField from '../../../components/ControlledTextField';
import ControlledSelectField from '../../../components/ControlledSelectField';

const styleModal = {
    display: 'flex',
    width: '100%',
    minWidth: 350,
    flexDirection: 'column',
    gap: '15px',
    padding: '20px'
};


export const FormPermiso = (props: any) => {
    const { guardar, cancelar, handleSubmit, control, tituloFormulario = '' } = props;

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

            <ControlledSelectField
                label="Tipo"
                nameRegister="tipo"
                control={control}
                options={[
                    { label: 'SISTEMA', value: 'SISTEMA' },
                    { label: 'INTEROPERABILIDAD', value: 'INTEROPERABILIDAD' },
                ]}
                valueField="value"
                labelField="label"
            />

            <ControlledTextField
                label="Nombre"
                control={control}
                isRequired={false}
                nameRegister="nombre"
            />

            <ControlledTextField
                label="Descripcion"
                control={control}
                isRequired={true}
                nameRegister="descripcion"
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button sx={{ backgroundColor: '#7066E0' }} onClick={cancelar} variant="contained">Cancelar</Button>
                &nbsp;&nbsp;
                <Button onClick={handleSubmit(guardar)} variant="contained">Guardar</Button>
            </div>
        </Box>
    );
};
