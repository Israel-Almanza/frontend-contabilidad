import React, { useState } from "react";
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
  ExpandLess,
  ExpandMore,
  ZoomIn,
  Facebook,
  Instagram,
  WhatsApp,
} from "@mui/icons-material";
import LayoutTemplate from "./LayoutTemplate";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
}

const imagenes = [
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900",
  "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=900",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900",
  "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=900",
];

const relacionados: Producto[] = [
  {
    id: 1,
    nombre: "Café Espresso Premium",
    precio: 50,
    imagen:
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=500",
  },
  {
    id: 2,
    nombre: "Café Descafeinado",
    precio: 48,
    imagen:
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=500",
  },
  {
    id: 3,
    nombre: "Café Orgánico",
    precio: 55,
    imagen:
      "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=500",
  },
  {
    id: 4,
    nombre: "Capsulas de Café",
    precio: 35,
    imagen:
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=500",
  },
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

  const [imagen, setImagen] = useState(imagenes[0]);
  const [cantidad, setCantidad] = useState(1);
  const [peso, setPeso] = useState("250");
  const [tab, setTab] = useState(0);
  const [favorito, setFavorito] = useState(false);

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

          <Link underline="hover">

            Inicio

          </Link>

          <Link underline="hover">

            Productos

          </Link>

          <Typography>

            Café 100% Arábica

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
                      src={img}
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
                    src={imagen}
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

              Café 100% Arábica

            </Typography>

            <Typography
              color="text.secondary"
              lineHeight={1.8}
              mb={3}
            >

              Suave y equilibrado con notas frutales y florales.
              Ideal para quienes disfrutan de un café premium
              preparado con granos seleccionados.

            </Typography>

            <Typography
              variant="h3"
              fontWeight={700}
              color="#5a2d0c"
              mb={3}
            >

              Bs 45,00

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

              Nuestro Café 100% Arábica está elaborado con granos
              seleccionados provenientes de las mejores regiones
              cafetaleras.

              Su tueste medio permite resaltar notas frutales,
              florales y un sabor equilibrado, perfecto para
              disfrutar en cualquier momento del día.

              Cada paquete conserva la frescura del café para
              garantizar una experiencia premium en cada taza.

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

            {relacionados.map((producto) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={producto.id}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    overflow: "hidden",
                    border: "1px solid #ececec",
                    transition: ".3s",
                    display: "flex",
                    flexDirection: "column",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 15px 35px rgba(0,0,0,.12)"
                    }
                  }}
                >

                  <Box
                    sx={{
                      overflow: "hidden"
                    }}
                  >

                    <CardMedia
                      component="img"
                      height="240"
                      image={producto.imagen}
                      sx={{
                        transition: ".4s",
                        "&:hover": {
                          transform: "scale(1.08)"
                        }
                      }}
                    />

                  </Box>

                  <CardContent
                    sx={{
                      flex: 1
                    }}
                  >

                    <Typography
                      variant="h6"
                      fontWeight={700}
                      mb={1}
                    >

                      {producto.nombre}

                    </Typography>

                    <Typography
                      color="text.secondary"
                      mb={2}
                    >

                      Café Premium de especialidad.

                    </Typography>

                    <Typography
                      variant="h5"
                      fontWeight={700}
                      color="#5a2d0c"
                    >

                      Bs {producto.precio}

                    </Typography>

                  </CardContent>

                  <CardActions
                    sx={{
                      p: 2
                    }}
                  >

                    <Button
                      fullWidth
                      variant="contained"
                      endIcon={<ArrowForwardIos sx={{ fontSize: 14 }} />}
                      sx={{
                        background: "#5a2d0c",
                        textTransform: "none",
                        borderRadius: 2,
                        height: 46,
                        "&:hover": {
                          background: "#43200a"
                        }
                      }}
                    >

                      Ver detalle

                    </Button>

                  </CardActions>

                </Card>

              </Grid>

            ))}

          </Grid>

        </Box>

        </Container>
      </Box>
    </LayoutTemplate>
  );
}