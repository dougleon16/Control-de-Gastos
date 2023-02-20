import { useState } from "react";
import Mensaje from "./Mensaje";
const NuevoPresupuesto = ({
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto,
}) => {
  //state para mensaje de error y exito
  const [mensaje, setMensaje] = useState("");

  //Validacion de Presupuesto
  const handlePresupuesto = (e) => {
    e.preventDefault();
    if (!presupuesto || presupuesto < 0) {
      setMensaje("No es un presupuesto valido");
      return; //rompemos el ciclo
    }

    setMensaje("");
    setIsValidPresupuesto(true);
  };
  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form onSubmit={handlePresupuesto} action="" className="formulario">
        <div className="campo ">
          <label htmlFor="">Definir Presupuesto</label>
          <input
            className="nuevo-presupuesto contenedor"
            placeholder="Añade tu presupuesto"
            type="number"
            value={presupuesto}
            onChange={(e) => setPresupuesto(Number(e.target.value))}
          />
          <input className="contenedor" type="submit" value="Añadir" />
        </div>

        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </div>
  );
};

export default NuevoPresupuesto;
