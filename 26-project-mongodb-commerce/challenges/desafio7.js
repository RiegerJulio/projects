db.produtos.find({
  vendidos: { $ne: 50 },
  tags: null,
}, {
  nome: 1,
  vendidos: 1,
  _id: 0,
  tags: 1,
});