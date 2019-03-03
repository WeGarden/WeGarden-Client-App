const API_SERVER_URL = "http://sequel-wegarden.lille.inria.fr";
const LOGIN_PATH = "/api/auth/signin";
const SIGNUP_PATH = "/api/auth/signup";


export default class ApiCalls {


    static authentificateUser (username, password, abortSignal, callback200, callback401,callbackOtherError) {
        return fetch(API_SERVER_URL + LOGIN_PATH, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usernameOrEmail: username,
                password: password
            })
        }).then((res) => {
                res.json().then(resJson => {
                    if(res.status === 401){
                        callback401(resJson);
                    }else if(res.status === 200){
                        callback200(resJson);
                    }else{
                        callbackOtherError(resJson);
                    }
                });
            }
        ).catch((error) => {
            callbackOtherError(error);
        })
    }


    static signup(username,password,email,
                  callback200,
                  alreadyUsedMail,
                  alreadyUsedUsername,
                  callback400,
                  callbackOtherError){
        return fetch(API_SERVER_URL + SIGNUP_PATH, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        }).then((res) => {
                res.json().then(resJson => {
                    if(res.status === 400){
                        if(resJson.status === 1) {
                            //already used username
                            alreadyUsedMail();
                        }else if(resJson.status === 2){
                            //already used mail
                            alreadyUsedUsername();
                        }else {
                            callback400(resJson);
                        }
                    }else if(res.status === 200 || res.status === 201){
                        callback200(resJson);

                    }else{
                        callbackOtherError(resJson);

                    }
                });
            }
        ).catch((error) => {
            callbackOtherError(error)
        })
    }

}