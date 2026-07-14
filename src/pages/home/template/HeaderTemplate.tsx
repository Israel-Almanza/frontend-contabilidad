
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
    Link,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate } from "react-router-dom";
import { useEmpresa } from "./EmpresaContext";

export default function HeaderTemplate() {
    const navigate = useNavigate();
    const { infoEmpresa } = useEmpresa();

    return (
        <AppBar
            position="static"
            sx={{
                bgcolor: "#2b1305",
            }}
        >
            <Toolbar sx={{ py: 1 }}>
                <Box
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        cursor: 'pointer'
                    }}
                    onClick={() => navigate('/home')}
                >

                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                        }}
                    >
                        ☕ {infoEmpresa.nombre}
                    </Typography>

                </Box>

                <Box sx={{ display: "flex", gap: 3 }}>
                    <Button color="inherit" onClick={() => navigate('/home')}>Inicio</Button>
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
