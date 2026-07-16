import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Grid,
  IconButton,
  Button,
  Avatar,
  Chip,
  Paper,
  TextField,
  Divider,
  Tabs,
  Tab,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Stack,
  Badge,
  Breadcrumbs,
  Link,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import {
  Search,
  ShoppingCartOutlined,
  PersonOutline,
  FavoriteBorder,
  Favorite,
  LocalFireDepartment,
  LocalCafe,
  ArrowForwardIos,
  Add,
  Remove,
  StarBorder,
  ZoomIn,
} from "@mui/icons-material";
import LayoutTemplate from "./components/LayoutTemplate";
import CardProducto from "./components/CardProducto";
import AplicationConnect from "../../../core/api/AplicationConnect";
import { useParams } from "react-router-dom";
import { buildImageUrl } from "../../../app/utils/manejoUrl";


const imagenes = [
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900",

];

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div hidden={value !== index}>
      {value === index && (
        <Box py={4}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function VerProductoPage() {

  const navigate = useNavigate();
  const [imagen, setImagen] = useState(imagenes[0]);
  const [cantidad, setCantidad] = useState(1);
  const [peso, setPeso] = useState("250");
  const [tab, setTab] = useState(0);
  const [favorito, setFavorito] = useState(false);


  const [productos, setProductos] = useState([])
  const [producto, setProducto] = useState({})
  const host = window.location.hostname;
  // tienda-xyz.localhost
  const subdomain = host.split(".")[0];

  const { id } = useParams();

  console.log('id producto', id);

  // tienda-xyz
  useEffect(() => {
    getProducto()
    getProductos()
  }, []);

  // trer productos relaciondos
  const getProductos = async () => {
    const { datos } = await AplicationConnect.get(`/public/comercio/articulos?dominio=${subdomain}&limit=4`)
    setProductos(datos.rows)
  }

  const getProducto = async () => {
    const { datos } = await AplicationConnect.get(`/public/comercio/articulos/${id}?dominio=${subdomain}`)
    console.log('prod ', datos)
    setProducto(datos)
  }

  return (
    <LayoutTemplate>
      <Box
        sx={{
          background: "#faf8f6",
          minHeight: "100vh"
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            mt: 4,
            mb: 6
          }}
        >

          <Breadcrumbs sx={{ mb: 4 }}>

            <Link
              underline="hover"
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate('/home')}
            >

              Inicio

            </Link>

            <Link underline="hover">

              Productos

            </Link>

            <Typography>

              {producto.nombre}
            </Typography>

          </Breadcrumbs>

          <Grid
            container
            spacing={4}
          >

            {/* GALERIA */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "flex-start",
                  flexDirection: {
                    xs: "column-reverse",
                    md: "row",
                  },
                }}
              >

                {/* MINIATURAS */}

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: {
                      xs: "row",
                      md: "column",
                    },
                    gap: 2,
                    overflowX: "auto",
                  }}
                >

                  {imagenes.map((img, index) => (

                    <Box
                      key={index}
                      onClick={() => setImagen(img)}
                      sx={{
                        cursor: "pointer",
                        width: 90,
                        height: 90,
                        borderRadius: 2,
                        overflow: "hidden",
                        border:
                          imagen === img
                            ? "2px solid #6b3e1e"
                            : "1px solid #ddd",
                        transition: ".25s",
                        "&:hover": {
                          border: "2px solid #6b3e1e",
                        },
                      }}
                    >

                      <Box
                        component="img"
                        src={buildImageUrl(producto.imagen)}
                        alt=""
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />

                    </Box>

                  ))}

                </Box>

                {/* IMAGEN PRINCIPAL */}

                <Box
                  sx={{
                    flex: 1,
                    position: "relative",
                  }}
                >

                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 4,
                      overflow: "hidden",
                      background: "#f4ede7",
                    }}
                  >

                    <Box
                      component="img"
                      src={buildImageUrl(producto.imagen)}
                      alt=""
                      sx={{
                        width: "100%",
                        display: "block",
                        height: {
                          xs: 350,
                          sm: 450,
                          md: 650,
                        },
                        objectFit: "cover",
                      }}
                    />

                  </Paper>

                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 20,
                      right: 20,
                      background: "white",
                      boxShadow: 3,
                      "&:hover": {
                        background: "white",
                      },
                    }}
                  >

                    <ZoomIn />

                  </IconButton>

                </Box>

              </Box>

            </Grid>

            {/* =================== INFORMACION ================= */}

            <Grid size={{ xs: 12, md: 5 }}>
              <Chip
                label="Más vendido"
                icon={<LocalFireDepartment />}
                sx={{
                  mb: 3,
                  background: "#f3e5d8",
                  color: "#6b3e1e",
                  fontWeight: 700
                }}
              />

              <Typography
                variant="h3"
                fontWeight={700}
                sx={{
                  mb: 2,
                  fontFamily: "serif"
                }}
              >
                {producto.nombre}
              </Typography>

              <Typography
                color="text.secondary"
                lineHeight={1.8}
                mb={3}
              >

                {producto.descripcion}

              </Typography>

              <Typography
                variant="h3"
                fontWeight={700}
                color="#5a2d0c"
                mb={3}
              >

                Bs {producto.precioVenta}

              </Typography>

              <Stack
                direction="row"
                spacing={4}
                flexWrap="wrap"
                mb={4}
              >

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >

                  <LocalCafe
                    sx={{
                      color: "#7b4a22"
                    }}
                  />

                  <Typography>

                    Granos seleccionados

                  </Typography>

                </Stack>

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >

                  <LocalFireDepartment
                    sx={{
                      color: "#7b4a22"
                    }}
                  />

                  <Typography>

                    Tueste medio

                  </Typography>

                </Stack>

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >

                  <StarBorder
                    sx={{
                      color: "#7b4a22"
                    }}
                  />

                  <Typography>

                    100% Natural

                  </Typography>

                </Stack>

              </Stack>

              <Paper
                variant="outlined"
                sx={{
                  p: 3,
                  borderRadius: 4
                }}
              >

                <Typography
                  fontWeight={700}
                  mb={2}
                >

                  Presentación

                </Typography>

                <ToggleButtonGroup

                  exclusive

                  value={peso}

                  onChange={(e, v) => {
                    if (v) setPeso(v)
                  }}

                >

                  <ToggleButton value="250">

                    250 g

                  </ToggleButton>

                  <ToggleButton value="500">

                    500 g

                  </ToggleButton>

                  <ToggleButton value="1000">

                    1 Kg

                  </ToggleButton>

                </ToggleButtonGroup>

                <Box mt={4}>

                  <Typography
                    fontWeight={700}
                    mb={2}
                  >

                    Cantidad

                  </Typography>

                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                  >

                    <IconButton
                      onClick={() => {
                        if (cantidad > 1)
                          setCantidad(cantidad - 1)
                      }}
                    >

                      <Remove />

                    </IconButton>

                    <Typography
                      fontWeight={700}
                      fontSize={20}
                    >

                      {cantidad}

                    </Typography>

                    <IconButton
                      onClick={() =>
                        setCantidad(cantidad + 1)
                      }
                    >

                      <Add />

                    </IconButton>

                    <Box flex={1} />

                    <Chip
                      label="En stock"
                      color="success"
                    />

                  </Stack>

                </Box>

                <Box mt={4}>

                  <Stack
                    direction={{
                      xs: "column",
                      sm: "row"
                    }}
                    spacing={2}
                  >

                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      startIcon={<ShoppingCartOutlined />}
                      sx={{
                        height: 56,
                        background: "#5a2d0c",
                        "&:hover": {
                          background: "#43200a"
                        },
                        borderRadius: 2,
                        textTransform: "none",
                        fontSize: 16,
                        fontWeight: 600
                      }}
                    >

                      Agregar al carrito

                    </Button>

                    <Button
                      variant="outlined"
                      fullWidth
                      size="large"
                      sx={{
                        height: 56,
                        borderRadius: 2,
                        textTransform: "none",
                        fontSize: 16,
                        fontWeight: 600,
                        borderColor: "#5a2d0c",
                        color: "#5a2d0c",
                        "&:hover": {
                          borderColor: "#5a2d0c",
                          background: "#f8f3ef"
                        }
                      }}
                    >

                      Comprar ahora

                    </Button>

                  </Stack>

                  <Button

                    startIcon={
                      favorito
                        ?
                        <Favorite color="error" />
                        :
                        <FavoriteBorder />
                    }

                    onClick={() => setFavorito(!favorito)}

                    sx={{
                      mt: 2,
                      textTransform: "none",
                      color: "#5a2d0c"
                    }}

                  >

                    Agregar a favoritos

                  </Button>

                </Box>

              </Paper>

            </Grid>

          </Grid>

          {/* ================================================= */}

          {/* TABS */}

          {/* ================================================= */}

          <Box mt={8}>

            <Tabs

              value={tab}

              onChange={(e, v) => setTab(v)}

              textColor="inherit"

              indicatorColor="primary"

              variant="scrollable"

              scrollButtons="auto"

              sx={{

                mb: 2,

                "& .MuiTabs-indicator": {

                  background: "#5a2d0c",

                  height: 3

                }

              }}

            >

              <Tab
                label="Descripción"
              />

              <Tab
                label="Características"
              />

              <Tab
                label="Envíos"
              />

              <Tab
                label="Reseñas (24)"
              />

            </Tabs>

            <Divider />

            {/* ========================================== */}

            {/* DESCRIPCION */}

            {/* ========================================== */}

            <TabPanel
              value={tab}
              index={0}
            >

              <Typography

                lineHeight={2}

                color="text.secondary"

              >
                {producto.descripcion}
              </Typography>

            </TabPanel>

            {/* ========================================== */}

            {/* CARACTERISTICAS */}

            {/* ========================================== */}

            <TabPanel
              value={tab}
              index={1}
            >

              <Stack spacing={2}>

                <Typography>

                  • Café 100% Arábica

                </Typography>

                <Typography>

                  • Tueste medio

                </Typography>

                <Typography>

                  • Cultivado en altura

                </Typography>

                <Typography>

                  • Empaque con válvula desgasificadora

                </Typography>

                <Typography>

                  • Molido o en grano

                </Typography>

                <Typography>

                  • Producto Premium

                </Typography>

              </Stack>

            </TabPanel>

            {/* ========================================== */}

            {/* ENVIOS */}

            {/* ========================================== */}

            <TabPanel
              value={tab}
              index={2}
            >

              <Typography
                lineHeight={2}
              >

                Realizamos envíos a todo el país.

                Tiempo estimado:

                • Santa Cruz: 24 horas

                • La Paz y Cochabamba: 48 horas

                • Resto del país: 3 a 5 días hábiles.

              </Typography>

            </TabPanel>

            {/* ========================================== */}

            {/* RESEÑAS */}

            {/* ========================================== */}

            <TabPanel
              value={tab}
              index={3}
            >

              <Stack spacing={3}>

                <Paper
                  variant="outlined"
                  sx={{
                    p: 3,
                    borderRadius: 3
                  }}
                >

                  <Typography fontWeight={700}>

                    ★★★★★ Juan Pérez

                  </Typography>

                  <Typography
                    mt={1}
                    color="text.secondary"
                  >

                    Excelente café. Muy aromático y de gran calidad.

                  </Typography>

                </Paper>

                <Paper
                  variant="outlined"
                  sx={{
                    p: 3,
                    borderRadius: 3
                  }}
                >

                  <Typography fontWeight={700}>

                    ★★★★★ María Gómez

                  </Typography>

                  <Typography
                    mt={1}
                    color="text.secondary"
                  >

                    El sabor es espectacular. Lo volvería a comprar.

                  </Typography>

                </Paper>

              </Stack>

            </TabPanel>

          </Box>

          {/* ======================================================== */}

          {/* PRODUCTOS RELACIONADOS */}

          {/* ======================================================== */}

          <Box mt={10}>

            <Typography
              variant="h4"
              fontWeight={700}
              mb={4}
              fontFamily="serif"
            >

              También te puede gustar

            </Typography>

            <Grid
              container
              spacing={3}
            >

              {productos.map((producto) => (
                <CardProducto producto={producto} />
              ))}

            </Grid>

          </Box>

        </Container>
      </Box>
    </LayoutTemplate>
  );
}