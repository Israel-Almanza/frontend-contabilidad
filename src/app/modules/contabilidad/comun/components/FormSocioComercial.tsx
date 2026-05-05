import React from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Paper,
  Avatar,
} from "@mui/material";

import ControlledTextField from "../../../../components/ControlledTextField";
import ControlledSelectField from "../../../../components/ControlledSelectField";

const styleModal = {
  width: "50vw",
  maxWidth: "1100px",
  minWidth: "320px",
  padding: "20px",
};

const roles = [
  { label: "Cliente", value: "customer" },
  { label: "Proveedor", value: "supplier" },
];

export const FormSocioComercial = ({
  guardar,
  cancelar,
  handleSubmit,
  control,
  tituloFormulario = "",
}) => {
  return (
    <Box sx={styleModal}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {tituloFormulario || "Nuevo Socio Comercial"}
      </Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12, md: 3 }} >
          <Paper
            sx={{
              height: 120,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Avatar sx={{ width: 56, height: 56 }} />
          </Paper>
        </Grid>

        <Grid  size={{ xs: 12, md: 9 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 8 }}>
              <ControlledTextField
                label="Nombre completo"
                nameRegister="nombre"
                control={control}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <ControlledSelectField
                label="Rol"
                nameRegister="rol"
                control={control}
                options={roles}
                valueField="value"
                labelField="label"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Contactos
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextField
              label="Correo electrónico"
              nameRegister="email"
              control={control}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextField
              label="Teléfono"
              nameRegister="telefono"
              control={control}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <ControlledTextField
              label="Dirección"
              nameRegister="direccion"
              control={control}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Facturación
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextField
              label="Cuenta predeterminada"
              nameRegister="cuenta"
              control={control}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextField
              label="Moneda"
              nameRegister="moneda"
              control={control}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <ControlledTextField
              label="Número de identificación fiscal"
              nameRegister="nit"
              control={control}
            />
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button onClick={cancelar} sx={{ mr: 2 }}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit(guardar)} variant="contained">
          Guardar
        </Button>
      </Box>
    </Box>
  );
};
