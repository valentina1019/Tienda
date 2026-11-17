// queries_crud.js - CRUD basico
// Ejecutar por bloques en mongosh o Compass.

db = db.getSiblingDB('tienda_db');

// ---- Insercion ----
db.clientes.insertOne({
  _id: 'C031', nombre: 'Valentina Castro', correo: 'valentina@mail.com',
  ciudad: 'Valledupar', direcciones: [], fechaRegistro: new Date()
});
db.productos.insertMany([
  { _id: 'P017', nombre: 'Webcam Logitech C920', marca: 'Logitech',
    categoria: 'Accesorios', precio: 320000, stock: 15, etiquetas: ['webcam'], activo: true },
  { _id: 'P018', nombre: 'Disco SSD 1TB', marca: 'Kingston',
    categoria: 'Accesorios', precio: 310000, stock: 25, etiquetas: ['ssd'], activo: true }
]);

// ---- Seleccion ----
db.productos.find();
db.productos.findOne({ _id: 'P001' });
db.clientes.find({ ciudad: 'Valledupar' });
db.productos.find({ categoria: 'Audio' }, { nombre: 1, precio: 1, _id: 0 });

// ---- Actualizacion ----
db.productos.updateOne({ _id: 'P001' }, { $set: { precio: 2300000 } });
db.productos.updateMany({ categoria: 'Audio' }, { $mul: { precio: 1.10 } }); // ojo: flotantes
db.productos.updateOne({ _id: 'P005' }, { $inc: { stock: -2 }, $push: { etiquetas: 'oferta' } });
db.pedidos.updateMany({ estado: 'pendiente' }, { $set: { estado: 'enviado' } });

// ---- Eliminacion ----
db.productos.deleteOne({ _id: 'P018' });
db.pedidos.deleteMany({ estado: 'cancelado', total: { $lt: 100000 } });
db.clientes.deleteOne({ _id: 'C031' });
