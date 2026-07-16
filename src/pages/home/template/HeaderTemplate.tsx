import { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
    IconButton,
    Avatar,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import InfoIcon from "@mui/icons-material/Info";
import ArticleIcon from "@mui/icons-material/Article";
import ContactMailIcon from "@mui/icons-material/ContactMail";

import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import { useNavigate } from "react-router-dom";
import { useEmpresa } from "./EmpresaContext";
import { BASE_URL } from "../../../app/constans/contantes";

export default function HeaderTemplate() {
    const navigate = useNavigate();
    const { infoEmpresa } = useEmpresa();

    const [openMenu, setOpenMenu] = useState(false);

    const menuItems = [
        {
            text: "Inicio",
            icon: <HomeIcon />,
            action: () => navigate("/home"),
        },
        {
            text: "Productos",
            icon: <StoreIcon />,
            action: () => { },
        },
        {
            text: "Nosotros",
            icon: <InfoIcon />,
            action: () => { },
        },
        {
            text: "Blog",
            icon: <ArticleIcon />,
            action: () => { },
        },
        {
            text: "Contacto",
            icon: <ContactMailIcon />,
            action: () => { },
        },
    ];

    return (
        <>
            <AppBar
                position="static"
                sx={{
                    bgcolor: "#2b1305",
                    boxShadow: 3,
                }}
            >
                <Toolbar>

                    {/* Logo */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            cursor: "pointer",
                        }}
                        onClick={() => navigate("/home")}
                    >
                        <Avatar
                            src={`${BASE_URL}${infoEmpresa.logo}`}
                            alt="Configura tu logo"
                            variant="rounded"
                            sx={{
                                width: 48,
                                height: 48,
                            }}
                        />

                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: "bold",
                                display: {

                                    sm: "block",
                                },
                            }}
                        >
                            {infoEmpresa.nombre}
                        </Typography>
                    </Box>

                    {/* Menú escritorio */}
                    <Box
                        sx={{
                            display: {
                                xs: "none",
                                md: "flex",
                            },
                            gap: 1,
                        }}
                    >
                        {menuItems.map((item) => (
                            <Button
                                key={item.text}
                                color="inherit"
                                onClick={item.action}
                                sx={{
                                    textTransform: "none",
                                    fontWeight: 500,
                                }}
                            >
                                {item.text}
                            </Button>
                        ))}
                    </Box>

                    {/* Iconos escritorio */}
                    <Box
                        sx={{
                            ml: 2,
                            display: {
                                xs: "none",
                                md: "flex",
                            },
                        }}
                    >
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

                    {/* Botón menú móvil */}
                    <Box
                        sx={{
                            display: {
                                xs: "flex",
                                md: "none",
                            },
                        }}
                    >
                        <IconButton
                            color="inherit"
                            onClick={() => setOpenMenu(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Drawer móvil */}
            <Drawer
                anchor="left"
                open={openMenu}
                onClose={() => setOpenMenu(false)}
            >
                <Box
                    sx={{
                        width: 280,
                        height: "100%",
                        bgcolor: "#2b1305",
                        color: "white",
                    }}
                >
                    {/* Cabecera */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            p: 3,
                        }}
                    >
                        {infoEmpresa.logo ? (
                            <Avatar
                                src={`${BASE_URL}${infoEmpresa.logo}`}
                                alt={infoEmpresa.nombre}
                                variant="rounded"
                                sx={{
                                    width: 50,
                                    height: 50,
                                }}
                            />
                        ) : (
                            <Typography fontSize={32}>☕</Typography>
                        )}

                        <Typography
                            variant="h6"
                            fontWeight="bold"
                        >
                            {infoEmpresa.nombre}
                        </Typography>
                    </Box>

                    <Divider sx={{ bgcolor: "rgba(255,255,255,.2)" }} />

                    {/* Opciones */}
                    <List sx={{ mt: 1 }}>
                        {menuItems.map((item) => (
                            <ListItemButton
                                key={item.text}
                                onClick={() => {
                                    setOpenMenu(false);
                                    item.action();
                                }}
                                sx={{
                                    py: 1.5,
                                    "&:hover": {
                                        bgcolor: "rgba(255,255,255,.08)",
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: "white",
                                        minWidth: 42,
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>

                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        ))}
                    </List>

                    <Divider sx={{ bgcolor: "rgba(255,255,255,.2)" }} />

                    {/* Iconos inferiores */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            py: 2,
                        }}
                    >
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
                </Box>
            </Drawer>
        </>
    );
}