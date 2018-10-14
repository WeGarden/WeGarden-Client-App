const API_URL = "http://172.20.10.2:8080";

export default class ApiCalls {


    static authentificateUser (username, password, callback200, callback401,callbackOtherError) {
        fetch(API_URL + "/api/auth/signin", {
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

}