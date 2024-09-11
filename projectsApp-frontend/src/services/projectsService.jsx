import axios from 'axios';

const API_URL = 'http://localhost:3000/projects'; // Schimbă URL-ul cu cel al backend-ului tău

// Preia token-ul din localStorage
const getAuthToken = () => localStorage.getItem('token');

// Configurare Axios cu autentificare și tipuri de cerere
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}`,
  },
});

// Obține toate proiectele
export const getProjects = async () => {
  const response = await axiosInstance.get('/');
  return response.data;
};

// Creează un nou proiect
export const createProject = async (project) => {
  const response = await axiosInstance.post('/', project);
  return response.data;
};

// Șterge un proiect
export const deleteProject = async (id) => {
  await axiosInstance.delete(`/${id}`);
};

// Actualizează un proiect
export const updateProject = async (project) => {
  const response = await axiosInstance.put(`/${project.id}`, project);
  return response.data;
};
