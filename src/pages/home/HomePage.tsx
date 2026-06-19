import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Stack,
  Chip,
  Divider,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MusicNoteIcon from "@mui/icons-material/MusicNote"; // TikTok aproximado

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

const products = [
  {
    id: 1,
    name: "Café 100% Arábica",
    price: 45,
    image: "https://picsum.photos/300/250?1",
    description: "Suave y equilibrado con notas florales.",
  },
  {
    id: 2,
    name: "Café Espresso Premium",
    price: 50,
    image: "https://picsum.photos/300/250?2",
    description: "Intenso y aromático.",
  },
  {
    id: 3,
    name: "Café Descafeinado",
    price: 48,
    image: "https://picsum.photos/300/250?3",
    description: "Todo el sabor sin cafeína.",
  },
  {
    id: 4,
    name: "Café Orgánico",
    price: 55,
    image: "https://picsum.photos/300/250?4",
    description: "Cultivado de forma sostenible.",
  },
  {
    id: 4,
    name: "Café Orgánico",
    price: 55,
    image: "https://picsum.photos/300/250?5",
    description: "Cultivado de forma sostenible.",
  },
  {
    id: 4,
    name: "Café Orgánico",
    price: 55,
    image: "https://picsum.photos/300/250?6",
    description: "Cultivado de forma sostenible.",
  },
  {
    id: 4,
    name: "Café Orgánico",
    price: 55,
    image: "https://picsum.photos/300/250?7",
    description: "Cultivado de forma sostenible.",
  },
  {
    id: 4,
    name: "Café Orgánico",
    price: 55,
    image: "https://picsum.photos/300/250?8",
    description: "Cultivado de forma sostenible.",
  },
];

export default function HomePage() {
  return (
    <Box sx={{ bgcolor: "#faf7f4" }}>
      <Header />
      <Hero />
      <Products />
      <Benefits />
      <Footer />
    </Box>
  );
}

function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "#2b1305",
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
          }}
        >
          ☕ TIENDA CAFÉ
        </Typography>

        <Box sx={{ display: "flex", gap: 3 }}>
          <Button color="inherit">Inicio</Button>
          <Button color="inherit">Productos</Button>
          <Button color="inherit">Nosotros</Button>
          <Button color="inherit">Blog</Button>
          <Button color="inherit">Contacto</Button>
        </Box>

        <Box sx={{ ml: 4 }}>
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>

          <IconButton color="inherit">
            <PersonOutlineIcon />
          </IconButton>

          <IconButton color="inherit">
            <ShoppingCartOutlinedIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}


function Hero() {
  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Box
        sx={{
          position: "relative",
          height: { xs: 500, md: 420 },
          borderRadius: 4,
          overflow: "hidden",
          background: "#f4ece5",
        }}
      >
        {/* Imagen */}
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
          alt="Café"
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            width: { xs: "100%", md: "55%" },
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Gradiente */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: { xs: 0, md: "45%" },
            width: { xs: "100%", md: "25%" },
            height: "100%",
            background: {
              xs: "linear-gradient(to top, rgba(244,236,229,1), rgba(244,236,229,0.1))",
              md: "linear-gradient(to right, #f4ece5 0%, rgba(244,236,229,0.95) 30%, rgba(244,236,229,0) 100%)",
            },
            zIndex: 1,
          }}
        />

        {/* Texto */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            width: { xs: "100%", md: "45%" },
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: { xs: 3, md: 6 },
          }}
        >
          <Chip
            label="100% Café de origen"
            sx={{
              alignSelf: "flex-start",
              mb: 3,
            }}
          />

          <Typography
            sx={{
              fontSize: { xs: 36, md: 60 },
              lineHeight: 1.1,
              fontWeight: 700,
              color: "#3f220f",
              mb: 3,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            El café perfecto
            <br />
            para cada momento
          </Typography>

          <Typography
            sx={{
              color: "#6b5b4f",
              mb: 4,
              fontSize: 18,
            }}
          >
            Descubre nuestra selección de cafés de alta
            calidad, cuidadosamente elegidos para ti.
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#4e2b17",
                "&:hover": {
                  bgcolor: "#3f220f",
                },
              }}
            >
              Ver todos los productos
            </Button>

            <Button
              variant="outlined"
              sx={{
                color: "#4e2b17",
                borderColor: "#cdb8a5",
              }}
            >
              Conocer más sobre nosotros
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}

