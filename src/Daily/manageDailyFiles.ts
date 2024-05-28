import { TAbstractFile, TFile, TFolder, Vault } from "obsidian";
import { NoteContent, dateToString, stringToDate } from "./dailyTransferUtils";


//? Returns an array containing all daily files in the daily folder as TFile objects
export function getDailyFiles(vault: Vault, dailyFolderPath: string): TFile[] | null{
    //! Uses daily folder path

    let dailyFolder: TFolder | null = vault.getFolderByPath(dailyFolderPath);

    if (!dailyFolder){
        return null;
    }

    let dailyNotesAbst: TAbstractFile[] = dailyFolder.children;
    let dailyNotes: TFile[] = [];
    // let dailyNotesAbst: TFile[] = dailyFolder.children.filter(element => element instanceof TFile);
    // let dailyNotes: TFile[] = dailyNotesAbst.filter(element => element instanceof TFile);

    for (const file of dailyNotesAbst){
        if (file instanceof TFile){
            dailyNotes.push(file);
        }
    }

    return dailyNotes;
}


//? Returns true, if daily file already exists
//? Returns false, if not
export function checkTodaysNote(dailyNotes: TFile[]): boolean{
    let today = dateToString(new Date());

    for (const file of dailyNotes) {
        if (file.basename == today){
            return true;
        }
    }
    return false;
}


//? Create todays daily note from template
export async function createTodaysDailyNote(vault: Vault, dailyFolderPath: string, dailyTemplateContent: string): Promise<TFile | null> {
    let todayDateString = dateToString(new Date());
    let todayDailyNoteFilePath = `${dailyFolderPath}/${todayDateString}.md`

    //? Create file
    try{
        let createdFile: TFile = await vault.create(todayDailyNoteFilePath, dailyTemplateContent);
        return createdFile;
    }
    catch (error){
        console.error(`Error creating daily file, path: ${todayDailyNoteFilePath}`);
        return Promise.resolve(null);
    }
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
        if (line.startsWith('#')) {
            currentHeader = line.replace('#', '').trim();
            
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


export function addPreviousContentToDaily(dailyContent: string, previousContent: NoteContent): string{
    let allPreviousHeaders: string[] = Object.keys(previousContent.headers);
    
    const lines = dailyContent.split('\n');

    let inProperties = false;
    let gotProperties = false;
    let currentHeader: string = "topText";

    //? Add properties
    let newDailyText: string = `${previousContent.properties}`;

    for (let i = 0; i < lines.length; i++){
        let line: string = lines[i];

        //? Skip properties
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
            continue;
        }

        if (line.startsWith('#')) {
            let previousHeaderContentArr: string[] = previousContent.headers[currentHeader];
            let previousHeaderContent = previousHeaderContentArr.join('');

            newDailyText = newDailyText.concat(previousHeaderContent)

            let nextHeader: string = line.replace('#', '').trim();

            if (allPreviousHeaders.includes(nextHeader)){
                currentHeader = nextHeader;
            }
        }
        
        let concatString: string;
        if (line == ""){
            concatString = line;
        }
        else {
            concatString = line + "\n"
        }

        newDailyText = newDailyText.concat(concatString);
    }

    return newDailyText;
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