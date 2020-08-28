import {
    postImage,
    postSelectedModel,
} from '../action/Braces2TeethAction';
export const setImageAPI = (image) => {
    return dispatch => {
        dispatch(postImage(image));
    }
}
export function SetSelectedModelAPI(props) {
    
    return dispatch => {
        
        dispatch(postSelectedModel(props));
    }
}

