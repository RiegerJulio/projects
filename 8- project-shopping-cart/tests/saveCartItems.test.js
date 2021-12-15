const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  it('test if localStorage.setItem is called', () => {
    saveCartItems();
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('test if localStorage.setItem is called with 2 parameters', () => {
    const argument = '<ol><li>Item</li></ol>';
    saveCartItems(argument);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', argument);
  });
});
