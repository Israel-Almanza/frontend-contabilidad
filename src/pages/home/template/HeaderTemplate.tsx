
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

export default function HeaderTemplate() {
    const navigate = useNavigate();

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
                        cursor: 'pointer'
                    }}
                    onClick={() => navigate('/home')}
                >
                    ☕ TIENDA CAFÉ
                </Typography>

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
