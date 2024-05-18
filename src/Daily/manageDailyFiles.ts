import { TAbstractFile, TFile, TFolder, Vault } from "obsidian";


//? Returns an array containing all daily files in the daily folder as TAbstractFile object
export function getDailyFiles(vault: Vault, dailyFolderPath: string): TAbstractFile[] | null{
    //! Uses daily folder path

    let dailyFolder: TFolder | null = vault.getFolderByPath(dailyFolderPath);

    if (!dailyFolder){
        return null;
    }

    let dailyNotes: TAbstractFile[] = dailyFolder.children;

    return dailyNotes;
}


export async function getDailyTemplateContent(vault: Vault, dailyTemplateFilePath: string): Promise<string | null>{
    let dailyTemplateFile: TFile | null = vault.getFileByPath(dailyTemplateFilePath);

    if (!dailyTemplateFile){
        console.error(`Error finding daily template file at ${dailyTemplateFilePath}`);
        return Promise.resolve(null);
    }
    
    try {
        let dailyTemplateContent: string = await vault.read(dailyTemplateFile);
        return dailyTemplateContent;

    } catch (error) {
        console.error(`Error reading daily file template: ${error}`);
        return null;
    }

}


//? Create todays daily note from template
export function createTodaysDailyNote(vault: Vault, dailyFolderPath: string, dailyTemplateContent: string): number {
    let todayDateString = dateToString(new Date());
    let todayDailyNoteFilePath = `${dailyFolderPath}/${todayDateString}.md`

    console.log(`Creating daily note: ${todayDailyNoteFilePath}`);
    vault.create(todayDailyNoteFilePath, dailyTemplateContent);
    return 1;
}


//? Returns todays daily file as TFile object
//? Returns null if todays file is not a TFile object
export function getTodaysDailyFile(vault: Vault, dailyFolderPath: string): TFile | null{
    //! Uses daily folder path

    //? Path von "const files = this.app.vault.getMarkdownFiles()":
    //? Main/Daily/26-03-2024.md

    //? Path to daily folder:
    //? Main/Daily/

    let todaysDateString: string = dateToString(new Date());
    let todayDateFilePathString: string = `${dailyFolderPath}/${todaysDateString}.md`

    let todayDailyFile: TFile | null = vault.getFileByPath(todayDateFilePathString)

    if (todayDailyFile instanceof TFile) {
        return todayDailyFile as TFile;
    }

    return null;
}


//? Returns the last created daily file as TFile object
//? Returns null if there was an error getting the file using the created path
export function getPreviousDailyFile(vault: Vault, dailyNotes: TAbstractFile[], dailyFolderPath: string): TFile | null{
    const todayDate: Date = new Date();

    let dailyNotesDates: Date[] = dailyNotes
        .map((element) => stringToDate(element.name))                   //? Convert every file to date 
        .filter((date): date is Date => date !== null)                  //? Filter null elements
        .sort((a, b) => (a as Date).getTime() - (b as Date).getTime())  //? Sort all remaining elements by time
        .reverse();                                                     //? Reverse the list to have the newest elment on top

            
    let previousFileString: string = dateToString(dailyNotesDates[0]);

    if (previousFileString == dateToString(todayDate)){
        previousFileString = dateToString(dailyNotesDates[1]);
    }

    let previousFilePath: string = `${dailyFolderPath}/${previousFileString}.md`;
    let previousFile: TFile | null = vault.getFileByPath(previousFilePath);

    if (!previousFile){
        return null;
    }

    return previousFile;
}


//? No usage, using the sorting version
//? Its still here to maybe perform time meassures
export function getPreviousDailyFileComp(vault: Vault, dailyNotes: TAbstractFile[]): TAbstractFile | null{
    //? Returns the last daily file besides todays daily file

    const todayDate: Date = new Date();
    let previousFile: TAbstractFile | null = null;
    let smallestDifference: number = Infinity;

    for(const dailyFile of dailyNotes){
        let currentDailyNoteDate: Date | null = stringToDate(dailyFile.name);
        if (!currentDailyNoteDate){
            continue;
        }

        //? Check if current file is todays note, skip if yes
        // if (currentDailyNoteDate == )

        const difference: number = Math.abs(currentDailyNoteDate.getTime() - todayDate.getTime());

        if (difference < smallestDifference){
            smallestDifference = difference;
            previousFile = dailyFile;
        }
    }

    return previousFile;
}


//? Converts a string in the right format into a Date object
//? The string has to be in a specific format
function stringToDate(string: string): Date | null{
    //! Used date pattern
    const datePattern = /^(\d{2})-(\d{2})-(\d{4})\.md$/;
    const match = string.match(datePattern);

    if (match) {
        const day = parseInt(match[1], 10);
        const month = parseInt(match[2], 10) - 1;
        const year = parseInt(match[3], 10);

        return new Date(year, month, day);
    }

    return null;
}


//? Converts a Date object into a string
//? The string will be in a specific format
function dateToString(date: Date): string{
    //! Used date pattern
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();

    const currentDate = `${dd}-${mm}-${yyyy}`;

    return currentDate;
}