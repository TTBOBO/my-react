import * as type from './actionType';

export function login (status,params){
    // console.log({ type:type.LOGIN,status})
    return { type:type.LOGIN,status,params};
}

export function get_channel (status,params){
    return { type:type.GETCHANNEL,status,params};
}

export function setpagelist (status,params){
   
    return { type:type.SETPAGELIST,status,params};
}

export function addpage(status,params){
    return { type:type.ADDPAGE,status,params};
}