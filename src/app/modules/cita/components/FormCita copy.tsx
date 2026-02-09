import {
  Typography,
  Button,
  Grid,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import React from 'react';
import ControlledTextField from '../../../components/ControlledTextField';
import ControlledDateField from '../../../components/ControlledDateField';
import ControlledSelectField from '../../../components/ControlledSelectField';
import { useForm } from "react-hook-form";

const styleModal = {
  width: '100%',
  height: 'auto',
  bgcolor: 'background.paper',
  p: 3,
};

const FormCita = () => {

  const { handleSubmit, control } = useForm();

  const onSubmit = (data: any) => {
    console.log("DATA:", data);
  };

  const FieldRow = ({ label, children }: any) => (
    <Box display="flex" alignItems="center" width="100%">
      <Box minWidth="140px" pr={2} fontWeight={500}>
        {label} *
      </Box>

      <Box flexGrow={1}>
        {children}
      </Box>
    </Box>
  );

  return (
    <Box sx={styleModal}>
      <Typography variant="h6" mb={2}>Reservar cita</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* COLUMNA IZQUIERDA */}
        <Grid container spacing={3}>

          <Grid item xs={12} md={7}>

            {/* Nombre */}
            <Box mb={2}>
              <FieldRow label="Nombre de pila">
                <ControlledTextField
                  label="Nombre"
                  control={control}
                  isRequired
                  nameRegister="nombre"
                />
              </FieldRow>
            </Box>

            {/* Segundo nombre */}
            <Box mb={2}>
              <FieldRow label="Segundo nombre">
                <ControlledTextField
                  label="Segundo nombre"
                  control={control}
                  nameRegister="segundo_nombre"
                />
              </FieldRow>
            </Box>

            {/* Apellido */}
            <Box mb={2}>
              <FieldRow label="Apellido">
                <ControlledTextField
                  label="Apellido"
                  control={control}
                  isRequired
                  nameRegister="apellido"
                />
              </FieldRow>
            </Box>

            {/* Género */}
            <Box mb={2}>
              <FieldRow label="Género">
                <RadioGroup row>
                  <FormControlLabel value="M" control={<Radio />} label="Masculino" />
                  <FormControlLabel value="F" control={<Radio />} label="Femenino" />
                  <FormControlLabel value="O" control={<Radio />} label="Otro" />
                </RadioGroup>
              </FieldRow>
            </Box>

            {/* Edad */}
            <Box mb={2}>
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
            </Box>

            {/* Razón */}
            <Box mb={2}>
              <FieldRow label="Razón">
                <ControlledTextField
                  label="Razón"
                  control={control}
                  nameRegister="razon"
                />
              </FieldRow>
            </Box>

            {/* Número de contacto */}
            <Box mb={2}>
              <FieldRow label="Número de contacto">
                <ControlledTextField
                  label="Contacto"
                  control={control}
                  nameRegister="contacto"
                  isRequired
                />
              </FieldRow>
            </Box>

            {/* Fecha de cita */}
            <Box mb={2}>
              <FieldRow label="Fecha de cita">
                <ControlledDateField
                  label="Fecha de cita"
                  control={control}
                  nameRegister="fecha_cita"
                  isRequired
                />
              </FieldRow>
            </Box>

            {/* Hora de cita */}
            <Box mb={3}>
              <FieldRow label="Hora de cita">
                <ControlledTextField
                  label="Hora"
                  control={control}
                  nameRegister="hora_cita"
                  placeholder="15:10"
                />
              </FieldRow>
            </Box>

          </Grid>

          {/* COLUMNA DERECHA */}
          <Grid item xs={12} md={5}>

            {/* Departamento */}
            <Box mb={3}>
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
            </Box>

            {/* Doctor */}
            <Box mb={3}>
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
            </Box>

            {/* Tipo de paciente */}
            <Box mb={3}>
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
            </Box>

          </Grid>
        </Grid>

        {/* Botón */}
        <Box mt={4}>
          <Button variant="contained" color="primary" type="submit">
            Agregar cita
          </Button>
        </Box>

      </form>
    </Box>
  );
};

export default FormCita;
