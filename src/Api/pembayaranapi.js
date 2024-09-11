import axios from 'axios';

const API_URL = 'http://localhost:3000/api/pembayaran';

export const getTotalSetoran = async (year, token) => {
  try {
    const response = await axios.get(`${API_URL}/total-setoran/${year}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getSummarySetoranByYear = async (year, token) => {
  try {
    const response = await axios.get(`${API_URL}/summary/${year}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createPembayaran = async (data, token) => {
  try {
    const response = await axios.post(`${API_URL}/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updatePembayaran = async (id, data, token) => {
  try {
    const response = await axios.put(`${API_URL}/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const exportExcel = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/export`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'rekapitulasi.xlsx');
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    throw error.response.data;
  }
};
