import { Typography, Button, Collapse, TextField, Modal, TableRow, TableCell,Grid, IconButton } from '@mui/material'
import React, { useState, useEffect } from 'react'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { KDImage } from '../../../../core/modal-loading/KDImage';
import { styled } from "@mui/system";
import Box from '@mui/material/Box';
import { usePerfil } from '../services/usePerfil';
import { AlertError, AlertQuestion, AlertSave } from '../../../common/alerts/alerts';
import Odontogram from './Odontogram';
import CrudTable from '../../../components/CrudTable';
import InputTextFieldCustomNormal from '../../../components/ControlledTextField';
import { Controller, useForm } from "react-hook-form";

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 1000,
    maxHeight: '90vh',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
};

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#008000'),
    backgroundColor: '#008000',
    '&:hover': {
        backgroundColor: '#0A680A',
    },
}));


export const ModalAgregarPerfil = (props: any) => {

    const { loadApiGuardarPerfil } = usePerfil()
    const { formState, handleSubmit, control, register, getValues, setValue, reset } = useForm();
    const { openModalAgregarPerfil, handleOpenModalAgregarPerfil, handleCloseModalAgregarPerfil,
        loadObtenerListaPerfil } = props;

    const [nomPerfil, setNomPerfil] = useState<string>('')
    //loading
    const [loading, setLoading] = useState(
        false
    );

    const closeModalResetForm = () => {


        setNomPerfil('')
        handleCloseModalAgregarPerfil()
    }

    const columns = [
        { id: 'fecha', label: 'Fecha' },
        { id: 'servicio', label: 'Servicio' },
        { id: 'precio', label: 'Precio' },
        { id: 'numeroDientes', label: 'Numero Dientes' },
        { id: 'observaciones', label: 'Observaciones' }
    ];

    const filters = [
        { label: 'Fecha', field: 'contacto', type: 'input' },
        { label: 'Servicio', field: 'Nombre de Paciente', type: 'input' },
    ];

    const url = 'clinica/pacientes';


    useEffect(() => {
        setValue('nombre', 'TONY MONTANA SILVA')
        setValue('sexo', 'MASCULINO')
        setValue('edad', '22')
        setValue('telefono', '3242344000')
        setValue('direccion', 'Av Juarez')
    }, []);


    const RowComponent = ({ row, open, update, eliminar }) => {
        const btnDeleted = async (item: any) => {
            console.log('item ', item)
            await eliminar(item.instancia.instance_key)
            // instance_key
        }

        return (
            <TableRow>
                <TableCell>{row.fecha}</TableCell>
                <TableCell>{row.servicio}</TableCell>
                <TableCell>{row.precio}</TableCell>
                <TableCell>{row.numeroDientes}</TableCell>
                <TableCell>{row.observaciones}</TableCell>
            </TableRow>
        );
    };


    return (
        <Modal
            open={openModalAgregarPerfil}
            //onClose={handleCloseModalAgregarPerfil}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>

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

                </Grid>
                <CrudTable
                    url={url}
                    filters={filters}
                    columns={columns}
                    dataStatic='servicio-cliente'
                    RowComponent={RowComponent}
                    footerSlot={<div>Total de registros</div>}
                />
                <Odontogram />
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

                    <ColorButton variant="contained"> Crear</ColorButton>

                    &nbsp; &nbsp;
                    <Button onClick={closeModalResetForm} sx={{
                        backgroundColor: '#6E7881',
                        '&:hover': {
                            backgroundColor: '#474849',
                        },

                    }} variant="contained" >Cancel</Button>
                </div>
                <br />
                {loading ? <KDImage /> : null}
            </Box>
        </Modal>
    )
}
