import React, { useEffect, useState } from 'react'
import {
  Typography, Button, Collapse, TableRow, IconButton,
  TableCell, Grid, Container, Card, CardContent
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import CrudTable from '../../../../components/CrudTable';
import { FormFacturaCompra } from './components/FormFacturaCompra';
import AplicationConnect from '../../../../../core/api/AplicationConnect';
import { Controller, useForm } from "react-hook-form";
import EditIcon from '@mui/icons-material/Edit';
import ControlledButton from '../../../../components/ControlledButton';

const FacturaCompra = () => {

  const { handleSubmit, control, reset } = useForm();


   const [tituloFormulario, setTituloFormulario] = useState('Agregar Facutra');

  const columns = [
    { value: 'nombre', label: 'Nombre del artículo' },
    { value: 'unidad', label: 'Tipo de Unidad' },
    { value: 'impuesto', label: 'Impuesto' },
    { value: 'precio', label: 'Tarifa' },

  ];

  const filters = [
    { label: 'Nombre', field: 'nombre', type: 'input' },
  ];

  const url = 'ctb/items';

  const RowComponent = ({ row, open, update, eliminar }) => {

    return (
      <TableRow>
        <TableCell>{row.nombre}</TableCell>
        <TableCell>{row.unidad}</TableCell>
        <TableCell>{row.impuesto}</TableCell>
        <TableCell>{row.precio}</TableCell>
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
    setTituloFormulario('Agregar Fatura')
    reset({});
    if (id) {
      setTituloFormulario('Editar Factura')
      const { datos } = await AplicationConnect.get(`/${url}/${id}`)
      /* reset({
        id: datos.id,
        nombre: datos.nombre,
        ruta: datos.ruta,
        icono: datos.icono,
      }) */
      reset(datos);
    }
    open()
  }

  const FormComponent = ({ close, update }) => {
    const guardar = async (model: any) => {
      if (model.id) {
        await AplicationConnect.put<any>(`${url}/${model.id}`, model);
      } else {
        await AplicationConnect.post<any>(`${url}`, model);
      }
      await update();
      close();
    };


    const handleClose = () => {
      reset({});        // 👈 limpiar siempre
      close();
    };

    return (
      <FormFacturaCompra
        handleSubmit={handleSubmit}
        control={control}
        guardar={guardar}
        tituloFormulario = {tituloFormulario}
        cancelar={handleClose}
      />
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
          Factura de Compra
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

export default FacturaCompra