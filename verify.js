// verify.js - Verificacion rapida de la BD
// Ejecutar: mongosh verify.js

db = db.getSiblingDB('tienda_db');

const p = db.productos.countDocuments();
const c = db.clientes.countDocuments();
const o = db.pedidos.countDocuments();

print('productos: ' + p);
print('clientes:  ' + c);
print('pedidos:   ' + o);

if (p !== 16 || c !== 30 || o !== 120) {
  print('ERROR: conteos inesperados');
} else {
  print('Conteos OK');
}

print('Indices productos:');
printjson(db.productos.getIndexes());
print('Indices pedidos:');
printjson(db.pedidos.getIndexes());
print('Indices clientes:');
printjson(db.clientes.getIndexes());
