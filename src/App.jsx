import { useState, useEffect } from "react";

import Header from "./components/Header";
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";
import Filtros from "./components/Filtros";
import { generarId } from "./components/helpers";

import IconoNuevoGasto from "./img/nuevo-gasto.svg";

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  //state para modal
  const [modal, setModal] = useState(false);
  //animar modal
  const [animarModal, setAnimarModal] = useState(false);

  //state para filtros
  const [filtro, setFiltro] = useState("");

  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  //state para guardar los gastos en un arreglo que coloco el usuario
  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos")
      ? JSON.parse(localStorage.getItem("gastos"))
      : []
  );

  //state para almacenar los gasto a editar
  const [gastoEditar, setGastoEditar] = useState({});

  //useEffect para que detecte que gasto es
  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [gastoEditar]);

  //useEffect localStorage a presupuesto
  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

  // useEffect localStorgae para impedir que al recargar la pagina se vaya al home
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto"));
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, []);

  //useEffect localstorage para mantener los gastos
  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);

  //useEffec para filtros
  useEffect(() => {
    if (filtro) {
      const gastoFiltrados = gastos.filter(
        (gasto) => gasto.categoria === filtro
      );

      setGastosFiltrados(gastoFiltrados);
    }
  }, [filtro]);
  //
  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  //funcion para guardar los gastos o lo que el usuario escribio
  const guardarGasto = (gasto) => {
    if (gasto.id) {
      //actualizar
      const gastosActulizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(gastosActulizados);
      setGastoEditar({});
    } else {
      //nuevo registro

      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  //Funcion para eliminar gasto
  const eliminarGasto = (id) => {
    const gastosActulizados = gastos.filter((gasto) => gasto.id !== id);
    setGastos(gastosActulizados);
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        presupuesto={presupuesto}
        setGastos={setGastos}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
      />
      {/* CREACION DEL MODAL AL DARLE CLICK A LA IAMGEN */}
      {isValidPresupuesto && (
        <>
          <main>
            <Filtros filtro={filtro} setFiltro={setFiltro} />
            <ListadoGastos
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}
      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
      ;
    </div>
  );
}

export default App;
