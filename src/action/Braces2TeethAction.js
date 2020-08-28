import {
    BRACES2TEETH_UPLOADED_IMAGE_ACTION,
    BRACES2TEETH_SELECTED_MODEL_ACTION,
} from "../constant/index.js"

export function postImage(image) {
    return {
        type: BRACES2TEETH_UPLOADED_IMAGE_ACTION,
        payload: {
            image: image
        },
    }
}

export const postSelectedModel = (selectedModel) => {
    console.log(selectedModel)
    return {
        type: BRACES2TEETH_SELECTED_MODEL_ACTION,
        payload: {
            selectedModel: selectedModel
        },
    }
}