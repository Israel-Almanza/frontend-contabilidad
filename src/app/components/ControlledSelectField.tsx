import { TextField, MenuItem } from '@mui/material';
import { Controller } from "react-hook-form";
const ControlledSelectField = ({
  label,
  control,
  nameRegister,
  isRequired = false,
  options,
  defaultOptions = [
    { ID: "1", TEXT: "HABILITADO" },
    { ID: "0", TEXT: "INABILITADO" },
  ],
  valueField = "ID",   // <-- campo que se usará como value
  labelField = "TEXT", // <-- campo que se usará como texto
  readOnly = false,
  ...rest
}: any) => {
  const selectOptions = options || defaultOptions;

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
          select
          label={label}
          fullWidth
          size="small"
          variant="outlined"
          value={value || ""}
          onChange={onChange}
          error={!!error}
          helperText={error ? error.message : null}
          InputProps={{ readOnly }}
          {...rest}
        >
          {selectOptions.map((option: any) => (
            <MenuItem key={option[valueField]} value={option[valueField]}>
              {option[labelField]}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};
export default ControlledSelectField;