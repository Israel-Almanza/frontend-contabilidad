import React from 'react';
import {
    Box,
    Button,
    Typography,
    Grid,
    Divider,
} from '@mui/material';
import ControlledTextField from '../../../../components/ControlledTextField';
import ControlledSelectField from '../../../../components/ControlledSelectField';

const styleModal = {
    width: '50vw',
    maxWidth: '1100px',   // opcional pero recomendado
    minWidth: '320px',    // mobile safe
    padding: '20px',
};

export const FormArticuloVenta = ({ guardar, cancelar, handleSubmit, control }) => {
    return (
        <Box sx={styleModal}>

            {/* ===== HEADER ===== */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                }}
            >
                <Typography variant="h6">Nombre del artículo</Typography>
                <Typography
                    sx={{
                        backgroundColor: '#E6F4EA',
                        color: '#2E7D32',
                        px: 2,
                        py: 0.5,
                        borderRadius: '12px',
                        fontSize: '12px',
                    }}
                >
                    Guardado
                </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* ===== CONTENIDO PRINCIPAL ===== */}
            <Grid container spacing={3}>

                {/* Imagen */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Box
                        sx={{
                            width: '100%',
                            height: 150,
                            borderRadius: '8px',
                            backgroundColor: '#F5F5F5',
                            backgroundImage: `url(/placeholder-image.png)`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                </Grid>

                {/* Campos principales */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12 }}>
                            <ControlledTextField
                                label="Nombre del artículo"
                                control={control}
                                nameRegister="nombre"
                                isRequired
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <ControlledTextField
                                label="Item Code"
                                control={control}
                                nameRegister="codigoItem"
                            />
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                            <ControlledSelectField
                                label="Propósito"
                                nameRegister="para"
                                control={control}
                                options={[
                                    { label: 'Ambos', value: 'ambos' },
                                    { label: 'Venta', value: 'venta' },
                                    { label: 'Compra', value: 'compra' },
                                ]}
                                valueField="value"
                                labelField="label"
                            />
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                            <ControlledSelectField
                                label="Tipo"
                                nameRegister="tipoItem"
                                control={control}
                                options={[
                                    { label: 'Product', value: 'product' },
                                    { label: 'Service', value: 'service' },
                                ]}
                                valueField="value"
                                labelField="label"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {/* ===== DETALLES ===== */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Detalles
                </Typography>

                <Grid container spacing={2}>
                    <Grid size={{ xs: 6 }}>
                        <ControlledSelectField
                            label="Tipo de unidad"
                            nameRegister="unidad"
                            control={control}
                            options={[
                                { label: 'Unit', value: 'unit' },
                                { label: 'Kg', value: 'kg' },
                            ]}
                            valueField="value"
                            labelField="label"
                        />
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <ControlledTextField
                            label="Tarifa"
                            control={control}
                            nameRegister="precio"
                            type="number"
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <ControlledTextField
                            label="Descripción"
                            control={control}
                            nameRegister="descripcion"
                            multiline
                            rows={3}
                        />
                    </Grid>
                </Grid>
            </Box>

            {/* ===== CUENTAS ===== */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Cuentas
                </Typography>

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <ControlledSelectField
                            label="Cuenta de ventas"
                            nameRegister="cuentaIngreso"
                            control={control}
                            options={[
                                { label: 'Ingresos', value: 'ingresos' },
                                { label: 'Sales', value: 'sales' },
                            ]}
                            valueField="value"
                            labelField="label"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <ControlledSelectField
                            label="Cuenta de compras"
                            nameRegister="cuentaGasto"
                            control={control}
                            options={[
                                { label: 'Gasto', value: 'gasto' },
                                { label: 'Expenses', value: 'expenses' },
                            ]}
                            valueField="value"
                            labelField="label"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <ControlledSelectField
                            label="Impuesto"
                            nameRegister="impuesto"
                            control={control}
                            options={[
                                { label: 'Sin impuesto', value: 'none' },
                                { label: 'IVA 13%', value: 'iva13' },
                            ]}
                            valueField="value"
                            labelField="label"
                        />
                    </Grid>
                </Grid>
            </Box>

            {/* ===== INVENTARIO ===== */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Inventario
                </Typography>

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <ControlledTextField
                            label="HSN / SAC"
                            control={control}
                            nameRegister="codigoHSN"
                        />
                    </Grid>
                </Grid>
            </Box>

            {/* ===== ACCIONES ===== */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mt: 4,
                }}
            >
                <Button onClick={cancelar} sx={{ mr: 2 }}>
                    Cancelar
                </Button>
                <Button
                    onClick={handleSubmit(guardar)}
                    variant="contained"
                >
                    Guardar
                </Button>
            </Box>
        </Box>
    );
};
