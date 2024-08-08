import { Notice, TAbstractFile, TFile, TFolder, Vault } from "obsidian";
import { addPreviousContentToDaily, getDailyFiles, getPreviousDailyFile } from "src/Daily/manageDailyFiles";
import { dateToString, NoteContent, readNote } from "src/Daily/dailyTransferUtils";
import { dailyFolderPath, dailyTemplateFilePath } from "src/Daily/dailyGlobalFilePathStorage";
import { extractTasksFromPreviousDaily } from "src/Daily/dailyStringToNoteContent";


//? Folder to a daily test note
const dailyTestFolderPath: string = "Main/Archive/Test";
const dailyTestFileName: string = "dailyTestNote.md";


export async function transferDailyTestContent(vault: Vault){

    //? --Get previous daily note--
    
    //? Get all daily notes
    let dailyNotes: TFile[] | null = getDailyFiles(vault, dailyFolderPath);

    if (!dailyNotes){
        new Notice("Error retrieving daily note folder");
        return;
    }


    //? Get previous note file
    let previousDailyFile: TFile | null = getPreviousDailyFile(vault, dailyNotes, dailyFolderPath);
    if (!previousDailyFile){
        new Notice("Error retrieving previous daily note");
        return;
    }
    
    //? Read previous note file
    let previousDailyContent: string | null = await readNote(vault, undefined, previousDailyFile);
    if(!previousDailyContent){
        new Notice("Error reading previous daily note");
        return;
    }

    //? Get test file
    let todaysDailyTestFiles: TFile[] | null = getDailyTestNote(vault);
    if(!todaysDailyTestFiles) {
        new Notice("Error getting test note")
        return;
    }

    let todaysDailyTestFile: TFile | null;

    //? Check if test file exists
    if (todaysDailyTestFiles.length == 0) {
        //? Get daily template content
        let dailyTemplateContent: string | null = await readNote(vault, dailyTemplateFilePath);

        if (!dailyTemplateContent){
            new Notice("Error retrieving daily note template");
            return;
        }
        todaysDailyTestFile = await createTodaysDailyNote(vault, dailyTemplateContent)
    }
    else {
        todaysDailyTestFile = todaysDailyTestFiles[0]
    }

    if(!todaysDailyTestFile){
        new Notice("Error creating or setting test daily Note")
        return;
    }

    //? Get the last notes content in the NoteContent format
    let previousTasks: NoteContent = extractTasksFromPreviousDaily(previousDailyContent);

    console.log(previousTasks)

    //? Get the content of the test note
    let currentDailyTestNoteContent: string | null = await readNote(vault, undefined, todaysDailyTestFile);

    if (!currentDailyTestNoteContent){
        new Notice("Error getting todays daily test note content");
        return;
    }

    //? Add the tasks from previous daily note to test note
    let newDailyTestContent: string = addPreviousContentToDaily(currentDailyTestNoteContent, previousTasks);

    //? Modify the test note
    let awaiting = await vault.modify(todaysDailyTestFile, newDailyTestContent);

}

function getDailyTestNote(vault: Vault): TFile[] | null {
    let dailyTestFolder: TFolder | null = vault.getFolderByPath(dailyTestFolderPath);

    if (!dailyTestFolder){
        return null;
    }
    
    let dailyTestNotesAbst: TAbstractFile[] = dailyTestFolder.children;
    let dailyTestNote: TFile[] | null = [];


    for (const file of dailyTestNotesAbst){
        if (file instanceof TFile){
            dailyTestNote.push(file);
        }
    }

    return dailyTestNote;
}

//? Create todays daily note from template
async function createTodaysDailyNote(vault: Vault, dailyTemplateContent: string): Promise<TFile | null> {
    let todayDailyNoteFilePath = `${dailyTestFolderPath}/${dailyTestFileName}`;

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
