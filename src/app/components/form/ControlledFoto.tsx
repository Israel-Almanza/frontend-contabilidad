import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  FormHelperText,
  IconButton,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Controller } from 'react-hook-form';

type ControlledFotoProps = {
  name: string;
  control: any;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  defaultImage?: string;
  width?: number | string;
  height?: number | string;
};

const ControlledFoto = ({
  name,
  control,
  label = 'Imagen',
  required = false,
  disabled = false,
  defaultImage = '',
  width = 180,
  height = 180,
}: ControlledFotoProps) => {
  const [localPreview, setLocalPreview] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (localPreview.startsWith('blob:')) {
        URL.revokeObjectURL(localPreview);
      }
    };
  }, [localPreview]);

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: {
          value: required,
          message: 'Completa este campo',
        },
      }}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const previewUrl =
          localPreview ||
          (typeof value === 'string' && value.length > 0
            ? value
            : defaultImage || '');

        const handleChange = (
          event: React.ChangeEvent<HTMLInputElement>
        ) => {
          const file = event.target.files?.[0] || null;

          if (localPreview.startsWith('blob:')) {
            URL.revokeObjectURL(localPreview);
          }

          if (file) {
            const blobUrl = URL.createObjectURL(file);
            setLocalPreview(blobUrl);
          } else {
            setLocalPreview('');
          }

          onChange(file);
        };

        return (
          <Box>
            <Typography
              variant="body2"
              sx={{ mb: 1, fontWeight: 500 }}
            >
              {label}
            </Typography>

            <Box
              onClick={() => {
                if (!disabled) {
                  inputRef.current?.click();
                }
              }}
              sx={{
                width,
                height,

                border: '2px dashed #D0D5DD',
                borderRadius: 3,
                overflow: 'hidden',
                position: 'relative',
                cursor: disabled ? 'not-allowed' : 'pointer',
                bgcolor: '#F9FAFB',
                transition: '0.2s',
                '&:hover': {
                  borderColor: '#1976d2',
                  bgcolor: '#F1F5FF',
                },
              }}
            >
              {previewUrl ? (
                <>
                  <img
                    src={previewUrl}
                    alt={label}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />

                  {!disabled && (
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        bgcolor: 'rgba(0,0,0,0.25)',
                        opacity: 0,
                        transition: '0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover': {
                          opacity: 1,
                        },
                      }}
                    >
                      <IconButton
                        sx={{
                          bgcolor: 'white',
                          '&:hover': {
                            bgcolor: '#f5f5f5',
                          },
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Box>
                  )}
                </>
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    color: '#667085',
                  }}
                >
                  <AddIcon sx={{ fontSize: 40 }} />

                  <Typography variant="caption">
                    Subir imagen
                  </Typography>
                </Box>
              )}
            </Box>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleChange}
              disabled={disabled}
            />

            {error ? (
              <FormHelperText error>
                {error.message}
              </FormHelperText>
            ) : null}
          </Box>
        );
      }}
    />
  );
};

export default ControlledFoto;