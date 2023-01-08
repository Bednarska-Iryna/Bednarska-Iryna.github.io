// import {ReducerTypes } from "./ReducerTypes"

// const initialState = {
//   items: {},
//   error: null,
//   loading: true,
// };

// export const IrynaReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case IrynaReducerTypes.ADDING:
//       return {
//         ...state,
//         items: action.data,
//       };
//     case IrynaReducerTypes.LOADING:
//       return {
//         ...state,
//         loading: action.loading,
//       };
//     case IrynaReducerTypes.ERROR:
//       return {
//         ...state,
//         error: action.error,
//       };
//       case IrynaReducerTypes.MORE_ADDING:
//         return {
//           ...state,
//           items: {
//             info: action.data.info,
//             results: [
//               ...state.items.results,
//               ...action.data.results
//             ]
//           }
//         };
//     default:
//       return state;
//   }
// };
