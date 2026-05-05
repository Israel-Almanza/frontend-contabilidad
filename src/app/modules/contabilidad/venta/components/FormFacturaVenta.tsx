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
import ControlledTable from "../../../../components/ControlledTable";

const impuestos: { value: string; label: string }[] = [];

const styleModal = {
    width: '50vw',
    maxWidth: '1100px',   // opcional pero recomendado
    minWidth: '320px',    // mobile safe
    padding: '20px',
};
export const FormFacturaVenta = ({
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
        {tituloFormulario || "Nuevo registro"}
      </Typography>

      {/* ===== SECCIÓN DEFAULT ===== */}
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 6 }} >
          <ControlledSelectField
            label="Tipo"
            nameRegister="tipo"
            control={control}
            options={[{ label: "Party", value: "party" }]}
            valueField="value"
            labelField="label"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }} >
          <ControlledTextField
            label="Serie de números"
            nameRegister="serie"
            control={control}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }} >
          <ControlledSelectField
            label="Cliente"
            nameRegister="cliente"
            control={control}
            options={[]}
            valueField="value"
            labelField="label"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }} >
          <ControlledDateField
            label="Fecha"
            nameRegister="fecha"
            control={control}
            type="datetime-local"
          />
        </Grid>
      </Grid>


      {/* ===== ARTÍCULOS ===== */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Artículos
        </Typography>

        <ControlledTable
          name="articulos"
          columns={[
            { field: "articulo", label: "Artículo", type: "text" },
            {
              field: "impuesto",
              label: "Impuesto",
              type: "select",
              options: impuestos,
              valueField: "value",
              labelField: "label",
            },
            { field: "qty", label: "Qty", type: "number" },
            { field: "tarifa", label: "Tarifa", type: "number" },
            { field: "importe", label: "Importe", type: "number" },
          ]}
        />
      </Paper>

      {/* ===== IMPUESTOS ===== */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Impuesto y totales
        </Typography>

        <Typography variant="body2">Total general</Typography>
        <Typography variant="h6">0,00</Typography>
      </Paper>

      {/* ===== PENDIENTE ===== */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Pendiente
        </Typography>

        <Typography variant="body2">Cantidad pendiente</Typography>
        <Typography variant="h6">0,00</Typography>
      </Paper>

      {/* ===== REFERENCIAS ===== */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Referencias
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextField
              label="Notas"
              nameRegister="notas"
              control={control}
              multiline
              rows={3}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Button variant="outlined" fullWidth>
              Añadir adjunto
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* ===== BOTONES ===== */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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