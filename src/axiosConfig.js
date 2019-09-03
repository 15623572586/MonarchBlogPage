import axios from 'axios'

const fetch = (method, url, formData) => {
  let httpDefault = {
    method: method,
    baseURL: 'http://localhost:8080/',
    url: url,
    // `params` 是即将与请求一起发送的 URL 参数
    // `data` 是作为请求主体被发送的数据
    params: method === 'GET' || method === 'DELETE' ? formData : null,
    data: method === 'POST' || method === 'PUT' ? formData : null,
    timeout: 20000,
    withCredentials: true
}
  return new Promise((resolve, reject) => {
    axios(httpDefault).then(resData => {
      resolve(resData)
    })
    .catch(e => {
      console.log(e)
    })
  })
}

export default fetch