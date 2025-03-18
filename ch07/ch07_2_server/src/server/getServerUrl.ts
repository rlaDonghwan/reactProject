export const getServerUrl = (path: string) => {
  const host = 'http://localhost4000'
  return [host, path].join('')
}
