/**
 *  获取webSocket
 * @author leisong
 * @date 2019/3/20 16:16
 **/
export const getWebSocket = (url) => {
  return new WebSocket(process.env.VUE_APP_SOCKET_URL + url);
};
