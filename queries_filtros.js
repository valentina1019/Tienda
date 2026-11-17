// queries_filtros.js - Filtros y operadores

db = db.getSiblingDB('tienda_db');

// Comparacion
db.productos.find({ precio: { $gt: 500000 } });
db.productos.find({ precio: { $gte: 100000, $lte: 800000 } }).sort({ precio: 1 });
db.productos.find({ categoria: { $in: ['Celulares', 'Audio'] } });

// $and / $or
db.pedidos.find({
  $and: [
    { $or: [{ estado: 'entregado' }, { estado: 'enviado' }] },
    { total: { $gt: 3000000 } }
  ]
});

// Regex
db.productos.find({ nombre: /JBL/i });

// Arrays
db.pedidos.find({ 'items.productoId': 'P001' });
db.pedidos.find({ items: { $elemMatch: { categoria: 'Celulares', cantidad: { $gte: 2 } } } });

// Rango de fechas
db.pedidos.find({ fecha: { $gte: new Date('2026-03-01'), $lt: new Date('2026-06-01') } });

// Paginacion: 5 pedidos mas costosos
db.pedidos.find().sort({ total: -1 }).limit(5);

// $lookup pedidos + cliente
db.pedidos.aggregate([
  { $lookup: { from: 'clientes', localField: 'clienteId', foreignField: '_id', as: 'cliente' } },
  { $unwind: '$cliente' },
  { $project: { fecha: 1, estado: 1, total: 1, 'cliente.nombre': 1, 'cliente.ciudad': 1 } },
  { $limit: 5 }
]);

// $lookup items + producto
db.pedidos.aggregate([
  { $unwind: '$items' },
  { $lookup: { from: 'productos', localField: 'items.productoId', foreignField: '_id', as: 'producto' } },
  { $unwind: '$producto' },
  { $project: { _id: 1, 'items.nombre': 1, 'items.cantidad': 1,
                'producto.marca': 1, 'producto.stock': 1 } },
  { $limit: 5 }
]);
