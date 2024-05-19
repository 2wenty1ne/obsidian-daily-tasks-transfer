import { TAbstractFile, TFile, TFolder, Vault } from "obsidian";
import { NoteContent, dateToString, stringToDate } from "./dailyTransferUtils";


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

    let todaysDateString: string = dateToString(new Date());
    let todayDateFilePathString: string = `${dailyFolderPath}/${todaysDateString}.md`

    let todayDailyFile: TFile | null = vault.getFileByPath(todayDateFilePathString)

    if (todayDailyFile instanceof TFile) {
        return todayDailyFile as TFile;
    }

    return null;
}


//? Extracs every task and its corresponding header from the previous daily note
export function extractTasksFromPreviousDaily(previousDailyContent: string): NoteContent{

    const lines = previousDailyContent.split('\n');
    let properties = '';
    let inProperties = false;
    let gotProperties = false;

    let currentHeader: string = "topText";
    let headers: { [key: string]: string[]} = {"topText": []};


    let line: string;
    for (line of lines){

        //? Extract properties from properties
        if (!gotProperties) {
            if (line.startsWith('---')) {
                if (!inProperties) {
                    //? Start of properties
                    inProperties = true;
                }
                else {
                    //? End of properties
                    gotProperties = true;
                    inProperties = false;
                }
            }
            properties += line + '\n';
            continue;
        }

        //? Detect new header
        if (line.startsWith('##')) {
            currentHeader = line.replace('##', '').trim();
            
            if (!headers[currentHeader]){
                headers[currentHeader] = [];
            }
        }
        else {
            //? Skip done tasks
            if (line.startsWith("- [x]")){
                continue;
            }
            //? Add task to current header
            headers[currentHeader].push(line + '\n');
        }
    }

    return {properties, headers};
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