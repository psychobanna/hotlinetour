// @flow
import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export class Services{
    
    constructor(){
        
    }

    // BaseUrl = "https://sagartour09.in/api/";
    BaseUrl = "localhost/api/";


    
    GetCheckToken = async (props) => {

        let token = localStorage.getItem("secure-token");

        if(token == null){
            window.location.href = "/login";
        }

        let axiosConfig = {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*",
                "token": token
            }
        };

        return await axios.post(this.BaseUrl+"api/checktokenstatus", axiosConfig).then((resp)=>{
            console.log(resp);
        }).catch((resp)=>{
            console.log(resp);
        });
    }
    
    PostMethod = async (url, data) => {
        
        let axiosConfig = {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*"          
            }
        };

        return await axios.post(this.BaseUrl+url, data, axiosConfig).then((resp)=>{
            return resp;
        }).catch((resp)=>{
            return resp;
        });
    }
    
    PostAuthMethod = async (url, data) => {
        
        let axiosConfig = {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*",
                "token":localStorage.getItem("secure-token")      
            }
        };

        return await axios.post(this.BaseUrl+url, data, axiosConfig).then((resp)=>{
            return resp;
        }).catch((resp)=>{
            return resp;
        });
    }
    
    GetMethod = async (url) => {
        
        let axiosConfig = {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*"          
            }
        };

        return await axios.get(this.BaseUrl+url, axiosConfig).then((resp)=>{
            return resp;
        }).catch((resp)=>{
            return resp;
        });
    }

    GetAuthMethod = async (url) => {
        
        let axiosConfig = {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*",
                "token":localStorage.getItem("secure-token")     
            }
        };

        return await axios.get(this.BaseUrl+url, axiosConfig).then((resp)=>{
            return resp;
        }).catch((resp)=>{
            return resp;
        });
    }

    DeleteAuthMethod = async (url,id) => {
        
        let axiosConfig = {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*",
                "token":localStorage.getItem("secure-token")     
            }
        };

        return await axios.delete(this.BaseUrl+url+"/"+id, axiosConfig).then((resp)=>{
            return resp;
        }).catch((resp)=>{
            return resp;
        });
    }
};