import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {addProductToCart, getCart, decreaseCart, increaseCart, removeFromCart,clearCart} from "../../services/cartService";
const initialState = {
    cartItems: localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")
    ) : [],
    cartTotalQuantity: localStorage.getItem("cartQuantity") ? JSON.parse(localStorage.getItem("cartQuantity")) : [],
    cartTotalAmount: 0,
}
const cartSlice = createSlice({
        name: "cart",
        initialState,
        reducers: {
            getTotals(state, action) {
                let {total, quantity} = state.cartItems.reduce(
                    (cartTotal, cartItem) => {
                        const {price, cartQuantity} = cartItem;
                        const itemTotal = price * cartQuantity;
                        cartTotal.total += itemTotal;
                        cartTotal.quantity += cartQuantity;
                        return cartTotal;
                    },
                    {
                        total: 0,
                        quantity: 0,
                    }
                );
                total = parseFloat(total.toFixed(2));
                state.cartTotalQuantity = quantity;
                localStorage.setItem("quantityCart",JSON.stringify(state.cartTotalQuantity));
                state.cartTotalAmount = total;
            },
        },
        extraReducers: builder => {
            builder.addCase(addProductToCart.fulfilled, (state, action) => {
                const existingIndex = state.cartItems.findIndex((item) => item.product_id === action.payload.product_id)
                if (existingIndex >= 0) {
                    state.cartItems[existingIndex] = {
                        ...state.cartItems[existingIndex],
                    };
                    console.log(state.cartItems, 'abccccccccccc')
                    toast.info("Increased product quantity", {
                        position: "bottom-left",
                    });
                } else {
                    let tempProductItem = {...action.payload, cartQuantity: 1};
                    state.cartItems.push(tempProductItem);
                    toast.success("Product added to cart", {
                        position: "bottom-left",
                    });
                }
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            });
            builder.addCase(getCart.fulfilled, (state, action) => {
                console.log("getproduct", action.payload.data)
                state.cartItems = action.payload.data
            });
            builder.addCase(decreaseCart.fulfilled, (state, action) => {
                const itemIndex = state.cartItems.findIndex(
                    (item) => item.product_id === action.payload.product_id
                );
                if (state.cartItems[itemIndex].cartQuantity > 1) {
                    state.cartItems[itemIndex].cartQuantity -= 1;
                    toast.info("Decreased product quantity", {
                        position: "bottom-left",
                    });
                } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                    const nextCartItems = state.cartItems.filter(
                        (item) => item.product_id !== action.payload.product_id
                    );
                    state.cartItems = nextCartItems;
                    toast.error("Product removed from cart", {
                        position: "bottom-left",
                    });
                }
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            });
            builder.addCase(increaseCart.fulfilled, (state, action) => {
                const itemIndex = state.cartItems.findIndex(
                    (item) => item.product_id === action.payload.product_id
                );
                if (state.cartItems[itemIndex].cartQuantity >= 0) {
                    state.cartItems[itemIndex].cartQuantity += 1;
                    toast.info("Decreased product quantity", {
                        position: "bottom-left",
                    });
                } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                    const nextCartItems = state.cartItems.filter(
                        (item) => item.product_id !== action.payload.product_id
                    );
                    state.cartItems = nextCartItems;
                    toast.error("Product removed from cart", {
                        position: "bottom-left",
                    });
                }
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            });
            builder.addCase(removeFromCart.fulfilled, (state, action) => {
                state.cartItems.map((cartItem) => {
                    if (cartItem.product_id === action.payload.product_id) {
                        const nextCartItems = state.cartItems.filter(
                            (item) => item.product_id !== cartItem.product_id
                        );
                        state.cartItems = nextCartItems;
                        toast.error("Remove cart ...", {
                            position: "bottom-left",
                        });
                    }
                    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
                    return state;
                });
            });
            builder.addCase(clearCart.fulfilled, (state, action) => {
                state.cartItems = [];
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
                toast.error("Cart cleared", {position: "bottom-left"});
            });
        }
    }
)
export const {
    getTotals,
} = cartSlice.actions;
export default cartSlice.reducer;