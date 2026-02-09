import { TextField } from '@mui/material'
import { Controller } from "react-hook-form";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import "dayjs/locale/es";

const ControlledDateField = ({ label, control, isRequired = false, nameRegister }: any) => {
    return (
            <Controller
                name={nameRegister}
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                        <DesktopDatePicker sx={{ width: '100%' }}
                            defaultValue={dayjs() as unknown as Date}
                            //defaultValue='DD/MM/YYYY'
                            format='DD/MM/YYYY'
                            //minDate={dayjs()}
                            //  minDate={dayjs(getRestarDateCurrent())}
                            // maxDate={dayjs()}
                            value={value}
                            onChange={onChange}
                            slotProps={{ textField: { size: 'small', fullWidth: false } }}
                        //inputProps={register(name)}

                        />
                    </LocalizationProvider>
                )}
                rules={{
                    required: {
                        value: isRequired,
                        message: 'Completa este campo'
                    }
                }}
            />

    );
};

export default ControlledDateField;