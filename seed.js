// seed.js - Datos de prueba para tienda_db (MongoDB)
// Ejecutar: mongosh seed.js   (o pegar en mongosh / Atlas)
// Reinicia la BD completa.

db = db.getSiblingDB('tienda_db');
db.dropDatabase();

// ---------- PRODUCTOS (16) ----------
const catalogo = [
  ['Portatil Lenovo IdeaPad', 'Lenovo', 'Computadores', 2400000],
  ['Portatil HP Pavilion', 'HP', 'Computadores', 2900000],
  ['Tablet Samsung Tab A9', 'Samsung', 'Computadores', 900000],
  ['Monitor LG 24 pulgadas', 'LG', 'Computadores', 650000],
  ['Samsung Galaxy A15', 'Samsung', 'Celulares', 780000],
  ['Xiaomi Redmi Note 13', 'Xiaomi', 'Celulares', 950000],
  ['iPhone 13', 'Apple', 'Celulares', 2700000],
  ['Motorola G54', 'Motorola', 'Celulares', 720000],
  ['Mouse Logitech M185', 'Logitech', 'Accesorios', 45000],
  ['Teclado Redragon K552', 'Redragon', 'Accesorios', 140000],
  ['Cargador USB-C 65W', 'Anker', 'Accesorios', 85000],
  ['Memoria USB 64GB', 'Kingston', 'Accesorios', 30000],
  ['Audifonos JBL Tune 510', 'JBL', 'Audio', 180000],
  ['Parlante JBL Flip 6', 'JBL', 'Audio', 520000],
  ['Audifonos Sony WH-CH520', 'Sony', 'Audio', 250000],
  ['Barra de sonido LG', 'LG', 'Audio', 600000]
];

db.productos.insertMany(catalogo.map((p, i) => ({
  _id: 'P' + String(i + 1).padStart(3, '0'),
  nombre: p[0],
  marca: p[1],
  categoria: p[2],
  precio: p[3],
  stock: 20 + (i * 7) % 50,
  etiquetas: [p[2].toLowerCase(), p[1].toLowerCase()],
  activo: true
})));

// ---------- CLIENTES (30) ----------
const nombres = ['Ana','Luis','Maria','Carlos','Laura','Andres','Sofia','Jorge','Paula','Camilo'];
const apellidos = ['Gomez','Perez','Rodriguez','Martinez','Lopez','Torres'];
const ciudades = ['Valledupar','Bogota','Medellin','Barranquilla','Cali'];

db.clientes.insertMany(Array.from({ length: 30 }, (_, i) => ({
  _id: 'C' + String(i + 1).padStart(3, '0'),
  nombre: nombres[i % 10] + ' ' + apellidos[i % 6],
  correo: 'cliente' + (i + 1) + '@mail.com',
  ciudad: ciudades[i % 5],
  direcciones: [{ tipo: 'casa', calle: 'Calle ' + (10 + i) + ' # ' + (i + 1) + '-20' }],
  fechaRegistro: new Date(2025, i % 12, 1 + (i % 28))
})));

// ---------- PEDIDOS (120) ----------
const estados = ['entregado', 'enviado', 'pendiente', 'cancelado'];
const pagos = ['tarjeta', 'PSE', 'efectivo'];
const pedidos = [];

for (let i = 0; i < 120; i++) {
  const items = [];
  for (let j = 0; j <= (i % 3); j++) {
    const idx = (i * 3 + j * 5) % 16;
    const p = catalogo[idx];
    items.push({
      productoId: 'P' + String(idx + 1).padStart(3, '0'),
      nombre: p[0],
      categoria: p[2],
      precio: p[3],
      cantidad: 1 + (i + j) % 3
    });
  }
  pedidos.push({
    _id: 'PED' + String(i + 1).padStart(4, '0'),
    clienteId: 'C' + String((i % 30) + 1).padStart(3, '0'),
    fecha: new Date(2026, i % 10, 1 + (i % 28)),
    estado: estados[i % 4],
    metodoPago: pagos[i % 3],
    items: items,
    total: items.reduce((s, it) => s + it.precio * it.cantidad, 0)
  });
}

db.pedidos.insertMany(pedidos);

// ---------- Verificacion ----------
print('productos: ' + db.productos.countDocuments());
print('clientes:  ' + db.clientes.countDocuments());
print('pedidos:   ' + db.pedidos.countDocuments());
print('OK seed completado');
