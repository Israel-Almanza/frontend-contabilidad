import {
  Typography,
  Button,
  Grid,
  Box,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import React from 'react';
import { styled } from "@mui/system";
import ControlledTextField from '../../../components/ControlledTextField';
import ControlledDateField from '../../../components/ControlledDateField';
import ControlledSelectField from '../../../components/ControlledSelectField';
import ControlledButton from "../../../components/ControlledButton";

import { useForm } from "react-hook-form";


const styleModal = {
  width: '100%',
  height: 'auto',
  bgcolor: 'background.paper',
  p: 2,
};


const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#008000'),
  backgroundColor: '#008000',
  '&:hover': { backgroundColor: '#0A680A' },
}));

const FormPaciente = () => {

  const { handleSubmit, control } = useForm();

  const onSubmit = (data: any) => {
    console.log("DATA:", data);
  };



  const FieldRow = ({ label, children }: any) => (
    <Box display="flex" alignItems="center" width="100%">
      <Box minWidth="160px" pr={1} fontWeight={500}>
        {label} :
      </Box>

      <Box flexGrow={1} width="100%">
        {children}
      </Box>
    </Box>
  );

  return (
    <Box sx={styleModal}>
      <Typography variant="h6" mb={2}>Información Básica</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Fila 1 */}
        <Grid container spacing={2} mb={2} >
          <Grid size={{ xs: 12, sm: 6 }} >
            <FieldRow label="Saludo">
              <ControlledSelectField
                label="Saludo"
                control={control}
                nameRegister="saludo"
                options={[
                  { codigo: "Señor", nombre: "Señor" },
                  { codigo: "Extrañar", nombre: "Extrañar" },
                  { codigo: "Dr", nombre: "Dr" },
                  { codigo: "Enfermero", nombre: "Enfermero" },
                  { codigo: "Consultor", nombre: "Consultor" },
                  { codigo: "No binario", nombre: "No binario" },
                ]}
                valueField="codigo"
                labelField="nombre"
              />
            </FieldRow>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} >
            <FieldRow label="Género">
              <ControlledSelectField
                label="Categoría"
                control={control}
                nameRegister="categoria"
                options={[
                  { codigo: "Masculino", nombre: "Maculino" },
                  { codigo: "Femenino", nombre: "Femenino" },
                  { codigo: "Otro", nombre: "Otro" },
                ]}
                valueField="codigo"
                labelField="nombre"
              />
            </FieldRow>
          </Grid>
        </Grid>

        {/* Fila 2 */}
        <Grid container columnSpacing={2} rowSpacing={2} mb={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Nombres">
              <ControlledTextField
                label="Nombres"
                control={control}
                isRequired
                nameRegister="nombres"
              />
            </FieldRow>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} >
            <FieldRow label="Casta">
              <ControlledTextField
                label="Casta"
                control={control}
                nameRegister="casta"
              />
            </FieldRow>
          </Grid>
        </Grid>

        {/* Fila 3 */}
        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="P^rimer Apellido">
              <ControlledTextField
                label="Primer Apellido"
                control={control}
                nameRegister="primer_apellido"
              />
            </FieldRow>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Estado civil">
              <Box display="flex" gap={2}>
                <FormControlLabel control={<Checkbox />} label="Casado" />
                <FormControlLabel control={<Checkbox />} label="Soltero" />
              </Box>
            </FieldRow>
          </Grid>
        </Grid>

        {/* Fila 4 */}


        {/* Fila 5 */}
        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldRow label="Segundo apellido">
                <ControlledTextField
                  label="Segundo apellido"
                  control={control}
                  nameRegister="segundo_apellido"
                />
              </FieldRow>
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Información del empleador">
              <ControlledTextField
                label="Información del empleador"
                control={control}
                nameRegister="empleador"
              />
            </FieldRow>
          </Grid>
        </Grid>

        {/* Fila 6 */}
        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Fecha de nacimiento">
              <ControlledDateField
                label="Fecha de nacimiento"
                control={control}
                nameRegister="fecha_nacimiento"
              />
            </FieldRow>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Apellido anterior">
              <ControlledTextField
                label="Apellido anterior"
                control={control}
                nameRegister="apellido_anterior"
              />
            </FieldRow>
          </Grid>
        </Grid>

        {/* Fila 7 */}
        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Edad">
              <ControlledTextField
                label="Edad"
                control={control}
                nameRegister="edad"
              />
            </FieldRow>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Ocupación">
              <ControlledTextField
                label="Ocupación"
                control={control}
                nameRegister="ocupacion"
              />
            </FieldRow>
          </Grid>
        </Grid>

        {/* Fila 8 */}
        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Número de teléfono">
              <ControlledTextField
                label="Teléfono"
                control={control}
                nameRegister="telefono"
              />
            </FieldRow>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Correo electrónico">
              <ControlledTextField
                label="Email"
                control={control}
                nameRegister="email"
              />
            </FieldRow>
          </Grid>
        </Grid>

        {/* Fila 9 */}
        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Número de teléfono fijo">
              <ControlledTextField
                label="Teléfono Fijo"
                control={control}
                nameRegister="telefono_fijo"
              />
            </FieldRow>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Carrera">
              <ControlledTextField
                label="Carrera"
                control={control}
                nameRegister="carrera"
              />
            </FieldRow>
          </Grid>
        </Grid>

        {/* Fila 10 */}
        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="País">
              <ControlledSelectField
                label="Pais"
                control={control}
                nameRegister="pais"
                options={[
                  { codigo: "Bolivia", nombre: "Bolivia" },
                  { codigo: "Argentina", nombre: "Argentina" }
                ]}
                valueField="codigo"
                labelField="nombre"
              />
            </FieldRow>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="PAÑO">
              <ControlledTextField
                label="PAÑO"
                control={control}
                nameRegister="pano"
              />
            </FieldRow>
          </Grid>
        </Grid>

        {/* Fila 11 */}
        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Distrito/Estado">
              <ControlledTextField
                label="Estado"
                control={control}
                nameRegister="estado"
              />
            </FieldRow>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Paciente de diálisis">
              <Checkbox />
            </FieldRow>
          </Grid>
        </Grid>

        {/* Fila 12 */}
        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Municipio">
              <ControlledTextField
                label="Municipio"
                control={control}
                nameRegister="municipio"
              />
            </FieldRow>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Número de distrito">
              <ControlledTextField
                label="N° Distrito"
                control={control}
                nameRegister="num_distrito"
              />
            </FieldRow>
          </Grid>
        </Grid>

        {/* Fila 13 - Dirección */}
        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Dirección">
              <ControlledTextField
                label="Dirección"
                control={control}
                nameRegister="direccion"
              />
            </FieldRow>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Grupo sanguíneo">
              <ControlledTextField
                label="Grupo sanguíneo"
                control={control}
                nameRegister="grupo_sanguineo"
              />
            </FieldRow>
          </Grid>
        </Grid>

        {/* Fila 14 - Grupo sanguíneo 
        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Grupo sanguíneo">
              <ControlledTextField
                label="Grupo sanguíneo"
                control={control}
                nameRegister="grupo_sanguineo"
              />
            </FieldRow>
          </Grid>
        </Grid>*/}

        {/* BOTONES */}
        <Box mt={4} display="flex" justifyContent="center" gap={3}>
          <ControlledButton
            type="submit"
            color="#008000"
            hoverColor="#0A680A"
          >
            Registrar Paciente
          </ControlledButton>

          <Button variant="contained" color="error">
            Cancelar
          </Button>
        </Box>

      </form>
    </Box>
  );
};

export default FormPaciente;
