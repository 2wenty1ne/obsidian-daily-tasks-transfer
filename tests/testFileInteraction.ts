import * as fs from 'fs';
import path, { join } from 'path';
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


export function writeTestFile(contentToWrite: any, counter: number) {
    let fileType: string;
    let fileContent: string = contentToWrite;

    if ('type' in contentToWrite && contentToWrite.type == 'NoteContent') {
        fileType = ".json";
        fileContent = JSON.stringify(contentToWrite, null, 2);
    }
    else {
        fileType = ".string";
    }

    const fileName: string = `${counter}-createdNote${fileType}`;
    const savePath: string = path.join(__dirname, "creationDestination", fileName);

    console.log(counter, " - Content: ", fileContent)
    fs.writeFileSync(savePath, fileContent, 'utf8');
}