// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { TConstructorIngredient, TIngredient } from '@utils-types';

// export interface IConstructorState {
//   bun: TIngredient | null;
//   ingredients: TConstructorIngredient[];
//   orderRequest: boolean;
//   orderModalData: any | null;
// }

// const initialState: IConstructorState = {
//   bun: null,
//   ingredients: [],
//   orderRequest: false,
//   orderModalData: null
// };

// const constructorSlice = createSlice({
//   name: 'constructor',
//   initialState,
//   reducers: {
//     setBun(state, action: PayloadAction<TIngredient>) {
//       state.bun = action.payload;
//     },
//     addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
//       state.ingredients.push(action.payload);
//     },
//     removeIngredient(state, action: PayloadAction<number>) {
//       state.ingredients.splice(action.payload, 1);
//     },

//     setOrderRequest(state, action: PayloadAction<boolean>) {
//       state.orderRequest = action.payload;
//     },
//     setOrderModalData(state, action: PayloadAction<any | null>) {
//       state.orderModalData = action.payload;
//     }
//   }
// });

// export const {
//   setBun,
//   addIngredient,
//   removeIngredient,
//   setOrderRequest,
//   setOrderModalData
// } = constructorSlice.actions;

// export const constructorReducer = constructorSlice.reducer;
