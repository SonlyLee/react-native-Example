import ActionTypes from './../actionTypes';

export const shareReducer = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.SHARE:
            return !state;
        default: return state;
    }
}

export const rightOpenReducer = (state={}, action) => {
    switch (action.type) {
        case ActionTypes.RIGHTOPEN:
            return !state;
        default: return state;
    }
}

export const leftOpenReducer = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.LEFTOPEN:
            return !state;
        default: return state;
    }
}

export const directionReducer = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.DIRECTION:
            return state = !state;
        default: return state;
    }
}

export const collectionsReducer = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.COLLECTIONS_PUSH:
            return [...state,action.data];    //增加选中的文章的作者，时间，title
        case ActionTypes.COLLECTIONS_CANCLE:
            return state.slice(0, state.length - 1)
        default: return state;
    }
}

export const requestResultReducer = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.REQUEST_API_RESULT:
            return action.result; //通过中间件请求api，返回的结果赋值给title,author,datetime,total,listContent
        default: return state;
    }
}