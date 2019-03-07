const API_SERVER_URL = "http://sequel-wegarden.lille.inria.fr";
const LOGIN_PATH = "/api/auth/signin";
const SIGNUP_PATH = "/api/auth/signup";

import {AsyncStorage} from "react-native";

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

    static async getGardenList(on200, on401, onErr) {
        let token = await AsyncStorage.getItem("userToken");
        if (!token) on401();
        else
            return fetch(API_SERVER_URL + '/api/gardens', {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then((response) => {
                    if (response.status === 401)
                        on401();
                    else if (response.status === 200)
                        response.json().then(on200);
                    else {
                        console.log(response);
                        onErr()
                    }
                }).catch((error) => {
                    console.log(error);
                    onErr();
                });
    }

     static async createGarden(data, on200, on401, onErr) {
        let userId = await AsyncStorage.getItem("userId");
        let token = await AsyncStorage.getItem("userToken");

        console.log(JSON.stringify({...data,userId}));
         if (!token) on401();
        else
            return fetch(API_SERVER_URL + '/api/gardens', {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...data,userId:1}) //TODO change userId to var userId
            })
                .then((response) => {
                    if (response.status === 401)
                        on401();

                    else if (response.status === 201)
                        on200();
                    else {
                        console.log(response);
                        onErr();
                    }
                })
                .catch((error) => {
                    console.log(error);
                    onErr();
                });
        
    }

    static async getAreaList(gardenId, on200, on401, onErr) {
        let token = await AsyncStorage.getItem("userToken");
        if (!token) on401();
        else
            return fetch(API_SERVER_URL + '/api/gardens/'+gardenId+"/areas", {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then((response) => {
                    if (response.status === 401)
                        on401();
                    else if (response.status === 200)
                        response.json().then(on200);
                    else {
                        console.log(response);
                        onErr()
                    }
                }).catch((error) => {
                    console.log(error);
                    onErr();
                });
    }

    static async getPlantList(areaId, on200, on401, onErr) {
        let token = await AsyncStorage.getItem("userToken");
        if (!token) on401();
        else
            return fetch(API_SERVER_URL + '/api/areas/'+areaId+'/plants', {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then((response) => {
                    console.log(response);
                    if (response.status === 401)
                        on401();
                    else if (response.status === 200)
                        response.json().then(on200);
                    else {
                        console.log(response);
                        onErr()
                    }
                }).catch((error) => {
                    console.log(error);
                    onErr();
                });
    }

    static async createArea(gardenId, data, on200, on401, onErr) {

        let token = await AsyncStorage.getItem("userToken");

        if (!token) on401();
        else
            return fetch(API_SERVER_URL + '/api/gardens/'+gardenId+"/areas", {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then((response) => {
                    if (response.status === 401)
                        on401();

                    else if (response.status === 201)
                        on200();
                    else {
                        console.log(response);
                        onErr();
                    }
                })
                .catch((error) => {
                    console.log(error);
                    onErr();
                });
    }

    static async createPlant(areaId, data, on200, on401, onErr) {
        let token = await AsyncStorage.getItem("userToken");

        if (!token) on401();
        else
            return fetch(API_SERVER_URL + '/api/areas/'+areaId+"/plants", {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then((response) => {
                    if (response.status === 401)
                        on401();

                    else if (response.status === 201)
                        on200();
                    else {
                        console.log(response);
                        onErr();
                    }
                })
                .catch((error) => {
                    console.log(error);
                    onErr();
                });
    }

    static async getUserGardenList(userId, on200, on401, onErr) {
        let token = await AsyncStorage.getItem("userToken");
        if (!token) on401();
        else
            return fetch(API_SERVER_URL + '/api/gardens/user/'+userId, {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then((response) => {
                    if (response.status === 401)
                        on401();
                    else if (response.status === 200)
                        response.json().then(on200);
                    else {
                        console.log(response);
                        onErr()
                    }
                }).catch((error) => {
                    console.log(error);
                    onErr();
                });
    }
}