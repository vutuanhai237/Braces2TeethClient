import {
    BRACES2TEETH_UPLOADED_IMAGE_ACTION,
    BRACES2TEETH_SELECTED_MODEL_ACTION,
} from "../constant/index"

const initialState = {
    uploadedImage: null,
    selectedModel: "",
};

function Braces2TeethReducer(state = initialState, action) {
    switch (action.type) {
        case BRACES2TEETH_UPLOADED_IMAGE_ACTION:
            return { ...state, uploadedImage: action.payload.uploadedImage }
        case BRACES2TEETH_SELECTED_MODEL_ACTION:
            return { ...state, selectedModel: action.payload.selectedModel }
        default:
            return state;
    }
}

export default Braces2TeethReducer;
