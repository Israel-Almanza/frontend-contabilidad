import React from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import FormPaciente from './components/FormPaciente'

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function StyledTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_e, newValue) => setValue(newValue);

  return (
    <Box sx={{ width: "100%" }}>
      {/* TABS */}
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ style: { display: "none" } }} // Oculta línea inferior
      >
        {["Buscar Paciente", "Registrar Pacientes", "Registro de Miembros"].map((label, i) => (
          <Tab
            key={label}
            label={label}
            sx={{
              textTransform: "none",
              px: 3,
              py: 0.8,
              borderRadius: "8px",
              mx: 1,

              // Estado normal
              bgcolor: value === i ? "primary.main" : "transparent",
              color: value === i ? "white" : "primary.main",

              fontWeight: value === i ? "bold" : "normal",

              // Hover
              "&:hover": {
                bgcolor: value === i ? "primary.dark" : "rgba(25,118,210,0.08)",
                color: value === i ? "white" : "primary.main",
              },

              // ☑️ Fuerza color blanco mientras esté seleccionado SIEMPRE
              "&.Mui-selected": {
                color: "white !important",
              },
            }}
          />
        ))}
      </Tabs>

      {/* CONTENIDO */}
      <TabPanel value={value} index={0}>
        Contenido de **X**
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FormPaciente/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Contenido de **Z**
      </TabPanel>
    </Box>
  );
}
