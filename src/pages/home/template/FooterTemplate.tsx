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
  Link,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MusicNoteIcon from "@mui/icons-material/MusicNote"; // TikTok aproximado

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
export default function FooterTemplete() {
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

          <Grid size={{ xs: 6, md: 2 }}>

            <Typography
              variant="h6"
              fontWeight={700}
              mb={3}
            >
              Menú
            </Typography>

            <Stack spacing={2}>

              <Link color="inherit" underline="hover">
                Inicio
              </Link>

              <Link color="inherit" underline="hover">
                Productos
              </Link>

              <Link color="inherit" underline="hover">
                Nosotros
              </Link>

              <Link color="inherit" underline="hover">
                Blog
              </Link>

              <Link color="inherit" underline="hover">
                Contacto
              </Link>

            </Stack>

          </Grid>


          {/* CATEGORIAS */}

          <Grid size={{ xs: 6, md: 2 }}>
            <Typography
              variant="h6"
              fontWeight={700}
              mb={3}
            >
              Categorías
            </Typography>

            <Stack spacing={2}>

              <Link color="inherit" underline="hover">
                Café Molido
              </Link>

              <Link color="inherit" underline="hover">
                Café en Grano
              </Link>

              <Link color="inherit" underline="hover">
                Accesorios
              </Link>

              <Link color="inherit" underline="hover">
                Tazas
              </Link>

              <Link color="inherit" underline="hover">
                Promociones
              </Link>

            </Stack>

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