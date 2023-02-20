import NuevoPresupuesto from "./NuevoPresupuesto";
import ControlPresupuesto from "./ControlPresupuesto";

const Header = ({
  presupuesto,
  setPresupuesto,
  isValidPresupuesto,
  setIsValidPresupuesto,
  gastos,
  setGastos,
}) => {
  return (
    <header>
      <h1>Planificador de Gastos</h1>
      {/* si el presupuesto es valido carga la pantalla de control de gasto */}
      {isValidPresupuesto ? (
        <ControlPresupuesto
          presupuesto={presupuesto}
          gastos={gastos}
          setPresupuesto={setPresupuesto}
          setGastos={setGastos}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
      ) : (
        // de lo contrario mensaje de selecciona nuevo presupuesto
        <NuevoPresupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
      )}
    </header>
  );
};

export default Header;
