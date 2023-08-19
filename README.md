<h1 align="center">
  Riwi - Prueba ténica <br/>
</h1>

## Tecnologías

- **Base de datos:** MySQL
- **ORM:** Prisma
- **Framework:** NodeJs

## Empezar

Para subir el servidor es necesario que instalé en su PC, las tecnologías mencionadas arriba, luego de eso toca seguir los siguientes pasos:

###### 1. Instalar las dependencias:

```sh
  npm install
```

###### 2. Desplegar la migración del proyecto

```sh
  npx prisma migrate deploy
```

###### 3. Cargar los datos semilla:

```sh
  npx prisma db seed
```

###### 4. Ejecutar el servidor:

```sh
  npm run dev
```

## Endpoints

Se enumeran de acuerdo a los puntos definidos en el documento de la prueba ténica

### Punto 4:

Listar las bodegas:

- **GET** http://localhost:3000/api/bodegas

### Punto 5:

Crear bodega:

- **POST** http://localhost:3000/api/bodegas

```json
{
  "id_usuario": 1,
  "nombre": "prueba"
}
```

### Punto 6:

Listar productos con totales

- **GET** http://localhost:3000/api/productos

### Punto 7:

Crear producto:

- **POST** http://localhost:3000/api/productos

```json
{
  "nombre": "Sony Pro X",
  "descripcion": "El mejor celular de sony",
  "cantidad": 5
}
```

### Punto 8:

Agregar inventario:

- **POST** http://localhost:3000/api/inventarios

```json
{
  "id_producto": 1,
  "id_bodega": 1,
  "cantidad": 10
}
```

### Punto 9:

Trasladar un producto de una bodega:

- **PUT** http://localhost:3000/api/bodegas/trasladar

```json
{
  "id_producto": 3,
  "id_bodega_origen": 2,
  "id_bodega_destino": 1,
  "cantidad": 3
}
```
