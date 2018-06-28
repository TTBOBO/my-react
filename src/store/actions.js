import * as type from './actionType';

export function login (status,params){
    // console.log({ type:type.LOGIN,status})
    return { type:type.LOGIN,status,params};
}

export function get_channel (status,params){
    // console.log({ type:type.LOGIN,status})
    return { type:type.GETCHANNEL,status,params};
}