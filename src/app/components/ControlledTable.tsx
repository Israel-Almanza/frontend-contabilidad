import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";
import {
  useFieldArray,
  useFormContext,
  useWatch,
  type FieldArrayPath,
  type FieldValues,
} from "react-hook-form";
import ControlledSelectField from "./ControlledSelectField";
import ControlledTextField from "./ControlledTextField";

export type ControlledTableColumn = {
  field: string;
  label: string;
  type: "text" | "number" | "select";
  options?: unknown[];
  width?: number;
  valueField?: string;
  labelField?: string;
};

type RowValues = Record<string, string | number>;

function defaultRow(columns: ControlledTableColumn[]): RowValues {
  const row: RowValues = {};
  for (const col of columns) {
    row[col.field] = col.type === "number" ? 0 : "";
  }
  return row;
}

type ControlledTableProps = {
  name: string;
  columns: ControlledTableColumn[];
};

const roundMoney = (n: number) => Math.round(n * 100) / 100;

function ControlledTable({ name, columns }: ControlledTableProps) {
  const { control, setValue, getValues } = useFormContext();

  const { fields, append } = useFieldArray({
    control,
    name: name as FieldArrayPath<FieldValues>,
  });

  const watchedRows = useWatch({ control, name }) as RowValues[] | undefined;

  const hasImporte = columns.some((c) => c.field === "importe");

  useEffect(() => {
    if (!hasImporte || !Array.isArray(watchedRows)) return;
    watchedRows.forEach((row, index) => {
      const qty = Number(row?.qty ?? 0);
      const tarifa = Number(row?.tarifa ?? 0);
      const importe = roundMoney(qty * tarifa);
      const path = `${name}.${index}.importe` as const;
      const current = Number(getValues(path));
      if (current !== importe) {
        setValue(path, importe, {
          shouldValidate: false,
          shouldDirty: false,
        });
      }
    });
  }, [watchedRows, hasImporte, name, setValue, getValues]);

  const totalNeto = useMemo(() => {
    if (!Array.isArray(watchedRows)) return 0;
    return watchedRows.reduce(
      (sum, row) => sum + (Number(row?.importe) || 0),
      0
    );
  }, [watchedRows]);

  const headerSpan =
    columns.length > 0 ? Math.max(1, Math.floor(11 / columns.length)) : 2;

  return (
    <Box>
      <Grid
        container
        spacing={1}
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          pb: 1,
          mb: 1,
          alignItems: "center",
        }}
      >
        <Grid size={{ xs: 12, sm: "auto" }} sx={{ minWidth: 32 }}>
          <Typography variant="caption" fontWeight={600} color="text.secondary">
            #
          </Typography>
        </Grid>
        {columns.map((col) => (
          <Grid
            key={col.field}
            size={{ xs: 12, sm: col.width ?? headerSpan }}
            sx={{ minWidth: 0 }}
          >
            <Typography variant="caption" fontWeight={600} color="text.secondary">
              {col.label}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {fields.map((item, index) => (
        <Grid
          key={item.id}
          container
          spacing={1}
          alignItems="center"
          sx={{
            py: 0.75,
            borderBottom: 1,
            borderColor: "divider",
            "&:last-of-type": { borderBottom: 0 },
          }}
        >
          <Grid size={{ xs: 12, sm: "auto" }} sx={{ minWidth: 32 }}>
            <Typography variant="body2" color="text.secondary">
              {index + 1}
            </Typography>
          </Grid>
          {columns.map((col) => {
            const fieldPath = `${name}.${index}.${col.field}`;
            const isImporte = col.field === "importe";

            if (col.type === "select") {
              return (
                <Grid
                  key={col.field}
                  size={{ xs: 12, sm: col.width ?? headerSpan }}
                  sx={{ minWidth: 0 }}
                >
                  <ControlledSelectField
                    label={col.label}
                    nameRegister={fieldPath}
                    control={control}
                    options={(col.options ?? []) as never[]}
                    valueField={col.valueField ?? "value"}
                    labelField={col.labelField ?? "label"}
                  />
                </Grid>
              );
            }

            return (
              <Grid
                key={col.field}
                size={{ xs: 12, sm: col.width ?? headerSpan }}
                sx={{ minWidth: 0 }}
              >
                <ControlledTextField
                  label={col.label}
                  nameRegister={fieldPath}
                  control={control}
                  type={col.type === "number" ? "number" : "text"}
                  readOnly={isImporte}
                />
              </Grid>
            );
          })}
        </Grid>
      ))}

      <Box sx={{ mt: 1.5 }}>
        <Button
          type="button"
          size="small"
          variant="text"
          startIcon={<AddIcon sx={{ fontSize: 18 }} />}
          onClick={() => append(defaultRow(columns))}
          sx={{ textTransform: "none", px: 0.5, minWidth: 0 }}
        >
          Añadir fila
        </Button>
      </Box>

      <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: "divider" }}>
        <Typography variant="caption" color="text.secondary">
          Total neto
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {roundMoney(totalNeto).toLocaleString("es-ES", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Typography>
      </Box>
    </Box>
  );
}

export default ControlledTable;
