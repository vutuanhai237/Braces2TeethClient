import {
    postImage,
    postSelectedModel,
} from '../action/Braces2TeethAction';
export function setImage(image) {
    return dispatch => {
        dispatch(postImage(image));  
    }
}
export function setSelectedModel(selectedModel) {
    return dispatch => {
        dispatch(postSelectedModel(selectedModel));
    }
}