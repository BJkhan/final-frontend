import { 
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL, 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    LOCAL_PRODUCT_FILTER, 
} from "../Constants/ProductConstants";

export const productListReducer = (state = { 
  products: [], 
  uniqueCategories: [], 
  uniqueColors: [], 
  filteredProducts: [], 
  uniqueSizes: [], 
  uniqueSleeveLengths: [],
  uniqueDressTypes: [], 
  uniqueDressStyles:[],
  uniqueDressLengths: [],
  uniqueMaterials: [],
  uniquePatternTypes: [],
  // minPrice: 0,
  // maxPrice: 0,
  pages: 0, 
  page: 0 
}, action) => {
    
    switch (action.type) {
      case PRODUCT_LIST_REQUEST:
        return { loading: true, 
          products: [], 
          uniqueCategories: [], 
          uniqueColors: [], 
          filteredProducts: [], 
          uniqueSizes: [], 
          uniqueSleeveLengths: [],
          uniqueDressTypes: [],
          uniqueDressStyles:[],
          uniqueDressLengths: [],
          uniqueMaterials: [],
          uniquePatternTypes: [],
          // minPrice: 0,
          // maxPrice: 0,
          pages: 0,
          page: 0,
        };
      case PRODUCT_LIST_SUCCESS:

        const allCategories = action.payload.products.map(product => product.category);
        const uniqueCategories = [...new Set(allCategories)];

        const allColors = action.payload.products.map(product => product.mainColor);
        const uniqueColors = [...new Set(allColors)];

        const allSizes = action.payload.products.map((product) => product.mainDressSize);
        const uniqueSizes = [...new Set(allSizes)];

        const allSleeveLengths = action.payload.products.map((product) => product.sleeveLength);
        const uniqueSleeveLengths = [...new Set(allSleeveLengths)];

        const allDressTypes = action.payload.products.map((product) => product.dressType);
        const uniqueDressTypes = [...new Set(allDressTypes)];

        const allDressStyles = action.payload.products.map(product => product.dressStyle);
        const uniqueDressStyles = [...new Set(allDressStyles)];

        const allPatternTypes = action.payload.products.map(product => product.patternType);
        const uniquePatternTypes = [...new Set(allPatternTypes)];

        const allDressLengths = action.payload.products.map((product) => product.dressLength);
        const uniqueDressLengths = [...new Set(allDressLengths)];

        const allMaterials = action.payload.products.map((product) => product.material);
        const uniqueMaterials = [...new Set(allMaterials)]; 
        
        // const allPrices = action.payload.products.map((product) => product.price);
        // const findMinMaxPrice = [...new Set(allPrices)]; 
        // const minPrice = Math.min(...findMinMaxPrice);
        // const maxPrice = Math.max(...findMinMaxPrice);
        
        return {
          ...state,
          loading: false,
          pages: action.payload.pages,
          page: action.payload.page,
          products: action.payload.products,
          uniqueCategories: uniqueCategories,
          uniqueColors: uniqueColors,
          uniqueSizes: uniqueSizes,
          uniqueSleeveLengths: uniqueSleeveLengths,
          uniqueDressTypes: uniqueDressTypes,
          uniqueDressStyles: uniqueDressStyles,
          uniquePatternTypes: uniquePatternTypes,
          uniqueDressLengths: uniqueDressLengths,
          uniqueMaterials: uniqueMaterials,
          // minPrice,
          // maxPrice,
          filteredProducts: action.payload.products,
        };
        case LOCAL_PRODUCT_FILTER:
      return {
        ...state,
        filteredProducts: action.payload.filteredProducts,
      };
      case PRODUCT_LIST_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

// PRODUCT LIST
// export const productListReducer = (state = { products:[]}, action)=>{
//     switch (action.type) {
//         case PRODUCT_LIST_REQUEST:
//             return {loading: true, products: []};
//         case PRODUCT_LIST_SUCCESS:
//             return {
//                 loading: false, 
//                 pages: action.payload.pages,
//                 page: action.payload.page,
//                 products: action.payload.products};    
//         case PRODUCT_LIST_FAIL:
//             return {loading: false, error: action.payload}
//         default:
//             return state;
//     }
// };

// SINGLE PRODUCT 
export const productDetailsReducer = (state = { product:{reviews:[]}}, action)=>{
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {...state, loading: true};
        case PRODUCT_DETAILS_SUCCESS:
            return {loading: false, product: action.payload};    
        case PRODUCT_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
};

// PRODUCT REVIEW CREATE
export const productCreateReviewReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_CREATE_REVIEW_REQUEST:
        return { loading: true };
      case PRODUCT_CREATE_REVIEW_SUCCESS:
        return { loading: false, success: true };
      case PRODUCT_CREATE_REVIEW_FAIL:
        return { loading: false, error: action.payload };
      case PRODUCT_CREATE_REVIEW_RESET:
        return {};
      default:
        return state;
    }
  };