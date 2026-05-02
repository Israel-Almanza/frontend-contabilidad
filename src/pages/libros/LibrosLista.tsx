import React, { useState } from 'react';
import { Container, Card, CardContent, Typography, TableRow, TableCell, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CrudTable from '../../app/components/CrudTable';
import ControlledTextField from '../../app/components/ControlledTextField';
import ControlledButton from '../../app/components/ControlledButton';
import { useForm } from 'react-hook-form';
import AplicationConnect from '../../core/api/AplicationConnect';

type ColumnDef = { value: string; label: string };

type LibrosListaProps = {
  titulo: string;
  /** API path after baseURL, e.g. libros/articulos */
  url: string;
  columns: ColumnDef[];
  filtros?: { label: string; field: string }[];
};

const LibrosLista = ({ titulo, url, columns, filtros = [] }: LibrosListaProps) => {
  const { control, handleSubmit, reset } = useForm();
  const [tituloFormulario, setTituloFormulario] = useState('Nuevo');

  const RowComponent = ({ row, open, eliminar }: any) => (
    <TableRow>
      {columns.map((c) => (
        <TableCell key={c.value}>{String(row[c.value] ?? '')}</TableCell>
      ))}
      <TableCell>
        <IconButton size="small" onClick={() => eliminar({ url: `${url}/${row.id}` })}>
          <DeleteIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={async () => {
            setTituloFormulario('Editar');
            reset({});
            const res: any = await AplicationConnect.get(`/${url}/${row.id}`);
            reset(res.datos ?? res);
            open();
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  const FormComponent = ({ close, update }: any) => {
    const guardar = async (model: any) => {
      if (model.id) {
        await AplicationConnect.put(`/${url}/${model.id}`, model);
      } else {
        await AplicationConnect.post(`/${url}`, model);
      }
      await update();
      close();
    };

    return (
      <form onSubmit={handleSubmit(guardar)}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          {tituloFormulario}
        </Typography>
        {columns.map((c) => (
          <ControlledTextField
            key={c.value}
            label={c.label}
            nameRegister={c.value}
            control={control}
          />
        ))}
        <ControlledButton type="submit" variant="contained">
          Guardar
        </ControlledButton>
        <ControlledButton type="button" variant="outlined" onClick={close}>
          Cerrar
        </ControlledButton>
      </form>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {titulo}
          </Typography>
          <CrudTable
            url={url}
            columns={columns}
            RowComponent={RowComponent}
            FormComponent={FormComponent}
            filters={filtros}
            HeaderActions={({ open }: any) => (
              <ControlledButton
                variant="contained"
                onClick={() => {
                  setTituloFormulario('Nuevo');
                  reset({});
                  open();
                }}
              >
                Nuevo
              </ControlledButton>
            )}
          />
        </CardContent>
      </Card>
    </Container>
  );
};

export default LibrosLista;
