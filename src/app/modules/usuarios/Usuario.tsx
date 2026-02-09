import React, { useEffect, useState } from 'react'
import {
  Typography, Button, Collapse, TableRow, colors, Input, Checkbox, IconButton,
  TableCell, Grid, Container, Card, CardContent
} from '@mui/material'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { ModalAgregarPerfil } from './components/ModalNewPerfil';
import DeleteIcon from '@mui/icons-material/Delete';
import dataClientesJson from '../../../data/clinica/clientes.json'
import CrudTable from '../../components/CrudTable';
import EstadoButton from '../../components/EstadoButton';
import { FormContact } from './components/FormContact';
import AplicationConnect from '../../../core/api/AplicationConnect';
import { Controller, useForm } from "react-hook-form";
import EditIcon from '@mui/icons-material/Edit';

const Usuario = () => {

  const { formState, handleSubmit, control, register, getValues, setValue, reset } = useForm();

  const [originalRows, setoriginalRows] = useState<any>([])
  const [listPerfil, setListPerfil] = useState<any>(originalRows)

  const columns = [
    { id: 'nombre', label: 'Nombre' },
    { id: 'ruta', label: 'Ruta' },
    { id: 'icono', label: 'Icono' },

  ];

  const filters = [
    { label: 'Nombre', field: 'contacto', type: 'input' },
    { label: 'Instancia', field: 'Nombre de Paciente', type: 'input' },
  ];

  const url = 'system/menus';

  const RowComponent = ({ row, open, update, eliminar }) => {
    const btnDeleted = async (item: any) => {
      console.log('item ', item)
      await eliminar(item.instancia.instance_key)
      // instance_key
    }

    return (
      <TableRow>
        <TableCell>{row.nombre}</TableCell>
        <TableCell>{row.ruta}</TableCell>
        <TableCell>{row.icono}</TableCell>
        <TableCell>
          <IconButton onClick={() => btnDeleted(row)} color="secondary">
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => open()}
          ><EditIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

  const FormComponent = ({ close, update }) => {
    const guardar = async () => {
      if (model.id) {
        await AplicationConnect.put<any>(`${url}/${model.id}`, getValues());
      } else {
        await AplicationConnect.post<any>(`${url}`, getValues());
      }
      await update();
      close();
    };

    return (
      <FormContact
        handleSubmit={handleSubmit}
        control={control}
        guardar={guardar}
        cancelar={close}
      />
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
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
          <Grid size={{ xs: 8, sm: 11, md: 11 }}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px', // espacio entre icono y texto
                marginLeft: '10px',
                marginTop: '5px',
                color: 'white',
              }}
            >
              <ManageAccountsIcon sx={{ color: 'white' }} />
              Menus
            </Typography>
          </Grid>
        </Grid>

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
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

export default Usuario