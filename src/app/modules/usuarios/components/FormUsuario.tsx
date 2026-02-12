import { Typography, Button, Divider, Grid } from '@mui/material'
import Box from '@mui/material/Box';
import ControlledTextField from '../../../components/ControlledTextField';
import ControlledSelectField from '../../../components/ControlledSelectField';
import { useState, useEffect } from 'react';
import AplicationConnect from '../../../../core/api/AplicationConnect';

const styleModal = {
    width: '100%',
    minWidth: 350,
    padding: '20px'
};

export const FormUsuario = (props) => {
    const { guardar, cancelar, handleSubmit, control, tituloFormulario = '' } = props;

    const [roles, setRoles] = useState([]);
    useEffect(() => {
        getRoles()
    }, []);

    const getRoles = async () => {
        const { datos } = await AplicationConnect.get(`/system/roles`)
        setRoles(datos.rows)
    }
    return (
        <Box sx={styleModal}>

            {/* ===== HEADER ===== */}
            <Typography variant="h6" mb={2}>
                {tituloFormulario}
            </Typography>

            {/* ================= DATOS PERSONALES ================= */}
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Datos personales
            </Typography>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <ControlledSelectField
                        label="Tipo Documento"
                        nameRegister="persona.tipoDocumento"
                        control={control}
                        isRequired
                        options={[
                            { id: 'CI', nombre: 'CI' },
                            { id: 'PASAPORTE', nombre: 'Pasaporte' }
                        ]}
                        valueField="id"
                        labelField="nombre"
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <ControlledTextField
                        label="Cédula de identidad"
                        nameRegister="persona.numeroDocumento"
                        control={control}
                        isRequired
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <ControlledTextField
                        label="Fecha de nacimiento"
                        nameRegister="persona.fechaNacimiento"
                        type="date"
                        control={control}
                        isRequired
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <ControlledTextField
                        label="Nombres"
                        nameRegister="persona.nombres"
                        control={control}
                        isRequired
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <ControlledTextField
                        label="Primer apellido"
                        nameRegister="persona.primerApellido"
                        control={control}
                        isRequired
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <ControlledTextField
                        label="Segundo apellido"
                        nameRegister="persona.segundoApellido"
                        control={control}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <ControlledTextField
                        label="Teléfono"
                        nameRegister="persona.telefono"
                        control={control}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <ControlledTextField
                        label="Celular"
                        nameRegister="persona.celular"
                        control={control}
                        isRequired
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <ControlledTextField
                        label="Correo electrónico"
                        nameRegister="persona.correoElectronico"
                        control={control}
                        isRequired
                    />
                </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* ================= DATOS DE USUARIO ================= */}
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Datos de usuario
            </Typography>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <ControlledSelectField
                        label="Departamento"
                        nameRegister="departamento"
                        control={control}
                        isRequired={false}
                        options={[
                            { id: 'CBBA', nombre: 'Cochabamba' },
                            { id: 'LP', nombre: 'La Paz' },
                            { id: 'SC', nombre: 'Santa Cruz' }
                        ]}
                        valueField="id"
                        labelField="nombre"
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                    <ControlledSelectField
                        label="Entidad"
                        nameRegister="entidad"
                        control={control}
                        isRequired={false}
                        options={[
                            { id: 1, nombre: 'ESTADO PLURINACIONAL DE BOLIVIA' }
                        ]}
                        valueField="id"
                        labelField="nombre"
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <ControlledSelectField
                        label="Área"
                        nameRegister="area"
                        control={control}
                        isRequired={false}
                        options={[
                            { id: 1, nombre: 'Administración' },
                            { id: 2, nombre: 'Sistemas' }
                        ]}
                        valueField="id"
                        labelField="nombre"
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <ControlledTextField
                        label="Cargo"
                        nameRegister="cargo"
                        control={control}
                        isRequired={false}
                    />
                </Grid>


                <Grid size={{ xs: 12, md: 6 }}>
                    <ControlledTextField
                        label="Usuario"
                        nameRegister="usuario"
                        control={control}
                        isRequired={true}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <ControlledSelectField
                        label="Roles"
                        nameRegister="roles"
                        control={control}
                        isRequired
                        multiple={true}
                        options={roles}
                        valueField="id"
                        labelField="nombre"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <ControlledTextField
                        label="Contraseña"
                        nameRegister="contrasena"
                        control={control}
                        isRequired={true}
                    />
                </Grid>
            </Grid>

            {/* ================= BOTONES ================= */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Button
                    sx={{ backgroundColor: '#7066E0' }}
                    onClick={cancelar}
                    variant="contained"
                >
                    Cancelar
                </Button>
                &nbsp;&nbsp;
                <Button onClick={handleSubmit(guardar)} variant="contained">
                    Guardar
                </Button>
            </Box>

        </Box>
    );
};
