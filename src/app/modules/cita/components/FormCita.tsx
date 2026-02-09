import {
  Typography,
  Button,
  Grid,
  Box,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import React from 'react';
import { styled } from "@mui/system";
import ControlledTextField from '../../../components/ControlledTextField';
import ControlledDateField from '../../../components/ControlledDateField';
import ControlledSelectField from '../../../components/ControlledSelectField';
import ControlledButton from "../../../components/ControlledButton";
import ControlledTimeField from "../../../components/ControlledTimeField";


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

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Fila 1 */}
        <Grid container spacing={2} mb={2} >
          <Grid size={{ xs: 12, sm: 6 }} >
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
            <FieldRow label="Departamento">
              <ControlledSelectField
                label="Departamento"
                control={control}
                nameRegister="departamento"
                options={[
                  { codigo: 1, nombre: "Laboratorio" },
                  { codigo: 2, nombre: "Rayos X" },
                  { codigo: 3, nombre: "Emergencias" },
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
            <FieldRow label="Primer Apellido">
              <ControlledTextField
                label="Primer Apellido"
                control={control}
                isRequired
                nameRegister="primer_apellido"
              />
            </FieldRow>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} >
            <FieldRow label="Doctor">
              <ControlledSelectField
                label="Doctor"
                control={control}
                nameRegister="doctor"
                options={[
                  { codigo: 1, nombre: "Dr. Pérez" },
                  { codigo: 2, nombre: "Dra. Martínez" },
                ]}
                valueField="codigo"
                labelField="nombre"
              />
            </FieldRow>
          </Grid>
        </Grid>

        {/* Fila 3 */}


        {/* Fila 5 */}
        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Segundo apellido">
              <ControlledTextField
                label="Segundo apellido"
                control={control}
                nameRegister="segundo_apellido"
              />
            </FieldRow>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Tipo de visita">
              <ControlledSelectField
                label="Tipo de visita"
                control={control}
                nameRegister="tipo_visita"
                options={[
                  { codigo: "nuevo", nombre: "Paciente nuevo" },
                  { codigo: "recurrente", nombre: "Paciente recurrente" },
                ]}
                valueField="codigo"
                labelField="nombre"
              />
            </FieldRow>
          </Grid>
        </Grid>

        {/* Fila 7 */}
        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
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

        {/* Fila 9 */}
        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Edad">
              <Box display="flex" gap={2} alignItems="center">
                <ControlledTextField
                  label="Edad"
                  control={control}
                  nameRegister="edad"
                />

                <RadioGroup row defaultValue="años">
                  <FormControlLabel value="años" control={<Radio />} label="Años" />
                  <FormControlLabel value="meses" control={<Radio />} label="Meses" />
                  <FormControlLabel value="dias" control={<Radio />} label="Días" />
                </RadioGroup>
              </Box>
            </FieldRow>
          </Grid>
        </Grid>


        {/* Fila 11 */}
        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Razón">
              <ControlledTextField
                label="razon"
                control={control}
                nameRegister="razon"
              />
            </FieldRow>
          </Grid>
        </Grid>

        {/* Fila 12 */}
        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Número de contacto">
              <ControlledTextField
                label="Número de contacto"
                control={control}
                nameRegister="numero_contacto"
              />
            </FieldRow>
          </Grid>
        </Grid>

        {/* Fila 13 */}
        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Fecha de cita">
              <ControlledDateField
                label="Fecha de cita"
                control={control}
                nameRegister="fecha_cita"
              />
            </FieldRow>
          </Grid>
        </Grid>


        {/* Fila 13 */}
        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Hora de cita">
              <ControlledTimeField
                label="Hora de cita"
                control={control}
                nameRegister="hora_cita"
                isRequired
              />
            </FieldRow>
          </Grid>
        </Grid>


        {/* BOTONES */}
        <Box mt={4} display="flex" justifyContent="center" gap={3}>
          <ControlledButton
            type="submit"
            color="#008000"
            hoverColor="#0A680A"
          >
            Registrar Paciente
          </ControlledButton>
        </Box>

      </form>
    </Box>
  );
};

export default FormPaciente;
