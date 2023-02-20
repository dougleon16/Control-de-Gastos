const Mensaje = ({ children, tipo, color }) => {
  return <div className={`alerta ${tipo} ${color} `}>{children}</div>;
};

export default Mensaje;
