import ActionTypes from './actionTypes';
import Config from './../../config';
const videoPath = '/article/';

export const onSelectShare = () => {
    return {
        type: ActionTypes.SHARE
    }
}

export const onSelectRightOpen = () => {
    return {
        type: ActionTypes.RIGHTOPEN
    }
}

export const onSelectLeftOpen = () => {
    return {
        type: ActionTypes.LEFTOPEN
    }
}

export const onSelectDirection = () => {
    return {
        type: ActionTypes.DIRECTION
    }
}

export const onCollctionsPush = (data) => {
    return {
        type: ActionTypes.COLLECTIONS_PUSH,
        data
    }
}

export const onCollctionsCancle = ()=>{
    return {
        type: ActionTypes.COLLECTIONS_CANCLE
    }
}

export const onResult = (data) =>{
    return{
        type: ActionTypes.REQUEST_API_RESULT,
        result: data
    }
}

export const onRequestApiResult = (params) => {
    return function (dispatch) {
            fetch(Config.proxy + videoPath + params)
              .then(response => response.json())
              .then((responseJson) => {
                console.log(responseJson)
                //截取返回的HTML字符串
                var contentList = [];
                var positions = [];
                var dataBig = responseJson.data.content;
                var pos = dataBig.indexOf('<p>');
                var flag = true;
                while (pos > -1) {
                  positions.push(pos);
                  if (flag) {
                    pos = dataBig.indexOf('</p>', pos + 1);
                    flag = false
                  } else {
                    pos = dataBig.indexOf('<p>', pos + 1);
                    flag = true
                  }
                }
                var flags = true;
                for (var i = 0; i < positions.length - 1; i++) {
                  if (flags) {
                    contentList.push(dataBig.slice(positions[i] + 3, positions[i + 1]));
                    flags = false;
                  } else {
                    contentList.push(dataBig.slice(positions[i] + 7, positions[i + 2]));
                    flags = true;
                  }
                }
                var contentArr = [];
                contentList.forEach((element, index) => {
                  if (index === 0) {
                    contentArr.push(element);
                  }
                  if (index !== 0 && index % 2 !== 0) {
                    contentArr.push(element);
                  }
                })
                var data = {
                    title: responseJson.data.title,
                    author: responseJson.data.author,
                    total: responseJson.data.wc,
                    listContent: contentArr,
                    datetime: responseJson.data.date
                }
                dispatch(onResult(data))
              })
              .catch((error) => {
                console.log(error)
              })
          }
    
}