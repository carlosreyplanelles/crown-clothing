import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  showMiniCart: false,
  setShowMiniCart: () => null,
  cartItems: [],
  addItemToCart: () => {},
  itemsCount: 0,
  removeItem: () => {},
  clearItemFromBasket: () => {},
  cartTotal: 0,
});

const addCartItem = (cartItems, item) => {
  //find the item into cartItems
  const foundItem = cartItems.find((cartItem) => {
    return cartItem.id === item.id;
  });
  //If found increment quantity
  if (foundItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  //return new array
  return [...cartItems, { ...item, quantity: 1 }];
};

const removeItem = (cartItems, itemToRemove) => {
  const foundItem = cartItems.find((cartItem) => {
    return cartItem.id === itemToRemove.id;
  });

  if (foundItem) {
    if (foundItem.quantity === 1) {
      return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
    }
    return cartItems.map((cartItem) =>
      cartItem.id === itemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }
};

const clearItemFromBasket = (cartItems, itemToRemove) => {
  const foundItem = cartItems.find((cartItem) => {
    return cartItem.id === itemToRemove.id;
  });

  if (foundItem) {
    return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
  }
};

export const CartProvider = ({ children }) => {
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const addToCart = (itemToAdd) => {
    setCartItems(addCartItem(cartItems, itemToAdd));
  };

  const removeCartItem = (item) => {
    setCartItems(removeItem(cartItems, item));
  };

  const removeCartItemFromBasket = (item) => {
    setCartItems(clearItemFromBasket(cartItems, item));
  };

  useEffect(() => {
    setItemsCount(
      cartItems.reduce(
        (itemsInBasket, item) => itemsInBasket + item.quantity,
        0
      )
    );
  }, [cartItems]);

  useEffect(() => {
    const updatedCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(updatedCartTotal);
  }, [cartItems]);

  const value = {
    showMiniCart,
    setShowMiniCart,
    cartItems,
    addToCart,
    itemsCount,
    removeCartItem,
    removeCartItemFromBasket,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
