<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. clonar el repositorio
2. ejecutar
 
Nota: si estas en un entorno restringido puedes intentar usar
```
(npx al inicio de npm)
npx npm install
```
```
npm install
```

3. Tener nest cli instalado

```
npm i -g @nestjs/cli
```
4. levantar la base de datos
```
docker-compose up -d
```
5. Cargar o recargar semilla desde pokeApi
```
(get) http://localhost:3000/api/v2/seed/ 
```
6. Si existiera un error al tratar de acceder a la api de pokemon usar la carga del archivo json
dentro del proyecto pokeList.json usando el siguiente endPoint desde postman. En body y en value poner el nombre de "file" en el desplegeable seleccior type file 
```
(Post) http://localhost:3000/api/v2/seed/upload
```

7. Clonar el archivo __.env.template__ y renonbrar la copia __.env__

8. Llenas las variables de entorno definidas en el __.env__

9. Ejecutar la aplicación en desarrollo 
```
npm run start:dev
```


## Stack usado

* MongoDB
* Nest
