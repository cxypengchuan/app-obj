import {getToken} from "./stora";
import jwt from "jsonwebtoken"
import {base64} from "./crypto";

//获取jwttoken
export const jwtToken = () => {
  let session = getSeesion();
  let token = jwt.sign(session, base64.en(process.env.VUE_APP_JWT_KEY), {expiresIn: 5 * 60, algorithm: 'HS256', notBefore: -5 * 60});
  return token;
};


const getSeesion = () => {
  let data = jwt.decode(getToken());
  if (data) {
    return {"data": data.data};
  }
  return null;
};
