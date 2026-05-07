import React from 'react';
import { Typography, Grid, Container, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useForm } from "react-hook-form";
import ControlledTextField from '../../../components/ControlledTextField';
import ControlledButton from '../../../components/ControlledButton';
import AplicationConnect from '../../../../core/api/AplicationConnect';

const LibroMayor = () => {
  const { handleSubmit, control } = useForm();
  const [rows, setRows] = React.useState<any[]>([]);

  const generar = async (model: any) => {
    const query = new URLSearchParams({
      periodo: model?.periodo || '',
      page: '1',
      limit: '200',
    }).toString();
    const respuesta = await AplicationConnect.get(`/libros/informes/libro-mayor?${query}`);
    setRows(respuesta?.datos?.rows || []);
  };

  return (
    <>
      <div style={{
        backgroundColor: '#DC3545', display: 'flex', flexDirection: 'row',
        justifyContent: 'flex-start', borderRadius: '5px',
        alignItems: 'center', marginBottom: '0px', marginTop: '0px'
      }}>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginLeft: '10px',
            color: 'white',
          }}
        >
          Libro Mayor
        </Typography>
      </div>
      <Container>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <ControlledTextField
                  label="Periodo"
                  control={control}
                  nameRegister="periodo"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <ControlledButton onClick={handleSubmit(generar)} variant="contained" color="primary">
                  Generar reporte
                </ControlledButton>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Fecha</TableCell>
                      <TableCell>Cuenta</TableCell>
                      <TableCell>Tercero</TableCell>
                      <TableCell>Debe</TableCell>
                      <TableCell>Haber</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.fecha ? String(row.fecha).slice(0, 10) : ''}</TableCell>
                        <TableCell>{row.cuenta}</TableCell>
                        <TableCell>{row.tercero}</TableCell>
                        <TableCell>{row.debe}</TableCell>
                        <TableCell>{row.haber}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

export default LibroMayor
