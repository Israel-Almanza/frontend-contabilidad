import { TextField, InputAdornment } from '@mui/material';
import { Controller } from "react-hook-form";

const ControlledTextField = ({
  label,
  control,
  isRequired = false,
  nameRegister,
  readOnly = false,
  startIcon,
  endIcon,
  type = "text", // <-- aquí agregamos el type
  ...rest
}: any) => {
  return (
    <Controller
      name={nameRegister}
      control={control}
      rules={{
        required: {
          value: isRequired,
          message: "Completa este campo",
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          label={label}
          fullWidth
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error ? error.message : null}
          size="small"
          type={type} // <-- aplicamos el type
          InputProps={{
            readOnly,
            startAdornment: startIcon ? (
              <InputAdornment position="start">{startIcon}</InputAdornment>
            ) : undefined,
            endAdornment: endIcon ? (
              <InputAdornment position="end">{endIcon}</InputAdornment>
            ) : undefined,
          }}
          {...rest}
        />
      )}
    />
  );
};

export default ControlledTextField;