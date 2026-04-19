"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  type ReactNode,
} from "react"
import { toast } from "sonner"
import {
  createCart,
  addToCart,
  updateCart,
  removeFromCart,
  getCart,
} from "@/lib/shopify/actions"
import type { Cart, CartItem } from "@/lib/shopify/types"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CartState {
  cartId: string | null
  cart: Cart | null
  loading: boolean
  mutating: boolean
  error: string | null
}

type CartAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_MUTATING"; payload: boolean }
  | { type: "SET_CART"; payload: { cartId: string; cart: Cart } }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "CLEAR_CART" }

interface CartContextValue {
  cartId: string | null
  cart: Cart | null
  items: CartItem[]
  totalQuantity: number
  subtotal: string
  currencyCode: string
  loading: boolean
  mutating: boolean
  error: string | null
  addItem: (variantId: string, quantity?: number) => Promise<Cart | null>
  removeItem: (lineId: string) => Promise<void>
  updateQuantity: (lineId: string, quantity: number) => Promise<void>
  clearCart: () => void
}

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

const INITIAL_STATE: CartState = {
  cartId: null,
  cart: null,
  loading: false,
  mutating: false,
  error: null,
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_MUTATING":
      return { ...state, mutating: action.payload }
    case "SET_CART":
      return {
        ...state,
        cartId: action.payload.cartId,
        cart: action.payload.cart,
        error: null,
      }
    case "SET_ERROR":
      return { ...state, error: action.payload }
    case "CLEAR_CART":
      return { ...INITIAL_STATE }
    default:
      return state
  }
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const CartContext = createContext<CartContextValue | null>(null)

const CART_STORAGE_KEY = "hellig-ord-cart-id"

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)

  // Initialise cart from localStorage on mount
  const initialised = useRef(false)

  useEffect(() => {
    if (initialised.current) return
    initialised.current = true

    const storedCartId =
      typeof window !== "undefined"
        ? localStorage.getItem(CART_STORAGE_KEY)
        : null

    if (!storedCartId) {
      dispatch({ type: "SET_LOADING", payload: false })
      return
    }

    dispatch({ type: "SET_LOADING", payload: true })

    getCart(storedCartId)
      .then((cart) => {
        if (cart) {
          dispatch({
            type: "SET_CART",
            payload: { cartId: storedCartId, cart },
          })
        } else {
          // Stored cart is stale — clear it
          localStorage.removeItem(CART_STORAGE_KEY)
        }
      })
      .catch((err: unknown) => {
        console.error("[CartContext] Failed to restore cart:", err)
        // Only purge the stored cart if the cart is definitively gone (e.g.
        // CART_NOT_FOUND from Shopify). On network/timeout errors we keep the
        // cartId so the user's cart survives a momentary connectivity blip.
        const isDefinitelyGone =
          err instanceof Error &&
          (err.message.includes("CART_NOT_FOUND") ||
            err.message.includes("not found"))
        if (isDefinitelyGone) {
          localStorage.removeItem(CART_STORAGE_KEY)
        } else {
          dispatch({ type: "SET_ERROR", payload: "Kunne ikke laste handlekurven" })
        }
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false })
      })
  }, [])

  // Persist cartId to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === "undefined") return
    if (state.cartId) {
      localStorage.setItem(CART_STORAGE_KEY, state.cartId)
    } else {
      localStorage.removeItem(CART_STORAGE_KEY)
    }
  }, [state.cartId])

  // Show a toast whenever an error is set, then clear it
  useEffect(() => {
    if (!state.error) return
    toast.error(state.error, { duration: 4000, position: "bottom-right" })
    dispatch({ type: "SET_ERROR", payload: null })
  }, [state.error])

  // ------------------------------------------------------------------
  // Ensure a cart exists, creating one if necessary
  // ------------------------------------------------------------------
  const ensureCart = useCallback(async (): Promise<string> => {
    if (state.cartId) return state.cartId

    const newCart = await createCart()
    dispatch({
      type: "SET_CART",
      payload: { cartId: newCart.id, cart: newCart },
    })
    return newCart.id
  }, [state.cartId])

  // ------------------------------------------------------------------
  // addItem
  // ------------------------------------------------------------------
  const addItem = useCallback(
    async (variantId: string, quantity = 1): Promise<Cart | null> => {
      dispatch({ type: "SET_MUTATING", payload: true })
      dispatch({ type: "SET_ERROR", payload: null })

      try {
        const cartId = await ensureCart()
        const updatedCart = await addToCart(cartId, variantId, quantity)
        dispatch({
          type: "SET_CART",
          payload: { cartId: updatedCart.id, cart: updatedCart },
        })
        return updatedCart
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : "Kunne ikke legge til i handlekurv"
        dispatch({ type: "SET_ERROR", payload: message })
        throw err
      } finally {
        dispatch({ type: "SET_MUTATING", payload: false })
      }
    },
    [ensureCart]
  )

  // ------------------------------------------------------------------
  // removeItem
  // ------------------------------------------------------------------
  const removeItem = useCallback(
    async (lineId: string) => {
      if (!state.cartId) return
      dispatch({ type: "SET_MUTATING", payload: true })
      dispatch({ type: "SET_ERROR", payload: null })

      try {
        const updatedCart = await removeFromCart(state.cartId, lineId)
        dispatch({
          type: "SET_CART",
          payload: { cartId: updatedCart.id, cart: updatedCart },
        })
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Kunne ikke fjerne varen"
        dispatch({ type: "SET_ERROR", payload: message })
      } finally {
        dispatch({ type: "SET_MUTATING", payload: false })
      }
    },
    [state.cartId]
  )

  // ------------------------------------------------------------------
  // updateQuantity
  // ------------------------------------------------------------------
  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!state.cartId) return
      dispatch({ type: "SET_MUTATING", payload: true })
      dispatch({ type: "SET_ERROR", payload: null })

      try {
        const updatedCart = await updateCart(state.cartId, lineId, quantity)
        dispatch({
          type: "SET_CART",
          payload: { cartId: updatedCart.id, cart: updatedCart },
        })
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : "Kunne ikke oppdatere antallet"
        dispatch({ type: "SET_ERROR", payload: message })
      } finally {
        dispatch({ type: "SET_MUTATING", payload: false })
      }
    },
    [state.cartId]
  )

  // ------------------------------------------------------------------
  // clearCart
  // ------------------------------------------------------------------
  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" })
  }, [])

  const value: CartContextValue = {
    cartId: state.cartId,
    cart: state.cart,
    items: state.cart?.items ?? [],
    totalQuantity: state.cart?.totalQuantity ?? 0,
    subtotal: state.cart?.subtotal ?? "0.00",
    currencyCode: state.cart?.currencyCode ?? "NOK",
    loading: state.loading,
    mutating: state.mutating,
    error: state.error,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider")
  }
  return ctx
}
