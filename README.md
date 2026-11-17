# tienda_mongodb

Scripts de entrega para la base de datos `tienda_db` (MongoDB).

## Estructura
- `seed.js` - crea la BD y carga 16 productos, 30 clientes, 120 pedidos (166 docs).
- `indexes.js` - crea los indices recomendados.
- `queries_crud.js` - insercion, seleccion, actualizacion, eliminacion.
- `queries_filtros.js` - filtros, operadores, $lookup.
- `queries_agregaciones.js` - conteos y estadisticas.
- `verify.js` - verificacion de conteos e indices.

## Uso
```bash
mongosh seed.js
mongosh indexes.js
mongosh verify.js
```
Las consultas se ejecutan por bloques en `mongosh` o MongoDB Compass.

## Notas
- `seed.js` hace `dropDatabase()`: borra y recrea todo.
- Fechas usan dia 1..28 para evitar desbordes de mes.
- `$mul` con 1.10 puede dejar flotantes; redondear si se requiere.
- Top de productos agrupa por `productoId` (no por nombre).
