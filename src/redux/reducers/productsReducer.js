import actionTypes from "../actionTypes/actionTypes";

const initialState = {
    products: [],
    initialized: false
}

export default function productsReducer (state = initialState, action) {
    switch (action.type) {
        case actionTypes.productsActions.FETCH_PRODUCTS_START:
          return {
            ...state,
            initialized:false,
          }
        
          case actionTypes.productsActions.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                initialized:true,
                products: action.payload
            }

            case actionTypes.productsActions.FETCH_PRODUCTS_FAIL:
            return{
                ...state,
                initialized:false
            }
    
        default:
           return state
    }
}