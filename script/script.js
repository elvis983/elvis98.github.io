let productos = [
  {
    id: 1,
    nombre: " 1/2Cuartilla King Kong 2",
    precio: 30,
    img: "ima/1.jpeg",
  },
  { id: 2, nombre: " 1/2Cuartilla RedBull", precio: 30, img: "ima/2.jpeg" },
  { id: 3, nombre: " 1/2Cuartilla Miratecho", precio: 30, img: "ima/3.jpeg" },
  { id: 4, nombre: " 1/2Cuartilla Maracuya", precio: 30, img: "ima/4.jpeg" },
  {
    id: 5,
    nombre: " 1/2Cuartilla Camionero EB",
    precio: 30,
    img: "ima/5.jpeg",
  },
  { id: 6, nombre: " 1/2Cuartilla Chicle", precio: 30, img: "ima/6.jpeg" },
  {
    id: 7,
    nombre: " 1/2Cuartilla Torcido EBN",
    precio: 30,
    img: "ima/7.jpeg",
  },
  { id: 8, nombre: " 1/2Cuartilla Miradoble", precio: 30, img: "ima/8.jpeg" },
  { id: 9, nombre: " 1/2Cuartilla LSN", precio: 30, img: "ima/9.jpeg" },
  { id: 10, nombre: " 1/2Cuartilla Toffee", precio: 30, img: "ima/10.jpeg" },
  { id: 11, nombre: "Cuartilla Toffee", precio: 45, img: "ima/0.jpeg" },
  { id: 12, nombre: "Cuartilla LSN", precio: 45, img: "ima/18.jpeg" },
  { id: 13, nombre: "Cuartilla Torcido EBN", precio: 45, img: "ima/19.jpeg" },
  { id: 14, nombre: "Cuartilla Miradoble", precio: 45, img: "ima/20.jpeg" },
  { id: 15, nombre: "Cuartilla King Kong 2", precio: 45, img: "ima/21.jpeg" },
  { id: 16, nombre: "Cuartilla RedBull", precio: 45, img: "ima/22.jpeg" },
  { id: 17, nombre: "Cuartilla Miratecho", precio: 45, img: "ima/23.jpeg" },
  { id: 18, nombre: "Cuartilla Lechuza", precio: 45, img: "ima/24.jpeg" },
  { id: 19, nombre: "Cuartilla Camionero EB", precio: 45, img: "ima/25.jpeg" },
  { id: 20, nombre: "Cuartilla Chicle", precio: 45, img: "ima/26.jpeg" },
  { id: 21, nombre: "Cuartilla Maracuya", precio: 45, img: "ima/27.jpeg" },
  { id: 22, nombre: "Despalada Lechuza", precio: 70, img: "ima/11.jpeg" },
  { id: 23, nombre: "Despalada RedBull", precio: 70, img: "ima/12.jpeg" },
  { id: 24, nombre: "Despalada Miratecho", precio: 70, img: "ima/13.jpeg" },
  { id: 25, nombre: "Despalada Toffee", precio: 70, img: "ima/14.jpeg" },
  { id: 26, nombre: "Despalada Maracuya", precio: 70, img: "ima/15.jpeg" },
  { id: 27, nombre: "Despalada LSN", precio: 70, img: "ima/16.jpeg" },
  { id: 28, nombre: "Despalada Miradoble", precio: 70, img: "ima/17.jpeg" },
];

let carrito = [];

// STORAGE
function guardarLocal() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  localStorage.setItem("productos", JSON.stringify(productos));
}

function cargarLocal() {
  let c = localStorage.getItem("carrito");
  let p = localStorage.getItem("productos");
  if (c) carrito = JSON.parse(c);
  if (p) productos = JSON.parse(p);
}

// PRODUCTOS
function pintarProductos(lista) {
  productosDiv = document.getElementById("productos");
  productosDiv.innerHTML = "";

  lista.forEach((p) => {
    productosDiv.innerHTML += `
<div class="card">
<img src="${p.img}">
<h3>${p.nombre}</h3>
<h1 class="precio">Bs ${p.precio}</h1>
<button class="add" onclick="agregar(${p.id})">Agregar</button>
</div>
`;
  });
}

function crearProducto() {
  let n = newNombre.value;
  let pr = Number(newPrecio.value);
  let im = newImg.value || "https://picsum.photos/200?random";

  let id = Date.now();
  productos.push({ id, nombre: n, precio: pr, img: im });
  guardarLocal();
  pintarProductos(productos);
}

productos = productos.filter((p) => p.nombre !== "NombreProducto");
guardarLocal();
pintarProductos(productos);

// CARRITO
function agregar(id) {
  let prod = productos.find((p) => p.id === id);
  let item = carrito.find((p) => p.id === id);

  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ ...prod, cantidad: 1 });
  }
  guardarLocal();
  pintarCarrito();
}

function quitar(id) {
  let item = carrito.find((p) => p.id == id);

  if (item) {
    item.cantidad--;
    if (item.cantidad <= 0) {
      carrito = carrito.filter((p) => p.id != id);
    }
  }
  guardarLocal();
  pintarCarrito();
}

function vaciar() {
  carrito = [];
  guardarLocal();
  pintarCarrito();
}

function pintarCarrito() {
  let carritoUL = document.getElementById("carrito");
  carritoUL.innerHTML = "";

  carrito.forEach((p) => {
    carritoUL.innerHTML += `
<li class="li">${p.nombre} x${p.cantidad}—Bs${p.precio * p.cantidad}
<button class="del" onclick="quitar(${p.id})">X</button></li>
`;
  });
}

// BUSCAR
function filtrar() {
  let t = busqueda.value.toLowerCase();
  pintarProductos(productos.filter((p) => p.nombre.toLowerCase().includes(t)));
}

// PAGO SIMULADO
function pagar() {
  if(carrito.length === 0) {
    alert("Carrito vacío");
    return;
  }

  let mensaje = "Pedido:%0A";
  let total = 0;

  carrito.forEach(p => {
    let subtotal = p.precio * p.cantidad; 
    total += subtotal;
    mensaje +=
    p.nombre + 
    " x" + p.cantidad +
     " = " + subtotal + "Bs" + 
     "%0A";
  });

  mensaje += `%0ATotal: ${total}Bs`;

  let numero = "59173471090";

  let url = "https://wa.me/" + 59173471090 + "?text=" + mensaje;

  window.open(url, "_blank");
}

// INIT
const carritoUL = document.getElementById("carrito");
cargarLocal();
pintarProductos(productos);
pintarCarrito();
