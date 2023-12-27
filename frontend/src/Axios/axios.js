import axios from 'axios';
const instance = axios.create({
	baseURL: `http://${process.env.BACKEND_HOST || 'localhost'}:8000/api`,
});
export default instance;
