import { saveAs } from 'file-saver'

const saveFile = (link: string, fileName: string) => {
  saveAs(`${process.env.SERVER_URL}${link}`, fileName)
}
export default saveFile
