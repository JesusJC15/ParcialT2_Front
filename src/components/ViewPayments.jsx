import React, { useState } from "react";
import axios from "axios";

const ViewPayments = () => {
  const [usuarioId, setUsuarioId] = useState("");
  const [pagos, setPagos] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const consultarPagos = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/pagos/usuario/${usuarioId}`);
      setPagos(response.data);
      setMensaje(response.data.length ? "" : "No se encontraron pagos.");
    } catch (error) {
      setMensaje("Error al consultar pagos.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Consultar Pagos</h2>
      <div className="mb-2">
        <label>Usuario ID:</label>
        <input className="form-control" value={usuarioId} onChange={(e) => setUsuarioId(e.target.value)} />
      </div>
      <button className="btn btn-primary" onClick={consultarPagos}>Consultar</button>
      {mensaje && <p className="mt-2 alert alert-info">{mensaje}</p>}
      <ul className="list-group mt-3">
        {pagos.map((pago) => (
          <li key={pago.id} className="list-group-item">
            <strong>ID:</strong> {pago.id} | <strong>Total:</strong> ${pago.total} | <strong>Estado:</strong> {pago.estado}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewPayments;