import { useState, useEffect } from "react";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({
  presupuesto,
  gastos,
  setGastos,
  setPresupuesto,
  setIsValidPresupuesto,
}) => {
  const [porcentaje, setPorcentaje] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  // use effect para mostrar lo gastado
  useEffect(() => {
    //acumulado
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );
    const totalDisponible = presupuesto - totalGastado;

    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);

    setDisponible(totalDisponible);
    setGastado(totalGastado);

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1200);
  }, [gastos]);

  const formatearDinero = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleReset = () => {
    const resetear = confirm("¿Desea resetear el presupuesto?");
    if (resetear) {
      setGastos([]);
      setPresupuesto(0);
      setIsValidPresupuesto(false);
    }
  };
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
            trailColor: "#f5f5f5",
            textColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
          })}
          value={porcentaje}
          text={`${porcentaje} % Gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button onClick={handleReset} className="reset-app ">
          Resetear App
        </button>
        <p>
          <span>Presupuesto: {""}</span> {formatearDinero(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible: {""}</span> {formatearDinero(disponible)}
        </p>
        <p>
          <span>Gastado: {""}</span> {formatearDinero(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
