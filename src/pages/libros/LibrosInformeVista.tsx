import React, { useEffect, useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import AplicationConnect from '../../core/api/AplicationConnect';

type Props = { titulo: string; apiPath: string };

const LibrosInformeVista = ({ titulo, apiPath }: Props) => {
  const [rows, setRows] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const cargar = async () => {
    setLoading(true);
    try {
      const res: any = await AplicationConnect.get(`/${apiPath}`);
      const datos = res.datos ?? res;
      setRows(datos.rows ?? []);
      setTotal(datos.count ?? 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, [apiPath]);

  const keys = rows[0] ? Object.keys(rows[0]) : [];

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {titulo}
          </Typography>
          <Button variant="outlined" onClick={cargar} disabled={loading} sx={{ mb: 2 }}>
            Actualizar
          </Button>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Registros: {total}
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                {keys.map((k) => (
                  <TableCell key={k}>{k}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((r, i) => (
                <TableRow key={i}>
                  {keys.map((k) => (
                    <TableCell key={k}>{typeof r[k] === 'object' ? JSON.stringify(r[k]) : String(r[k])}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LibrosInformeVista;
