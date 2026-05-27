import React, { useEffect, useState } from 'react'
import {
  Typography, Button, Collapse, TableRow, IconButton,
  TableCell, Grid, Container, Card, CardContent
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import CrudTable from '../../../components/CrudTable';
import AplicationConnect from '../../../../core/api/AplicationConnect';
import { FormProvider, useForm } from "react-hook-form";
import EditIcon from '@mui/icons-material/Edit';
import ControlledButton from '../../../components/ControlledButton';
import { FormFacturaVenta } from './components/FormFacturaVenta';

const FacturaVenta = () => {

  const methods = useForm({
    defaultValues: {
      articulos: [] as Record<string, string | number>[],
      imagen: null as File | string | null,
    },
  });

  const { handleSubmit, control, reset } = methods;


   const [tituloFormulario, setTituloFormulario] = useState('Agregar Artículo');

  const columns = [
    { value: 'nombre', label: 'Numero' },
    { value: 'serieNumeracion', label: 'Serie' },
    { value: 'tercero', label: 'Cliente' },
    { value: 'fecha', label: 'Fecha' },
  ];

  const filters = [
    { label: 'Nombre', field: 'nombre', type: 'input' },
  ];

  const url = 'ctb/ventas/facturas';

  const RowComponent = ({ row, open, update, eliminar }) => {

    return (
      <TableRow>
        <TableCell>{row.nombre}</TableCell>
        <TableCell>{row.serieNumeracion}</TableCell>
        <TableCell>{row.tercero}</TableCell>
        <TableCell>{row.fecha ? String(row.fecha).slice(0, 10) : ''}</TableCell>
        <TableCell>
          <IconButton
            onClick={() => eliminar({ url: `${url}/${row.id}` })}
            sx={{
              p: 0,
              m: 0,
              width: 24,
              height: 20
            }}
          >
            <DeleteIcon sx={{ fontSize: 18 }} />
          </IconButton>

          <IconButton

            onClick={() => openModal(open, row.id)}
            sx={{
              p: 0,
              m: 0,
              width: 24,
              height: 20
            }}
          >
            <EditIcon sx={{ fontSize: 18 }} />
          </IconButton>

        </TableCell>
      </TableRow>
    );
  };

  const openModal = async (open, id) => {
    // resetForm()
    setTituloFormulario('Agregar Factura')
    reset({ articulos: [], imagen: null });
    if (id) {
      setTituloFormulario('Editar Factura')
      const { datos } = await AplicationConnect.get(`/${url}/${id}`)
      /* reset({
        id: datos.id,
        nombre: datos.nombre,
        ruta: datos.ruta,
        icono: datos.icono,
      }) */
      reset({
        ...datos,
        articulos: Array.isArray(datos.articulos) ? datos.articulos : [],
        imagen: datos.adjunto || null,
      });
    }
    open()
  }

  const FormComponent = ({ close, update }) => {
    const guardar = async (model: any) => {
      const isFormData = model instanceof FormData;
      const modelId = isFormData ? model.get('id') : model.id;
      const config = isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined;

      if (modelId) {
        await AplicationConnect.put<any>(`${url}/${modelId}`, model, config);
      } else {
        await AplicationConnect.post<any>(`${url}`, model, config);
      }
      await update();
      close();
    };


    const handleClose = () => {
      reset({ articulos: [], imagen: null });
      close();
    };

    return (
      <FormProvider {...methods}>
        <FormFacturaVenta
          handleSubmit={handleSubmit}
          control={control}
          guardar={guardar}
          tituloFormulario={tituloFormulario}
          cancelar={handleClose}
        />
      </FormProvider>
    );
  };


  const HeaderActions = ({ open }) => {
    return (
      <ControlledButton
        onClick={() => openModal(open, null)} variant="contained" color="primary"
      >
        Agregar
      </ControlledButton>
    );
  };


  return (
    <>
      <div style={{
        backgroundColor: '#DC3545', display: 'flex', flexDirection: 'row',
        justifyContent: 'flex-start', borderRadius: '5px'
        , alignItems: 'center', marginBottom: '0px', marginTop: '0px'

      }}
      >
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '8px', // espacio entre icono y texto
            marginLeft: '10px',
            color: 'white',
          }}
        >
          Factura Venta
        </Typography>
      </div>
      <Container>
        <Card>
          <CardContent>
            <Grid>
              <Grid size={{ xl: 8, lg: 6, md: 5, sm: 4, xs: 3 }}
              >
                <CrudTable
                  url={url}
                  order="'createdAt'"
                  filters={filters}
                  columns={columns}
                  RowComponent={RowComponent}
                  FormComponent={FormComponent}
                  footerSlot={<div>Total de registros</div>}
                  HeaderActions={HeaderActions}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

export default FacturaVenta