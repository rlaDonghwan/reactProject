import { getServerUrl } from './getServerUrl'

const postAndPut = (method: string) => (path: string, data: object) => {
  return fetch(getServerUrl(path), {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
  })
}

export const post = postAndPut('POST')
export const put = postAndPut('PUT')
