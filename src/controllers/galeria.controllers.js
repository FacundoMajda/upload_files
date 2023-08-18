//VISTAS
const indexView = (_req, res) => {
  res.render("galeria/index", { mensaje: "" });
};

const createView = (_req, res) => {
  res.render("galeria/crear");
};

export { indexView, createView };
