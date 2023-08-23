// VISTAS
const indexView = (_req, res) => {
  res.render("index", { mensaje: "" }); // Corregido: especifica el nombre de la vista a renderizar
};

export { indexView };

