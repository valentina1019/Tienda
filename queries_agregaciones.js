// queries_agregaciones.js - Agregaciones / estadisticas

db = db.getSiblingDB('tienda_db');

db.pedidos.countDocuments();
db.pedidos.countDocuments({ estado: 'entregado' });

// Pedidos por estado
db.pedidos.aggregate([
  { $group: { _id: '$estado', cantidad: { $sum: 1 } } },
  { $sort: { cantidad: -1 } }
]);

// Estadisticas generales (excluye cancelados)
db.pedidos.aggregate([
  { $match: { estado: { $ne: 'cancelado' } } },
  { $group: {
      _id: null,
      pedidos: { $sum: 1 },
      ventasTotales: { $sum: '$total' },
      promedioPedido: { $avg: '$total' },
      pedidoMenor: { $min: '$total' },
      pedidoMayor: { $max: '$total' }
  } }
]);

// Ingresos y unidades por categoria
db.pedidos.aggregate([
  { $match: { estado: { $ne: 'cancelado' } } },
  { $unwind: '$items' },
  { $group: {
      _id: '$items.categoria',
      unidades: { $sum: '$items.cantidad' },
      ingresos: { $sum: { $multiply: ['$items.precio', '$items.cantidad'] } }
  } },
  { $sort: { ingresos: -1 } }
]);

// Top 5 productos mas vendidos (por productoId)
db.pedidos.aggregate([
  { $unwind: '$items' },
  { $group: { _id: '$items.productoId', nombre: { $first: '$items.nombre' },
              unidades: { $sum: '$items.cantidad' } } },
  { $sort: { unidades: -1 } },
  { $limit: 5 }
]);

// Promedio del valor de pedido por ciudad
db.pedidos.aggregate([
  { $lookup: { from: 'clientes', localField: 'clienteId', foreignField: '_id', as: 'cliente' } },
  { $unwind: '$cliente' },
  { $group: { _id: '$cliente.ciudad', pedidos: { $sum: 1 }, promedio: { $avg: '$total' } } },
  { $sort: { promedio: -1 } }
]);

// Ventas por mes
db.pedidos.aggregate([
  { $group: { _id: { $month: '$fecha' }, pedidos: { $sum: 1 }, ventas: { $sum: '$total' } } },
  { $sort: { _id: 1 } }
]);

// Valor del inventario por categoria
db.productos.aggregate([
  { $group: { _id: '$categoria', productos: { $sum: 1 },
              valorInventario: { $sum: { $multiply: ['$precio', '$stock'] } } } }
]);