function Products() {
  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 1,
          color: "#3f220f",
        }}
      >
        Nuestros productos
      </Typography>

      <Typography color="text.secondary" mb={4}>
        Cafés seleccionados para verdaderos amantes del café.
      </Typography>

      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid #ece4dc",
              position: "sticky",
              top: 20,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#3f220f",
                mb: 3,
              }}
            >
              Filtros
            </Typography>

            {/* Categorias */}

            <Typography
              sx={{
                fontWeight: 600,
                mb: 2,
              }}
            >
              Categorías
            </Typography>

            <Stack spacing={1.5}>
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <span>Café en grano</span>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      (12)
                    </Typography>
                  </Box>
                }
              />

              <FormControlLabel
                control={<Checkbox />}
                label={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <span>Café molido</span>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      (8)
                    </Typography>
                  </Box>
                }
              />

              <FormControlLabel
                control={<Checkbox />}
                label={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <span>Cápsulas</span>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      (5)
                    </Typography>
                  </Box>
                }
              />

              <FormControlLabel
                control={<Checkbox />}
                label={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <span>Accesorios</span>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      (4)
                    </Typography>
                  </Box>
                }
              />
            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* Tipo Cafe */}


            {/* Rango Precio */}

            <Typography
              sx={{
                fontWeight: 600,
                mb: 2,
              }}
            >
              Rango de precio
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              <TextField
                size="small"
                placeholder="Min"
                fullWidth
              />

              <TextField
                size="small"
                placeholder="Max"
                fullWidth
              />
            </Box>

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                bgcolor: "#4e2b17",
                borderRadius: 2,
              }}
            >
              Aplicar filtros
            </Button>
          </Paper>
        </Grid>

        {/* Productos */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mb: 3,
            }}
          >
            <TextField
              fullWidth
              placeholder="Buscar productos..."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Grid container spacing={3}>
            {products.map((item) => (
              <Grid
                key={item.id}
                size={{ xs: 12, sm: 6, lg: 3 }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    boxShadow: "none",
                    border: "1px solid #ece4dc",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={item.image}
                  />

                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={700}
                    >
                      {item.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mt: 1,
                        minHeight: 48,
                      }}
                    >
                      {item.description}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        mt: 2,
                        color: "#4e2b17",
                        fontWeight: 700,
                      }}
                    >
                      Bs {item.price}
                    </Typography>

                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{
                        mt: "auto",
                        color: "#4e2b17",
                        borderColor: "#cdb8a5",

                        "&:hover": {
                          borderColor: "#4e2b17",
                          backgroundColor: "#f8f2ed",
                        },
                      }}
                    >
                      Ver detalle
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

function Benefits() {
  return (
    <Container maxWidth="xl" sx={{ mb: 5 }}>
      <Paper
        sx={{
          p: 4,
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: 3,
        }}
      >
        <Box>
          <Typography fontWeight={700}>
            Envíos a todo el país
          </Typography>
          <Typography variant="body2">
            Entrega rápida y segura.
          </Typography>
        </Box>

        <Box>
          <Typography fontWeight={700}>
            Productos naturales
          </Typography>
          <Typography variant="body2">
            Sin aditivos ni conservantes.
          </Typography>
        </Box>

        <Box>
          <Typography fontWeight={700}>
            Calidad garantizada
          </Typography>
          <Typography variant="body2">
            Seleccionamos los mejores granos.
          </Typography>
        </Box>

        <Box>
          <Typography fontWeight={700}>
            Atención personalizada
          </Typography>
          <Typography variant="body2">
            Estamos para ayudarte.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "#2b1305",
        color: "#fff",
        mt: 4,
        py: 6,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              ☕ TIENDA CAFÉ
            </Typography>

            <Typography
              sx={{
                color: "#d8cfc7",
                maxWidth: 280,
                mb: 3,
              }}
            >
              Pasión por el café, compromiso con la calidad.
              Llevamos lo mejor del café a tu hogar.
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 1.5,
              }}
            >
              <IconButton
                sx={{
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,.2)",
                }}
              >
                <FacebookIcon />
              </IconButton>

              <IconButton
                sx={{
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,.2)",
                }}
              >
                <InstagramIcon />
              </IconButton>

              <IconButton
                sx={{
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,.2)",
                }}
              >
                <WhatsAppIcon />
              </IconButton>

              <IconButton
                sx={{
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,.2)",
                }}
              >
                <MusicNoteIcon />
              </IconButton>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography fontWeight={700}>
              Navegación
            </Typography>

            <Typography>Inicio</Typography>
            <Typography>Productos</Typography>
            <Typography>Nosotros</Typography>
            <Typography>Contacto</Typography>
          </Grid>


          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              sx={{
                fontWeight: 700,
                mb: 3,
              }}
            >
              CONTACTO
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2,
              }}
            >
              <LocationOnOutlinedIcon fontSize="small" />
              <Typography variant="body2">
                Santa Cruz, Bolivia
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2,
              }}
            >
              <PhoneOutlinedIcon fontSize="small" />
              <Typography variant="body2">
                +591 712 34567
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2,
              }}
            >
              <EmailOutlinedIcon fontSize="small" />
              <Typography variant="body2">
                contacto@tiendacafe.com
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1,
              }}
            >
              <AccessTimeOutlinedIcon fontSize="small" />

              <Typography variant="body2">
                Lun - Vie: 08:00 - 18:00
                <br />
                Sáb: 08:00 - 13:00
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}