// src/components/MyCalendar.tsx
import {
  Calendar,
  dateFnsLocalizer,
  Event as CalendarEvent,
} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Box, Button, Dialog, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { es } from 'date-fns/locale'

// Configuración local
const locales = { es }
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
})

// Tipado del evento
interface MyEvent extends CalendarEvent {
  title: string
  start: Date
  end: Date
  tipo?: 'cita' | 'clinico'
}

// Eventos quemados
const initialEvents: MyEvent[] = [
  {
    title: 'Cita médica - Paciente Ana',
    start: new Date(),
    end: new Date(new Date().getTime() + 60 * 60 * 1000),
    tipo: 'cita',
  },
  {
    title: 'Control clínico - Paciente Luis',
    start: new Date(new Date().setDate(new Date().getDate() + 1)),
    end: new Date(new Date().setDate(new Date().getDate() + 1)),
    tipo: 'clinico',
  },
]

export default function MyCalendar() {
  const [events, setEvents] = useState<MyEvent[]>(initialEvents)
  const [open, setOpen] = useState(false)
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = (data: any) => {
    const newEvent: MyEvent = {
      title: data.title,
      start: new Date(data.start),
      end: new Date(data.end),
      tipo: data.tipo,
    }
    setEvents([...events, newEvent])
    reset()
    setOpen(false)
  }

  // Estilo personalizado por tipo
  const eventStyleGetter = (event: MyEvent) => {
    let backgroundColor = '#3174ad' // default
    if (event.tipo === 'cita') backgroundColor = '#f44336'
    if (event.tipo === 'clinico') backgroundColor = '#4caf50'

    return {
      style: {
        backgroundColor,
        color: 'white',
        borderRadius: '5px',
        border: 'none',
        padding: '2px 5px',
      },
    }
  }

  return (
    <Box p={2} width="100%">
      <Box mb={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" onClick={() => setOpen(true)}>
          Agregar Evento
        </Button>
      </Box>

      <Box height="80vh" width="100%">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%', width: '100%' }}
          eventPropGetter={eventStyleGetter}
        />
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Nuevo Evento</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Título"
              margin="normal"
              {...register('title', { required: true })}
            />
            <TextField
              fullWidth
              type="datetime-local"
              label="Inicio"
              margin="normal"
              InputLabelProps={{ shrink: true }}
              {...register('start', { required: true })}
            />
            <TextField
              fullWidth
              type="datetime-local"
              label="Fin"
              margin="normal"
              InputLabelProps={{ shrink: true }}
              {...register('end', { required: true })}
            />
            <TextField
              select
              fullWidth
              label="Tipo"
              margin="normal"
              defaultValue="cita"
              {...register('tipo', { required: true })}
            >
              <MenuItem value="cita">Cita</MenuItem>
              <MenuItem value="clinico">Clínico</MenuItem>
            </TextField>

            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button onClick={() => setOpen(false)} style={{ marginRight: 8 }}>
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Guardar
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  )
}
