import React from 'react';
import { Typography, Grid, Container, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useForm } from "react-hook-form";
import ControlledTextField from '../../../components/ControlledTextField';
import ControlledButton from '../../../components/ControlledButton';
import AplicationConnect from '../../../../core/api/AplicationConnect';

const BalanceGeneral = () => {
  const { handleSubmit, control } = useForm();
  const [rows, setRows] = React.useState<any[]>([]);
  const [totales, setTotales] = React.useState<any>({});

  const generar = async (model: any) => {
    const query = new URLSearchParams({ periodo: model?.periodo || '' }).toString();
    const respuesta = await AplicationConnect.get(`/libros/informes/balance-general?${query}`);
    setRows(respuesta?.datos?.rows || []);
    setTotales(respuesta?.datos || {});
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
          Balance General
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
                      <TableCell>Categoria</TableCell>
                      <TableCell>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.categoria}</TableCell>
                        <TableCell>{row.total}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell><strong>Total activos</strong></TableCell>
                      <TableCell>{totales.totalActivos || 0}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Total pasivos</strong></TableCell>
                      <TableCell>{totales.totalPasivos || 0}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Total patrimonio</strong></TableCell>
                      <TableCell>{totales.totalPatrimonio || 0}</TableCell>
                    </TableRow>
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

export default BalanceGeneral
