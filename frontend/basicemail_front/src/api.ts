import axios from 'axios';

/*export const getEmails = (currentUser: string) => {
    return axios.get('http://localhost:8000/api/recieve-email/' + currentUser,  {withCredentials: true});
}

export const postEmail = (subject: string, email: string, body: string) => {
    console.log({ "recipient_email": email, "subject": subject, "body": body })
    return axios.post('http://localhost:8000/api/send-email/', { "recipient_email": email, "subject": subject, "body": body },  {withCredentials: true});
}

export const getUser = (email: string, password: string) => {
    return axios.post('http://localhost:8000/api/login/', { "email": email, "password": password }, {withCredentials: true});
}

export const postUser = (name: string, email: string, password: string, photo_profile:string) => {
    return axios.post('http://localhost:8000/api/register/', { "name": name, "email": email, "password": password, "photo_profile": photo_profile}, {withCredentials: true});
}*/

export const getEmails = (currentUser: string) => {
    return axios.get('http://18.231.121.164:8000/api/recieve-email/' + currentUser,  {withCredentials: true});
}

export const postEmail = (subject: string, email: string, body: string) => {
    console.log({ "recipient_email": email, "subject": subject, "body": body })
    return axios.post('http://18.231.121.164:8000/api/send-email/', { "recipient_email": email, "subject": subject, "body": body },  {withCredentials: true});
}

export const getUser = (email: string, password: string) => {
    return axios.post('http://18.231.121.164:8000/api/login/', { "email": email, "password": password }, {withCredentials: true});
}

export const postUser = (name: string, email: string, password: string, photo_profile:string) => {
    return axios.post('http://18.231.121.164:8000/api/register/', { "name": name, "email": email, "password": password, "photo_profile": photo_profile}, {withCredentials: true});
}

export const getPicture = () => {
    const picturesList = axios.get('https://picsum.photos/v2/list') ;
    return picturesList;
}