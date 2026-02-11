import React from 'react'
import {
  Box,
  Button,
  Typography,
  Grid,
  Divider,
  Paper,
  IconButton
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import ControlledTextField from '../../../../../components/ControlledTextField'
import ControlledSelectField from '../../../../../components/ControlledSelectField'

const styleModal = {
  width: '60vw',
  maxWidth: '1200px',
  minWidth: '320px',
  padding: '20px',
}

export const FormFacturaCompra = ({
  guardar,
  cancelar,
  handleSubmit,
  control,
  tituloFormulario = 'Factura de Compra'
}) => {
  return (
    <Box sx={styleModal}>

      <Typography variant="h6" sx={{ mb: 2 }}>
        {tituloFormulario}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {/* ================= DATOS PRINCIPALES ================= */}
      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2}>

          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledSelectField
              label="Cuenta"
              nameRegister="cuenta"
              control={control}
              options={[
                { label: 'Caja', value: 'caja' },
                { label: 'Banco', value: 'banco' }
              ]}
              valueField="value"
              labelField="label"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextField
              label="Serie de números"
              nameRegister="serie"
              control={control}
              defaultValue="PINV-"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledSelectField
              label="Proveedor"
              nameRegister="proveedor"
              control={control}
              options={[
                { label: 'Proveedor A', value: 'a' },
                { label: 'Proveedor B', value: 'b' }
              ]}
              valueField="value"
              labelField="label"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextField
              label="Fecha"
              nameRegister="fecha"
              control={control}
              type="datetime-local"
            />
          </Grid>

        </Grid>
      </Paper>

      {/* ================= ARTICULOS ================= */}
      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Artículos
        </Typography>

        {/* Header */}
        <Grid container spacing={1} sx={{ fontWeight: 600 }}>
          <Grid size={1}>#</Grid>
          <Grid size={4}>Artículo</Grid>
          <Grid size={2}>Impuesto</Grid>
          <Grid size={1}>Qty</Grid>
          <Grid size={2}>Tarifa</Grid>
          <Grid size={2}>Importe</Grid>
        </Grid>

        {/* Fila */}
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid size={1}>1</Grid>

          <Grid size={4}>
            <ControlledSelectField
              nameRegister="items[0].articulo"
              control={control}
              options={[
                { label: 'Laptop', value: 'laptop' },
                { label: 'Monitor', value: 'monitor' }
              ]}
              valueField="value"
              labelField="label"
            />
          </Grid>

          <Grid size={2}>
            <ControlledSelectField
              nameRegister="items[0].impuesto"
              control={control}
              options={[
                { label: 'Sin impuesto', value: 'none' },
                { label: 'IVA 13%', value: 'iva13' }
              ]}
              valueField="value"
              labelField="label"
            />
          </Grid>

          <Grid size={1}>
            <ControlledTextField
              nameRegister="items[0].qty"
              control={control}
              type="number"
            />
          </Grid>

          <Grid size={2}>
            <ControlledTextField
              nameRegister="items[0].tarifa"
              control={control}
              type="number"
            />
          </Grid>

          <Grid size={2}>
            <ControlledTextField
              nameRegister="items[0].importe"
              control={control}
              type="number"
              disabled
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
          <IconButton size="small">
            <AddIcon />
          </IconButton>
          <Typography variant="body2">Añadir fila</Typography>
        </Box>
      </Paper>

      {/* ================= TOTAL ================= */}
      <Paper variant="outlined" sx={{ p: 2, mb: 3, textAlign: 'right' }}>
        <Typography variant="subtitle2">Total Neto</Typography>
        <Typography variant="h6">Bs. 0.00</Typography>
      </Paper>

      {/* ================= ACCIONES ================= */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={cancelar} sx={{ mr: 2 }}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleSubmit(guardar)}>
          Guardar
        </Button>
      </Box>

    </Box>
  )
}
