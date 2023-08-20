//VISTAS
const indexView = (_req, res) => {
  res.render("/", { mensaje: "" });
};

const createView = (_req, res) => {
  res.render("/crear");
};

export { indexView, createView };
