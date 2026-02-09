import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import MatxLoading from './../components/MatxLoading'
//import { MatxLoading } from 'app/components';
import {
  getStorage,
  removeStorage,
  setStorage
} from '../../core/helpers/localStorageHelpers';
import AplicationConnect from '../../core/api/AplicationConnect';
import menu from '../../../src/data/datos.json'
// import menu from '../../../src/data/menu.js'


const initialState = {
  user: null,
  isInitialised: false,
  isAuthenticated: false
};

const isValidToken = (accessToken: any) => {
  if (!accessToken) return false;

  //const decodedToken = jwtDecode(accessToken);
  //const currentTime = Date.now() / 1000;
  //return decodedToken.exp > currentTime;
};

const setSession = (accessToken: any) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'INIT': {
      const { isAuthenticated, user } = action.payload;
      return { ...state, isAuthenticated, isInitialised: true, user };
    }

    case 'LOGIN': {
      const { user } = action.payload;
      return { ...state, isAuthenticated: true, user };
    }

    case 'LOGOUT': {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return { ...state, isAuthenticated: false, user: null };
    }

    case 'REGISTER': {
      const { user } = action.payload;

      return { ...state, isAuthenticated: true, user };
    }

    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  method: 'JWT',
  login: () => { },
  logout: () => { },
  register: () => { },
  verifyCredentials: () => { }
});

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email: any, password: any) => {
 
    try {
      const respuesta = await AplicationConnect.post<any>('/auth/login', {
        "usuario": email,
        "contrasena": password
      })

      console.log("respuesta ", respuesta.data)
      // if (respuesta?.data?.status==true) {
      console.log('print menu ---> ', menu)
      
        const dataUser = {
          token: 'token12345',
          usuario: 'tonyMontana',

        }
        //const { token, usuario } = dataUser
        // const { token, usuario } = respuesta.data
        const usuario = {
          NOMBRE_COMPLETO: 'PEDRO SILVA',
          SEXO: 'M'
        }
        const user = {
          id: 10,
          role: 'SA',
          name: email,
          username: email,
          //email:email,
          email: usuario.NOMBRE_COMPLETO,
          avatar: (usuario.SEXO == "M" ? 'https://i.pinimg.com/736x/63/fe/b7/63feb78e24de8202c21eb36d990f0155.jpg' : 'https://i.pinimg.com/736x/63/fe/b7/63feb78e24de8202c21eb36d990f0155.jpg' ),
          age: 25
        }
        //const tokens = "tokens12345"
        setStorage('token', respuesta.data.datos.token, 7200)
        localStorage.setItem('user', JSON.stringify(user));
   
        //lamar a la api del mepnu 
        // const responseMenu = await AplicationConnect.get('/menu')
        // console.log("response a Menu ", responseMenu.data)

        // console.log("resposne data menu length ", responseMenu.data.length)
        //formatear api  de menu token 
        // if (responseMenu.data.length > 0) {

          const arrayNavigations = [...stableSort(convertToNestedMenu(menu, 0), getComparator("asc", "NUMERO_ORDEN"))]
        
        console.log("array Navigations ",arrayNavigations)
          //prearando la variable para guardar en el local storage
          localStorage.setItem('arrayNavigations', JSON.stringify(arrayNavigations));
          // console.log("array Guardado ",localStorage.getItem('arrayNavigations')

        // }
        dispatch({ type: 'LOGIN', payload: { user } });
        dispatch({ type: 'INIT', payload: { isAuthenticated: true, user: user } });
      // }

      return {
        status : true
      }
      // return respuesta.data

    } catch (error) {
      console.log("error ", error)
    }

  };


  //console.log("convet array ", stableSort(convertToNestedMenu(dataJson, 0), getComparator("asc", "NUMERO_ORDEN")))

  const convertToNestedMenu = (arr: any, parentId: number) => {
    return arr
      .filter((item: any) => item.NIVEL_SUPERIOR === parentId)
      .map((item: any) => {
        if (item.TIPO === 'acceso') return item;
        return {
          ...item,
          children: [...stableSort(convertToNestedMenu(arr, item.ITEM), getComparator("asc", "NUMERO_ORDEN"))],
        }
      });
  }


  function descendingComparator(a: any, b: any, orderBy: any) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }


  function getComparator(order: any, orderBy: any) {

    return order === 'desc'
      ? (a: any, b: any) => descendingComparator(a, b, orderBy)
      : (a: any, b: any) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array: any, comparator: any) {


    const stabilizedThis = array.map((el: any, index: any) => [el, index]);
    stabilizedThis.sort((a: any, b: any) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el: any) => el[0]);
  }


  /*
    const convertToNestedMenu = (arr: any, parentId: any) => {
      return arr
        .filter((item: any) => item.NIVEL_SUPERIOR === parentId)
        .map((item: any) => {
          if (item.TIPO === 'acceso') return item;
          return {
            ...item,
            children: [...convertToNestedMenu(arr, item.ITEM)],
          }
        });
    }*/

  const register = async (email: any, username: any, password: any) => {
    const response = await axios.post('/api/auth/register', { email, username, password });
    const { user } = response.data;

    dispatch({ type: 'REGISTER', payload: { user } });

  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };


  /*NO LOGIN POR DEFAULT*/
  /*useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/api/auth/profile');
        dispatch({ type: 'INIT', payload: { isAuthenticated: true, user: data.user } });

      } catch (err) {
        console.error(err);
        dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: null } });
      }
    })();
  }, [])*/

  //recuperando datos guardatos
  useEffect(() => {
    console.log("hola 11")
    verifyCredentials()

  }, [])

  const verifyCredentials = () => {


    // const { data } = await axios.get('/api/auth/profile');
    if (localStorage.getItem('token') && localStorage.getItem('user')) {
      const requestUser = JSON.parse(localStorage.getItem('user')!);
      console.log("request user ", requestUser)


      dispatch({ type: 'INIT', payload: { isAuthenticated: true, user: requestUser } });
      /* const requestToken = JSON.parse(localStorage.getItem('token')!);
       const requestUser = JSON.parse(localStorage.getItem('user')!);
       console.log("request user ", requestUser, requestToken)
       if (!requestToken || !requestUser)
         return;
 
 
       dispatch({ type: 'INIT', payload: { isAuthenticated: true, user: requestUser } });
 
 */
    }



  }

  // SHOW LOADER
  //if (!state.isInitialised) return <MatxLoading />;

  return (
    <AuthContext.Provider value={{ ...state, method: 'JWT', login, logout, register, verifyCredentials }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
