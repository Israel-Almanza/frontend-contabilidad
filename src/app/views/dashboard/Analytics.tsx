// Dashboard.jsx

import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  LinearProgress,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const flujoCajaData = [
  { mes: "Jun 25", afluencia: 0, salida: 0 },
  { mes: "Jul 25", afluencia: 0, salida: 0 },
  { mes: "Aug 25", afluencia: 0, salida: 0 },
  { mes: "Sep 25", afluencia: 0, salida: 0 },
  { mes: "Oct 25", afluencia: 0, salida: 0 },
  { mes: "Nov 25", afluencia: 0, salida: 0 },
  { mes: "Dec 25", afluencia: 0, salida: 0 },
  { mes: "Jan 26", afluencia: 0, salida: 0 },
  { mes: "Feb 26", afluencia: 0, salida: 345 },
  { mes: "Mar 26", afluencia: 0, salida: 0 },
  { mes: "Apr 26", afluencia: 0, salida: 0 },
  { mes: "May 26", afluencia: 0, salida: 0 },
];

const gananciasData = [
  { name: "Ganancias", value: -87 },
];

const Dashboard = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f7f7f7",
        minHeight: "100vh",
        p: 3,
      }}
    >
      {/* Flujo de caja */}
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          mb: 3,
        }}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography fontWeight={600}>
              Flujo de caja
            </Typography>

            <FormControl size="small">
              <Select value="year">
                <MenuItem value="year">Este año</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={flujoCajaData}>
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="afluencia"
                stroke="#2196f3"
                fill="#2196f3"
                fillOpacity={0.15}
                strokeWidth={3}
              />

              <Area
                type="monotone"
                dataKey="salida"
                stroke="#e5a4c0"
                fill="#e5a4c0"
                fillOpacity={0.35}
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Cards inferiores */}
      <Grid container spacing={3}>
        {/* Factura venta */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              borderRadius: 3,
              height: "100%",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
              >
                <Typography fontWeight={600}>
                  Factura de venta
                </Typography>

                <FormControl size="small">
                  <Select value="year">
                    <MenuItem value="year">Este año</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box mb={2}>
                <LinearProgress
                  variant="determinate"
                  value={15}
                  sx={{
                    height: 18,
                    borderRadius: 20,
                    backgroundColor: "#ececec",
                  }}
                />
              </Box>

              <LinearProgress
                variant="determinate"
                value={5}
                sx={{
                  height: 18,
                  borderRadius: 20,
                  backgroundColor: "#ececec",
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Factura compra */}
        <Grid size={{ xs: 12, md: 6 }} >
          <Card
            sx={{
              borderRadius: 3,
              height: "100%",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
              >
                <Typography fontWeight={600}>
                  Factura de Compra
                </Typography>

                <FormControl size="small">
                  <Select value="year">
                    <MenuItem value="year">Este año</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box
                display="flex"
                justifyContent="space-between"
                mb={1}
              >
                <Typography>
                  345,00 Pagado
                </Typography>

                <Typography>
                  0,00 No pagado
                </Typography>
              </Box>

              <LinearProgress
                variant="determinate"
                value={100}
                sx={{
                  height: 18,
                  borderRadius: 20,
                  backgroundColor: "#ececec",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#e5a4c0",
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Ganancias y pérdidas */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography fontWeight={600}>
                  Ganancias y Pérdidas
                </Typography>

                <FormControl size="small">
                  <Select value="year">
                    <MenuItem value="year">Este año</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={gananciasData}>
                  <XAxis dataKey="name" hide />
                  <YAxis />
                  <Tooltip />

                  <Bar
                    dataKey="value"
                    fill="#e5a4c0"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Gastos principales */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              borderRadius: 3,
              minHeight: 320,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight={600}>
                  Gastos principales
                </Typography>

                <FormControl size="small">
                  <Select value="year">
                    <MenuItem value="year">Este año</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height={240}
              >
                <Typography
                  variant="h4"
                  fontWeight={700}
                  color="#1b2a4e"
                >
                  345,00
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;