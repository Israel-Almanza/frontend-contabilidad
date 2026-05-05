import React from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Paper,
} from "@mui/material";

import ControlledTextField from "../../../../components/ControlledTextField";
import ControlledSelectField from "../../../../components/ControlledSelectField";
import ControlledDateField from "../../../../components/ControlledDateField";

const styleModal = {
  width: "50vw",
  maxWidth: "1100px",
  minWidth: "320px",
  padding: "20px",
};

export const FormPagoVenta = ({
  guardar,
  cancelar,
  handleSubmit,
  control,
  tituloFormulario = "",
}) => {
  return (
    <Box sx={styleModal}>
      {/* HEADER */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        {tituloFormulario || "Registrar Pago"}
      </Typography>

      {/* TOP */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            label="Serie de números"
            nameRegister="serie"
            control={control}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledSelectField
            label="Socio comercial"
            nameRegister="socio"
            control={control}
            options={[]}
            valueField="value"
            labelField="label"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDateField
            label="Fecha de publicación"
            nameRegister="fecha_publicacion"
            control={control}
            type="datetime-local"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledSelectField
            label="Tipo de pago"
            nameRegister="tipo_pago"
            control={control}
            options={[]}
            valueField="value"
            labelField="label"
          />
        </Grid>
      </Grid>

      {/* DETALLES */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Detalles
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledSelectField
              label="De la cuenta"
              nameRegister="cuenta_origen"
              control={control}
              options={[]}
              valueField="value"
              labelField="label"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledSelectField
              label="A la cuenta"
              nameRegister="cuenta_destino"
              control={control}
              options={[]}
              valueField="value"
              labelField="label"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledSelectField
              label="Método de pago"
              nameRegister="metodo_pago"
              control={control}
              options={[{ label: "Cash", value: "cash" }]}
              valueField="value"
              labelField="label"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledDateField
              label="Fecha de liquidación"
              nameRegister="fecha_liquidacion"
              control={control}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextField
              label="Ref. / Número de cheque"
              nameRegister="referencia"
              control={control}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledDateField
              label="Fecha de referencia"
              nameRegister="fecha_referencia"
              control={control}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* IMPORTES */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Importes
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextField
              label="Importe"
              nameRegister="importe"
              control={control}
              type="number"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextField
              label="Cancelar"
              nameRegister="cancelar_importe"
              control={control}
              type="number"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* BOTONES */}
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
