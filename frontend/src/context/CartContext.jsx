import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (game) => {
    setCart((prev) => {
      if (prev.find((g) => g.id === game.id)) return prev
      return [...prev, game]
    })
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((g) => g.id !== id))
  }

  const clearCart = () => setCart([])

  const total = cart.reduce((acc, g) => acc + parseFloat(g.discount_price || g.price), 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)