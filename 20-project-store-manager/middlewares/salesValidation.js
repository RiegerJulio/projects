const saleIdValidation = (req, res, next) => {
  try {
    const findProductId = req.body.find(({ productId }) => productId);
    if (!findProductId) {
      return res.status(400).json({ message: '"productId" is required' });
    }
    next();
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const quantityValidation = (req, res, next) => {
  try {
    const findQuantity = req.body.find(({ quantity }) => quantity);
    const findQuantityNumber = req.body.find(({ quantity }) => quantity > 0);

    if (!findQuantity) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
    if (!findQuantityNumber) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    next();
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  saleIdValidation,
  quantityValidation,
};