import * as fs from 'fs';
import { join } from 'path';
import { NoteContent} from "src/Daily/dailyTransferUtils";


export function readTestFile<T = string>(fileDirectory: string, fileName: string): T {
    let fileType: undefined | string = fileName.split('.').pop()
    console.log("FileName: ", fileName, "\nFile Type: ", fileType)
    if (!(fileType)){
        fileType = "txt"
    }

    let filePath = join(fileDirectory, fileName);

    let fileContent: string = fs.readFileSync(filePath, 'utf8')
    
    if (fileType == 'json') {
        return JSON.parse(fileContent) as T;
    }

    return fileContent as unknown as T;
}

// export function writeTestFile<T>(contentToWrite: T) {
//     if (typeof contentToWrite === "NoteContent")
//         amogus: NoteContent;
// }