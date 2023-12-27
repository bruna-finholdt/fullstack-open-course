import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogPosts'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

//usando async await:
// const getAll = async () => {
//   const response = await axios.get(baseUrl);
//   return response.data;
// };

export default { getAll }