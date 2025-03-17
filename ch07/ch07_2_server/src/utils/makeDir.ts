import fs from 'fs'

export const makeDir = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
  }
}
