const axios = require("axios");

const baseURL = "https://saj7.host.cs.st-andrews.ac.uk/gangs";

const API = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    }
  });

export default API;
