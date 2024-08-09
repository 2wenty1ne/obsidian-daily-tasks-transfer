import { TFile, Vault } from "obsidian";


//? Format in which the content of a file is saved
export interface NoteContent {
    type: 'NoteContent';
    properties: string;
    headers: {
        [key: string]: string[]
    }
}


//? Returns the content of a note at a given path
//? Returns null, if there is an error finding or reading the file
export async function readNote(vault:Vault, fileToReadPath?: string, fileToRead?: TFile): Promise<string | null> {
    let file: TFile | null;

    //? If a path is given
    if (fileToReadPath){
        file = vault.getFileByPath(fileToReadPath);
    
        if(!file){
            console.error(`Error finding file, path: ${fileToReadPath}`);
            return Promise.resolve(null);
        }
    } 
    //? If a file is given
    else {
        if (!fileToRead){
            console.error(`Provide either a file or a path to read`);
            return Promise.resolve(null);
        }

        file = fileToRead;
    }

    //? Read file
    try{
        let fileContent: string = await vault.read(file);
        return fileContent;
    }
    catch (error){
        console.error(`Error reading file, path: ${fileToReadPath}, error: ${error}`);
        return null;
    }
}


//? Converts a string in the right format into a Date object
//? The string has to be in a specific format
export function stringToDate(string: string): Date | null{
    //! Used date pattern
    const datePattern = /^(\d{2})-(\d{2})-(\d{4})\.md$/;
    const match = string.match(datePattern);

    if (match) {
        const day = parseInt(match[1], 10);
        const month = parseInt(match[2], 10) - 1;
        const year = parseInt(match[3], 10);

        return new Date(year, month, day);
    }

    console.error(`Unsupported format for ${string}`);
    return null;
}


//? Converts a Date object into a string
//? The string will be in a specific format
export function dateToString(date: Date): string{
    //! Used date pattern
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();

    const currentDate = `${dd}-${mm}-${yyyy}`;

    return currentDate;
}