import React, { useEffect, useState } from 'react'
import {
  Typography, Button, Collapse, TableRow, IconButton,
  TableCell, Grid, Container, Card, CardContent
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import CrudTable from '../../components/CrudTable';
import EstadoButton from '../../components/EstadoButton';
import { FormPermiso } from './components/FormPermiso';
import AplicationConnect from '../../../core/api/AplicationConnect';
import { Controller, useForm } from "react-hook-form";
import EditIcon from '@mui/icons-material/Edit';
import ControlledButton from '../../components/ControlledButton';

const Permiso = () => {

  const { handleSubmit, control, reset } = useForm();

  const [tituloFormulario, setTituloFormulario] = useState('');


  const columns = [
    { value: 'nombre', label: 'Nombre' },
    { value: 'grupo', label: 'Grupo' },
    { value: 'descripcion', label: 'Descripcion' },
    { value: 'estado', label: 'Estado' },

  ];

  const filters = [
    { label: 'Nombre', field: 'nombre', type: 'input' },
  ];

  const url = 'system/permisos';

  const RowComponent = ({ row, open, update, eliminar }) => {
    return (
      <TableRow>
        <TableCell>{row.nombre}</TableCell>
        <TableCell>{row.grupo}</TableCell>
        <TableCell>{row.descripcion}</TableCell>
        <TableCell>
          <EstadoButton estado={row?.estado} />
        </TableCell>
        <TableCell>
          <IconButton onClick={() => eliminar({ url: `${url}/${row.id}` })} color="secondary">
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => openModal(open, row.id)}
          ><EditIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

  const openModal = async (open, id) => {
    // resetForm()
    setTituloFormulario('Agregar Permiso')
    reset({});
    if (id) {
      setTituloFormulario('Editar Permiso')
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

    return (
      <FormPermiso
        handleSubmit={handleSubmit}
        control={control}
        guardar={guardar}
        cancelar={close}
        tituloFormulario={tituloFormulario}
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
        backgroundColor: '#DC3545', padding: '0.1%', display: 'flex', flexDirection: 'row',
        justifyContent: 'flex-start', borderRadius: '5px', marginTop: '1%'
        , alignItems: 'center', marginBottom: '5px'

      }}
      >
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
            Permisos
          </Typography>
        </div>

      </div>
      <Container>
        <Card>
          <CardContent>
            <Grid>
              <Grid size={{ xl: 8, lg: 6, md: 5, sm: 4, xs: 3 }}
              >
                <CrudTable
                  url={url}
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

export default Permiso