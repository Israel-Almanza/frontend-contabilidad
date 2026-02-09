// import React from "react";
// //import Chip from "@material-ui/core/Chip";
// import { Chip } from "@mui/material";
// //import Autocomplete from "@material-ui/lab/Autocomplete";
// import Autocomplete from '@mui/material/Autocomplete';
// //import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// import { createStyles } from "@mui/material/styles";
// import { makeStyles } from "@mui/material";
// import { Theme } from "@mui/material";
// //import TextField from "@material-ui/core/TextField";
// import TextField from '@mui/material/TextField';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       width: 500,
//       "& > * + *": {
//         marginTop: theme.spacing(3),
//       },
//     },
//   })
// );

// interface User {
//   id: number;
//   name: string;
// }

// const userList: User[] = [
//   { id: 1, name: "name 1" },
//   { id: 2, name: "name 2" },
//   { id: 3, name: "name 3" },
//   { id: 4, name: "name 4" },
//   { id: 5, name: "name 5" },
// ];

// export default function AutocompleteControlled() {
//   const classes = useStyles();

//   const [value, setValue] = React.useState<any>([userList[0].name]);

//   console.log("value: ", value);

//   return (
//     <div className={classes.root}>
//       <Autocomplete
//         value={value}
//         onChange={(event, newValue) => {
//           setValue(newValue);
//         }}
//         multiple
//         id="tags-filled"
//         options={userList.map((option) => option.name)}
//         freeSolo
//         renderTags={(value: string[], getTagProps) =>
//           value.map((option: string, index: number) => (
//             <Chip
//               variant="outlined"
//               label={option}
//               {...getTagProps({ index })}
//             />
//           ))
//         }
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             variant="filled"
//             label="Users"
//             placeholder="Search"
//           />
//         )}
//       />
//     </div>
//   );
// }

import { Autocomplete, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useProducto } from "./services/useProducto";
 
export const PetLists = () => {

    const {loadApiTamañoProducto} = useProducto()

    useEffect(() => {
        // Actualiza el título del documento usando la API del navegador
        loadObtenerTamañoProducto()
    }, []);

    const [tamaño, setTamaño] = useState<any>([])
  
  const pets = ["Cat", "Dog", "Bird", "Pigeon"];
  const [selectedPets, setSelectedPets] = useState([]);
  const [petInputValue, setPetInputValue] = useState("");
 
  console.log(selectedPets);

  const loadObtenerTamañoProducto = async () => {


    try {
        //setLoading(true)
        const response = await loadApiTamañoProducto()
        //setLoading(false)
        console.log("lista tamaño producto ", response)

        if (response?.status && response?.tamProductos) {
            setTamaño(response.tamProductos)
            //setoriginalRows(response.usuarios)
        }

    } catch (error) {

    }

}
 
  return (
    <React.Fragment>
      {/* <h5 style={{ marginBottom: "1rem", textAlign: "left" }}>
        You selected:{" "}
        <span style={{ color: "dodgerblue", fontWeight: "800" }}>
          {selectedPets
            .map((pet, i, arr) =>
              arr.length > 1 && arr.length - 1 === i ? ` and ${pet}.` : pet
            )
            .join(", ") || "Nothing yet"}
        </span>
      </h5> */}
      <Autocomplete
        multiple
        style={{ width: "100%" }}
        options={tamaño}
        onChange={(event, newPet) => {
          setSelectedPets(newPet);
        }}
        inputValue={petInputValue}
        onInputChange={(event, newPetInputValue) => {
          setPetInputValue(newPetInputValue);
        }}
        renderInput={(params) => {
          return <TextField label='Seleccione Tamaño' {...params} size="small" />;
        }}
        getOptionLabel={(option: any) => option.TAMAÑO}
      ></Autocomplete>
    </React.Fragment>
  );
};