import {
    Typography,
    Box,
    Grid,
    Button,
    Card,
    CardMedia,
    CardContent,
    CardActions,
} from "@mui/material";

import {
    ArrowForwardIos,
} from "@mui/icons-material";
import { buildImageUrl } from "../../../../app/utils/manejoUrl";
import { useNavigate } from "react-router-dom";
const CardProducto = ({ producto }: any) => {
    const navigate = useNavigate();
    const handleVerDetalle = (productoId: number) => {
        navigate(`/ver-producto/${productoId}`);
    };
    return (
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
                        image={buildImageUrl(producto.imagen)}
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
                        sx={{
                            mt: 1,
                            minHeight: 48,
                        }}
                    >
                        {producto.descripcion}
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
                        onClick={() => handleVerDetalle(producto.id)}
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
    )
}
export default CardProducto