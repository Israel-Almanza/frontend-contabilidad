import React, { useEffect } from 'react';
import { Container, Card, CardContent, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import ControlledTextField from '../../app/components/ControlledTextField';
import ControlledButton from '../../app/components/ControlledButton';
import AplicationConnect from '../../core/api/AplicationConnect';

const ConfiguracionContabilidadPage = () => {
  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    (async () => {
      const res: any = await AplicationConnect.get('/libros/configuracion/contabilidad');
      const d = res.datos ?? res;
      if (d) reset(d);
    })();
  }, [reset]);

  const guardar = async (data: any) => {
    if (data.id) {
      await AplicationConnect.put(`/libros/configuracion/contabilidad/${data.id}`, data);
    } else {
      await AplicationConnect.post('/libros/configuracion/contabilidad', data);
    }
    const res: any = await AplicationConnect.get('/libros/configuracion/contabilidad');
    reset(res.datos ?? res);
  };

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Configuración contable
          </Typography>
          <form onSubmit={handleSubmit(guardar)}>
            <ControlledTextField label="Nombre completo" nameRegister="nombreCompleto" control={control} />
            <ControlledTextField label="Nombre empresa" nameRegister="nombreEmpresa" control={control} />
            <ControlledTextField label="Banco" nameRegister="banco" control={control} />
            <ControlledTextField label="País" nameRegister="pais" control={control} />
            <ControlledTextField label="Correo" nameRegister="correo" control={control} />
            <ControlledTextField label="Id (solo lectura)" nameRegister="id" control={control} readOnly />
            <ControlledButton type="submit" variant="contained">
              Guardar
            </ControlledButton>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ConfiguracionContabilidadPage;
