// CrudTable.js
import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  TextField,
  InputAdornment,
  TablePagination,
  Collapse,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterListIcon from '@mui/icons-material/FilterList';
import AplicationConnect from '../../core/api/AplicationConnect';
import dataClientesJson from '../../data/clinica/clientes.json'
import dataPacientesJson from '../../data/hospital/pacientes.json'
import dataCitasJson from '../../data/hospital/citas.json'
import dataServicioClienteJson from '../../data/clinica/servicio-cliente.json'

import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';


const tableStyling = {
  //padding: "0px 0px",
  backgroundColor: '#F2F2F2',
  padding: '10px',
  //fontSize: '11px',
  borderRight: "1px solid #A7A7A7",
  borderBottom: "1px solid #A7A7A7",
  fontWeight: 'bold'
  //borderRight: "2px solid black",



};

const CrudTable = ({ url = '', columns = [], RowComponent, footerSlot, HeaderActions,
  FormComponent = null, filters = [], dataStatic = '' }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterValues, setFilterValues] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  // Estados para paginación
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const orderBy = "PERFIL"
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalRows, setTotalRows] = useState(0);


  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

  const fetchData = async () => {
    setLoading(true);

    // Convert filterValues to query string
    const queryParams = new URLSearchParams({
      ...filterValues,
      page: page + 1,
      limit: rowsPerPage,
    }).toString();

    dataServicioClienteJson
    if (dataStatic === 'clientes') {
      setData(dataClientesJson.rows);
      setTotalRows(dataClientesJson.count);
      setLoading(false);
    } else if (dataStatic === 'servicio-cliente') {
      setData(dataServicioClienteJson.rows);
      setTotalRows(dataServicioClienteJson.count);
      setLoading(false);
    } else if (dataStatic === 'pacientes') {
      setData(dataPacientesJson.rows);
      setTotalRows(dataPacientesJson.count);
      setLoading(false);
    } else if (dataStatic === 'citas') {
      setData(dataCitasJson.rows);
      setTotalRows(dataCitasJson.count);
      setLoading(false);
    }
    else {
      const response = await AplicationConnect.get<any>(`${url}?${queryParams}`)
      const result = response.datos;

      setData(result.rows);
      setTotalRows(result.count);
      setLoading(false);
    }

  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  const handleDelete = async ({ url }) => {
    // await fetch(`${url}/${id}`, { method: 'DELETE' });
    // console.log('id a eliminar ', id)
    // console.log('url---------> ', url)
    await AplicationConnect.delete(url)
    fetchData();
  };

  const handlePageChange = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Toolbar>
        <Button onClick={fetchData} startIcon={<RefreshIcon />}>
          Actualizar
        </Button>
        {HeaderActions && (
          <HeaderActions open={handleOpen} />
        )}


        {/* Botón para mostrar los filtros */}
        <Button
          onClick={() => setShowFilters((prev) => !prev)}
          variant="outlined"
          startIcon={<FilterListIcon />}
          style={{ marginLeft: '10px' }}
        >
          Filtros
        </Button>
      </Toolbar>

      {/* Filtros con Collapse */}
      <Collapse in={showFilters}>
        <Box padding={2} border="1px solid #ddd" borderRadius={4} marginBottom={2}>
          {filters.map((filter) => (
            <TextField
              key={filter.field}
              label={filter.label}
              value={filterValues[filter.field] || ''}
              onChange={(e) =>
                setFilterValues({ ...filterValues, [filter.field]: e.target.value })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              margin="dense"
              style={{ marginRight: '10px' }}
            />
          ))}
          <Button onClick={fetchData} variant="contained" color="primary" style={{ marginTop: '10px' }}>
            Buscar
          </Button>
        </Box>
      </Collapse>

      <TableContainer style={{ marginTop: '5px' }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#1976d2', color: '#fff' }}>
              {columns?.map((column) => (
                <TableCell key={column.value}

                  sx={{
                    ...tableStyling,
                    width: column.width || 'auto',
                    maxWidth: column.width || 'auto',
                  }}
                >

                  <TableSortLabel
                    active={orderBy === "PERFIL"}
                    direction={orderBy === "PERFIL" ? order : 'asc'}
                  >
                    {column.label}
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell sx={{
                ...tableStyling,
              }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} style={{ textAlign: 'center', padding: '20px' }}>
                  Cargando...
                </TableCell>
              </TableRow>
            ) : (
              data?.map((row) => (
                <RowComponent
                  key={row.id}
                  row={row}
                  open={handleOpen}
                  update={fetchData}
                  eliminar={handleDelete}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginación */}
      <TablePagination
        component="div"
        count={totalRows}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      {FormComponent && (
        <Dialog open={open} onClose={handleClose} maxWidth={false}      // 🔥 elimina límites predefinidos
          PaperProps={{
            sx: {
              width: 'auto',    // deja que el contenido mande
            },
          }}
        >
          {/*<DialogTitle>{selectedItem ? 'Editar' : 'Agregar'} Elemento</DialogTitle>*/}
          <DialogContent >
            <FormComponent close={handleClose} update={fetchData} />
          </DialogContent>
        </Dialog>
      )}

      {/* Renderizar el pie de tabla si es necesario */}
      {footerSlot}
    </div>
  );
};

export default CrudTable;
