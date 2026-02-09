import React, { useEffect, useState } from 'react'
import {
  Typography, Button, Collapse, TableRow, colors, Input, Checkbox, IconButton,
  TableCell, Grid, Container, Card, CardContent
} from '@mui/material'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { ModalAgregarPerfil } from './ModalNewPerfil';
import DeleteIcon from '@mui/icons-material/Delete';
import dataClientesJson from '../../../../data/hospital/pacientes.json'
import CrudTable from '../../../components/CrudTable';
import EstadoButton from '../../../components/EstadoButton';
import { FormContact } from './FormContact';
import AplicationConnect from '../../../../core/api/AplicationConnect';
import { Controller, useForm } from "react-hook-form";
import EditIcon from '@mui/icons-material/Edit';
import ControlledButton from '../../../components/ControlledButton';

const ListaCita = () => {

  const { formState, handleSubmit, control, register, getValues, setValue, reset } = useForm();

  const [originalRows, setoriginalRows] = useState<any>([])
  const [listPerfil, setListPerfil] = useState<any>(originalRows)

   const columns = [
    { value: 'estado', label: 'Estado',width: '8%' },
    { value: 'fecha', label: 'Fecha', width: '7%' },
    { value: 'hora', label: 'Tiempo' , width: '7%' },
    { value: 'id', label: 'id Aplicacion',  width: '8%'  },
    { value: 'nombre', label: 'Nombres' },
    { value: 'telefono', label: 'Telefono', width: '8%' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'tipo_visita', label: 'tipo_visita' },
  ];

  const filters = [
    { label: 'Nombre', field: 'contacto', type: 'input' },
    { label: 'CI', field: 'Nombre de Paciente', type: 'input' },
  ];

  const url = 'clinica/pacientes';
  //<---modal
  const [openModalAgregarPerfil, setOpenModalAgregarPerfil] = useState(false);

  const handleOpenModalAgregarPerfil = () => setOpenModalAgregarPerfil(true);
  const handleCloseModalAgregarPerfil = () => setOpenModalAgregarPerfil(false);
  //modal--->

  //star llamar a api
  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    loadData();
    // loadObtenerListaPerfil()
  }, []);

  const loadData = async () => {
    console.log(' data clientes :::: ', dataClientesJson)
    setListPerfil(dataClientesJson)
    setoriginalRows(dataClientesJson)
  }

  const RowComponent = ({ row, open, update, eliminar }) => {
    const btnDeleted = async (item: any) => {
      console.log('item ', item)
      await eliminar(item.instancia.instance_key)
      // instance_key
    }

    return (
      <TableRow>
        <TableCell>{row.estado}</TableCell>
        <TableCell>{row.fecha}</TableCell>
        <TableCell>{row.hora}</TableCell>
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.nombre}</TableCell>
        <TableCell>{row.telefono}</TableCell>
        <TableCell>{row.doctor}</TableCell>
        <TableCell>{row.tipo_visita}</TableCell>
        <TableCell>
          <ControlledButton
            type="submit"
            color="#0773BC"
            hoverColor="#0366A6"
          >
            Ver
          </ControlledButton>
           <ControlledButton
            type="submit"
            color="#0773BC"
            hoverColor="#0366A6"
          >
            Cancelar
          </ControlledButton>
          {/* <IconButton onClick={() => btnDeleted(row)} color="secondary">
            <DeleteIcon />
          </IconButton>*/}
          <IconButton onClick={handleOpenModalAgregarPerfil}
            ><EditIcon/>
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
      <div sx={{backgroundColor:'red', width:'100%'}}>
        <Card>
          <CardContent>
            <Grid>
                <CrudTable
                  url={url}
                  filters={filters}
                  columns={columns}
                  RowComponent={RowComponent}
                  dataStatic='citas'
                  footerSlot={<div>Total de registros</div>}
                />
            </Grid>
          </CardContent>
        </Card>
      </div>
      <br />
      <ModalAgregarPerfil
        openModalAgregarPerfil={openModalAgregarPerfil}
        handleOpenModalAgregarPerfil={handleOpenModalAgregarPerfil}
        handleCloseModalAgregarPerfil={handleCloseModalAgregarPerfil}
        loadObtenerListaPerfil={loadData}
      />
    </>
  )


}

export default ListaCita