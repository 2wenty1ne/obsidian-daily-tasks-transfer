import * as fs from 'fs';
import dotenv from "dotenv";
import path, { join } from 'path';


export function getTestFolderPath(): string {
    dotenv.config()
    const testFilePath: string | undefined = process.env.TEST_FILES_PATH;

    console.log(`Path: ${testFilePath}`)

    if (!(testFilePath)) {
        throw new Error('Failed to get test file paths from .env in getTestFilePath for the test function wrapper.');
    }

    return testFilePath;
}

export function readTestFile<T = string>(fileDirectory: string, fileName: string): T {
    let fileType: undefined | string = fileName.split('.').pop()

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


export function writeTestFile(filepath: string, contentToWrite: any, counter: number) {
    console.log(`Path in writeTestFile: ${filepath}`)
    let fileType: string;
    let fileContent: string = contentToWrite;

    if ('type' in contentToWrite && contentToWrite.type == 'NoteContent') {
        fileType = ".json";
        fileContent = JSON.stringify(contentToWrite, null, 4);
    }
    else {
        fileType = ".txt";
    }

    const fileName: string = `${counter}-createdNote${fileType}`;
    const savePath: string = path.join(filepath, fileName);

    fs.writeFileSync(savePath, fileContent, 'utf8');
}