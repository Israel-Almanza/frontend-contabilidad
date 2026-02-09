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
import InputTextFieldCustomNormal from '../../components/ControlledTextField';
import InputDateFieldCustomNormal from '../../components/ControlledDateField';

const Perfil = () => {

  const { formState, handleSubmit, control, register, getValues, setValue, reset } = useForm();

  const [originalRows, setoriginalRows] = useState<any>([])
  const [listPerfil, setListPerfil] = useState<any>(originalRows)

  const columns = [
    { id: 'numeroDientes', label: 'Numero de Diente' },
    { id: 'servicio', label: 'Servicio' },
    { id: 'precio', label: 'Precio' },
  ];

  const filters = [
    { label: 'Nombre', field: 'contacto', type: 'input' },
    { label: 'Instancia', field: 'Nombre de Paciente', type: 'input' },
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
    setValue('nombre', 'TONY MONTANA SILVA')
    setValue('sexo', 'MASCULINO')
    setValue('edad', '22')
    setValue('telefono', '3242344000')
    setValue('direccion', 'Av Juarez')
    setValue('nro', '34')
  }, []);

  const loadData = async () => {
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
        <TableCell>{row.numeroDientes}</TableCell>
        <TableCell>{row.servicio}</TableCell>
        <TableCell>{row.precio}</TableCell>
        <TableCell>
          <IconButton onClick={() => btnDeleted(row)} color="secondary">
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={handleOpenModalAgregarPerfil}
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

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }} >
          <Grid item xs={11} sm={11} md={11}>
            <Typography variant="subtitle1" gutterBottom sx={{
              marginLeft: '10px', marginTop: '5px',
              color: 'white', alignItems: 'center'
            }} >
              <ManageAccountsIcon sx={{ marginLeft: '20px', color: 'white' }} />
              FACTURAS
            </Typography>
          </Grid>
        </Grid>
      </div>
      <Container>
        <Card>
          <CardContent>
            <Grid container spacing={2}>

              <Grid item xs={12} md={6}>
                <InputTextFieldCustomNormal
                  label="Nombre del Paciente"
                  control={control}
                  isRequired={true}
                  readOnly={true}
                  nameRegister="nombre"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <InputTextFieldCustomNormal
                  label="Sexo"
                  control={control}
                  isRequired={true}
                  readOnly={true}
                  nameRegister="sexo"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <InputTextFieldCustomNormal
                  label="Edad"
                  control={control}
                  isRequired={true}
                  readOnly={true}
                  nameRegister="edad"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <InputTextFieldCustomNormal
                  label="Teléfono"
                  control={control}
                  isRequired={true}
                  readOnly={true}
                  nameRegister="telefono"
                />
              </Grid>

              <Grid item xs={12}>
                <InputTextFieldCustomNormal
                  label="Dirección"
                  control={control}
                  isRequired={true}
                  readOnly={true}
                  nameRegister="direccion"
                />
              </Grid>

              <Grid item xs={12}>
                <InputTextFieldCustomNormal
                  label="Factura #"
                  control={control}
                  isRequired={true}
                  readOnly={true}
                  nameRegister="nro"
                />
              </Grid>
              <Grid item xs={12}>
                <InputDateFieldCustomNormal
                  label="Fecha de Factura"
                  control={control}
                  isRequired={true}
                  readOnly={true}
                  nameRegister="fecha"
                />
              </Grid>

            </Grid>
            <Grid>
              <Grid item xl={8} lg={6} md={5} sm={4} xs={3}>
                <CrudTable
                  url={url}
                  filters={filters}
                  columns={columns}
                  RowComponent={RowComponent}
                  FormComponent={FormComponent}
                  dataStatic='servicio-cliente'
                  footerSlot={<div>Total de registros</div>}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
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

export default Perfil