import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => axios.get(baseUrl).then((res) => res.data);

const add = (newNumber) => {
  return axios.post(baseUrl, newNumber).then((res) => res.data);
};

const remove = (id) => {
  console.log(id);
  return axios.delete(`${baseUrl}/${id}`).then((res) => res.data);
};

export default {
  getAll,
  add,
  remove,
};
