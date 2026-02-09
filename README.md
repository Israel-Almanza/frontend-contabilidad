# tools
-node version 20.19.2
# install project
npm install  ||  npm install --force
# run project
 npm run dev
# generate buil
npm run build
# configuracion para apache (Xamp)
# Paso 1
colocar el nombre el subdirectorio en el archivo vite.config.ts para que funcione de manera local y comentarlo cuando este en la nube
ejemplo base: /"nombre del subdirectorio"
base:'/SistemaGeneralF' 
(archivo ubicado en la raiz del proyecto)

# Paso 2 
colocar el nombre del subdictorio para para la configuracion de las rutas 
ejemplo basename="/sistema"  archivo src/main.tsx
# Paso 3
Para el acceso a las rutas  se puso el ARCHIVO .htaccess en la carpeta public (ya no se necesario realizar este paso)
# Paso 4 
Ejecutar el comando : npm run buld , cuando termine de ejecutarse el comando
se creara un archivo , dist y cual tendra que renombrarlo con el nombre del subdirectorio puesto en paso 1 y 2 , con estos pasos esta listo para colocar la carpeta en el servidor 

Nota: el nombre del subdiractorio en xamp deber el el mismo , que se puso 
en el paso 1 y 2  

# pasos para subir al servidor Azure
# paso1
quitar de la carpeta vite.config.ts(ubcacion raiz del proyecto) la linea de codigo " base:'/SistemaGeneralF'"
# paso2
quitar la linea de codigo de la carpeta main.tsx(ubicacion src/main.tsx) basename="/SistemaGeneralF"