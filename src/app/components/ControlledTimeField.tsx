import { Controller } from "react-hook-form";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import "dayjs/locale/es";

const ControlledTimeField = ({ label, control, isRequired = false, nameRegister }: any) => {
    return (
        <Controller
            name={nameRegister}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                <TimePicker
                    label={label}
                    value={value || dayjs()}
                    onChange={onChange}
                    ampm={false}  // ← si no quieres AM/PM
                    format="HH:mm"
                    slotProps={{
                        textField: {
                            size: 'small',
                            fullWidth: true,
                            error: !!error,
                            helperText: error ? error.message : ''
                        }
                    }}
                /> </LocalizationProvider>
            )}
            rules={{
                required: {
                    value: isRequired,
                    message: 'Completa este campo',
                }
            }}
        />
    );
};

export default ControlledTimeField;
