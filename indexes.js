// indexes.js - Indices recomendados
// Ejecutar despues de seed.js: mongosh indexes.js

db = db.getSiblingDB('tienda_db');

db.pedidos.createIndex({ clienteId: 1, fecha: -1 });
db.pedidos.createIndex({ estado: 1 });
db.productos.createIndex({ categoria: 1, precio: 1 });
db.clientes.createIndex({ correo: 1 }, { unique: true });

print('Indices creados:');
printjson(db.pedidos.getIndexes());
printjson(db.productos.getIndexes());
printjson(db.clientes.getIndexes());
