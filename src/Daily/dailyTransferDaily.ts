import { Notice, TAbstractFile, TFile, Vault } from "obsidian";
import { getDailyFiles, getTodaysDailyFile, getPreviousDailyFile, createTodaysDailyNote, extractTasksFromPreviousDaily } from "./manageDailyFiles";
import { readNote } from "./dailyTransferUtils";


//TODO Get values from settings
const dailyFolderPath: string = "Main/Daily";                                       //? Globally used path to daily folder 
const dailyTemplateFilePath: string = "Main/Archive/Templates/Dailes-Template.md"   //? Globally used daily template 


export async function transferDailyContent(vault: Vault){
    //? Get daily template content
    let dailyTemplateContent: string | null = await readNote(vault, dailyTemplateFilePath);

    if (!dailyTemplateContent){
        new Notice("Error retrieving daily note template");
        return;
    }


    //! TEST, later only if there is no daily file
    createTodaysDailyNote(vault, dailyFolderPath, dailyTemplateContent);


    //? Get todays daily note
    let todaysDailyFile: TFile | null = getTodaysDailyFile(vault, dailyFolderPath);

    if (!todaysDailyFile){
        new Notice("Error retrieving todays daily note");
        return;
    }


    //? Get previous daily note
    let dailyNotes: TAbstractFile[] | null = getDailyFiles(vault, dailyFolderPath);

    if (!dailyNotes){
        new Notice("Error retrieving daily note folder");
        return;
    }


    let previousDailyFile: TFile | null = getPreviousDailyFile(vault, dailyNotes, dailyFolderPath);
    if (!previousDailyFile){
        new Notice("Error retrieving previous daily note");
        return;
    }


    let previousDailyContent: string | null = await readNote(vault, undefined, previousDailyFile);
    if(!previousDailyContent){
        new Notice("Error reading previous daily note");
        return;
    }

    // console.log(previousDailyContent); //! TEST

    //! TEST
    //? Daily test note to develop task extraction
    let testDailyNotePath: string = "Notes/Obsidian daily test.md"
    let testDailyNoteContent: string | null = await readNote(vault, testDailyNotePath);
    
    if (!testDailyNoteContent){
        new Notice("Error reading test daily note");
        return;
    }

    extractTasksFromPreviousDaily(testDailyNoteContent)

    // extractTasksFromPreviousDaily(vault, previousDailyContent)

}
