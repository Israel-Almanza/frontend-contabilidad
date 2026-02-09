import { TextField } from '@mui/material'
import { Controller } from "react-hook-form";

const InputTextFieldCustomNormal = ({ label, control, isRequired = false, nameRegister, readOnly = false }: any) => {
        return (
            <Controller
                name={nameRegister}
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                        sx={{width:"100%"}}
                        label={label}
                        variant="outlined"
                        fullWidth
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        size="small"
                        InputProps={{ readOnly }}
                    />
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

export default InputTextFieldCustomNormal;
