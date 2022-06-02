import axios from 'axios';



export const post = () => {
    let email = body(email);
    let password = body(password);

    
    const submitlogin = async () => {
        axios({
            method: 'post',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            withCredentials: true, 
            url: 'http://localhost:8080/auth/api/login',
            auth: {
            email: email,
            password: password
        } 
    }); if (response.statusCode === 200) {
        //create cokkie
        return {
            status: 200,
            body: 'success',
            headers: { 'set-cookie': 'session=${session?.user/.email}' }
            
        }
    } else {
        //send error
    }
}}
