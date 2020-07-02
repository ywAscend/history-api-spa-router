import axios from 'axios'
export const BASE_PATH = '/API' 
export const PATH_URL = `/api/v3/tag/list?pid=0&apiver=2&plat=0`
export const URL = `${BASE_PATH}${PATH_URL}`

export const http = (url,page) => {
    return new Promise((reslove,reject) => {
        axios.get(url)
        .then( res => {
            let data = res.data.data.info[page]
            reslove(data)
        })
        .catch(err => {
            reject(err)
        })
    })
}