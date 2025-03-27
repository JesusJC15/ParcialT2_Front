import React, { useState } from "react";
import axios from "axios";

const RegisterPayment = () => {
  const [usuarioId, setUsuarioId] = useState("");
  const [productos, setProductos] = useState([]);
  const [fecha, setFecha] = useState("");
  const [total, setTotal] = useState("");
  const [mensaje, setMensaje] = useState("");

  const agregarProducto = () => {
    setProductos([...productos, { nombre: "", precio: 0, cantidad: 1 }]);
  };

  const actualizarProducto = (index, field, value) => {
    const nuevosProductos = [...productos];
    nuevosProductos[index][field] = value;
    setProductos(nuevosProductos);
  };

  const enviarPago = async () => {
    const pagoData = {
      usuarioId,
      productos: productos.map(prod => ({
        nombre: prod.nombre,
        precio: parseFloat(prod.precio),
        cantidad: parseInt(prod.cantidad, 10),
      })),
      total: parseFloat(total),
      fecha,
    };

    try {
      const response = await axios.post("https://parcialt2-b2fvb9atb9adfkaq.canadacentral-01.azurewebsites.net/pagos/realizar", pagoData, {
        headers: { "Content-Type": "application/json" },
      });

      setMensaje(`Pago registrado con ID: ${response.data.id} - Estado: ${response.data.estado}`);
    } catch (error) {
      setMensaje(error.response?.data?.message || "Error al procesar el pago.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Registrar Pago</h2>
      <div className="mb-2">
        <label>Usuario ID:</label>
        <input className="form-control" value={usuarioId} onChange={(e) => setUsuarioId(e.target.value)} />
      </div>
      <div className="mb-2">
        <label>Fecha (DD-MM-YYYY):</label>
        <input className="form-control" value={fecha} onChange={(e) => setFecha(e.target.value)} />
      </div>
      <h4>Productos</h4>
      {productos.map((prod, index) => (
        <div key={index} className="mb-2">
          <input className="form-control mb-1" placeholder="Nombre" value={prod.nombre} onChange={(e) => actualizarProducto(index, "nombre", e.target.value)} />
          <input className="form-control mb-1" placeholder="Precio" type="number" value={prod.precio} onChange={(e) => actualizarProducto(index, "precio", e.target.value)} />
          <input className="form-control mb-1" placeholder="Cantidad" type="number" value={prod.cantidad} onChange={(e) => actualizarProducto(index, "cantidad", e.target.value)} />
        </div>
      ))}
      <button className="btn btn-secondary" onClick={agregarProducto}>Agregar Producto</button>
      <div className="mt-2">
        <label>Total:</label>
        <input className="form-control" type="number" value={total} onChange={(e) => setTotal(e.target.value)} />
      </div>
      <button className="btn btn-primary mt-3" onClick={enviarPago}>Registrar Pago</button>
      {mensaje && <p className="mt-2 alert alert-info">{mensaje}</p>}
    </div>
  );
};

export default RegisterPayment;
