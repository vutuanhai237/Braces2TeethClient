import {
    BRACES2TEETH_POST_IMAGE_ACTION,
    BRACES2TEETH_SELECTED_MODEL_ACTION,
} from "../constant/index"

const initialState = {
    image: null,
    selectedModel: "",
};

function Braces2TeethReducer(state = initialState, action) {
    switch (action.type) {
        case BRACES2TEETH_POST_IMAGE_ACTION:
            return { ...state, image: action.payload.image }
        case BRACES2TEETH_SELECTED_MODEL_ACTION:
            return { ...state, model: action.payload.selectedModel }

        default:
            return state;
    }
}

export default Braces2TeethReducer;
