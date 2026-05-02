import React from 'react';
import { Box, Card, CardActionArea, CardContent, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type Bloque = { titulo: string; color: string; items: { label: string; path: string }[] };

const bloques: Bloque[] = [
  {
    titulo: 'Ventas',
    color: '#1565c0',
    items: [
      { label: 'Cotizaciones', path: '/libros/ventas/cotizaciones' },
      { label: 'Facturas venta', path: '/libros/ventas/facturas' },
      { label: 'Pagos venta', path: '/libros/ventas/pagos' },
      { label: 'Clientes', path: '/libros/ventas/clientes' },
      { label: 'Artículos venta', path: '/libros/ventas/articulos' },
    ],
  },
  {
    titulo: 'Compras',
    color: '#2e7d32',
    items: [
      { label: 'Facturas compra', path: '/libros/compras/facturas' },
      { label: 'Pagos compra', path: '/libros/compras/pagos' },
      { label: 'Proveedores', path: '/libros/compras/proveedores' },
      { label: 'Artículos compra', path: '/libros/compras/articulos' },
    ],
  },
  {
    titulo: 'Común',
    color: '#6a1b9a',
    items: [
      { label: 'Entrada diario', path: '/libros/comun/entradas-diario' },
      { label: 'Socios comerciales', path: '/libros/socios-comerciales' },
      { label: 'Artículos', path: '/libros/articulos' },
    ],
  },
  {
    titulo: 'Informes',
    color: '#ef6c00',
    items: [
      { label: 'Libro mayor', path: '/libros/informes/libro-mayor' },
      { label: 'Ganancias y pérdidas', path: '/libros/informes/ganancias-perdidas' },
      { label: 'Balance general', path: '/libros/informes/balance-general' },
      { label: 'Balance provisional', path: '/libros/informes/balance-provisional' },
    ],
  },
  {
    titulo: 'Configuración',
    color: '#455a64',
    items: [
      { label: 'Plan de cuentas', path: '/libros/plan-cuentas' },
      { label: 'Plantillas impuestos', path: '/libros/configuracion/plantillas-impuestos' },
      { label: 'Plantillas impresión', path: '/libros/configuracion/plantillas-impresion' },
      { label: 'Configuración contable', path: '/libros/configuracion/contabilidad' },
    ],
  },
];

const LibrosInicioPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>
        Contabilidad (Libros)
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Accesos a todos los módulos conectados al API <code>/libros/*</code>.
      </Typography>
      <Grid container spacing={2}>
        {bloques.map((bloque) => (
          <Grid key={bloque.titulo} item xs={12} md={6} lg={4}>
            <Card variant="outlined" sx={{ height: '100%', borderTop: 4, borderColor: bloque.color }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: bloque.color, mb: 1 }}>
                  {bloque.titulo}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  {bloque.items.map((it) => (
                    <CardActionArea
                      key={it.path}
                      onClick={() => navigate(it.path)}
                      sx={{ borderRadius: 1, px: 1, py: 0.75 }}
                    >
                      <Typography variant="body2">{it.label}</Typography>
                    </CardActionArea>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default LibrosInicioPage;
