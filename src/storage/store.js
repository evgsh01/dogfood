import { configureStore } from "@reduxjs/toolkit";

import productsSlice from "./products/products-slice";
import userSlice from "./user/user-slice";

const store = configureStore({
    reducer: {
        products: productsSlice,
        user: userSlice,
    }
});

export default store;