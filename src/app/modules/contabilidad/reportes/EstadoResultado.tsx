import React from 'react';
import { Typography, Grid, Container, Card, CardContent } from '@mui/material';
import { useForm } from "react-hook-form";
import ControlledTextField from '../../../components/ControlledTextField';
import ControlledButton from '../../../components/ControlledButton';

const EstadoResultado = () => {
  const { handleSubmit, control } = useForm();

  const generar = (model: any) => {
    return model;
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
          Estado de Resultados
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
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

export default EstadoResultado
