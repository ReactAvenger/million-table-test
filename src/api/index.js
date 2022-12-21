import axios from 'axios';

const getTableData = async () => {
  try {
    const response = await axios.get('https://api.publicapis.org/entries');
    console.log(response.data.entries);
    return response.data.entries;
  } catch (error) {
    console.error(error);
  }
};

export default getTableData;
