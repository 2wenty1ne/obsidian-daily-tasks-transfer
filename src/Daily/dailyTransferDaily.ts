import { Notice, TAbstractFile, TFile, Vault } from "obsidian";
import { getDailyFiles, getTodaysDailyFile, getPreviousDailyFile, createTodaysDailyNote, extractTasksFromPreviousDaily, checkTodaysNote } from "./manageDailyFiles";
import { NoteContent, readNote } from "./dailyTransferUtils";


//TODO Get values from settings
const dailyFolderPath: string = "Main/Daily";                                       //? Globally used path to daily folder 
const dailyTemplateFilePath: string = "Main/Archive/Templates/Dailes-Template.md"   //? Globally used daily template 


export async function transferDailyContent(vault: Vault){

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


    //? --Get daily note--
    let todaysDailyFile: TFile | null;

    //? Creates daily note, if it doenst exists
    if (!checkTodaysNote(dailyNotes)){
        //? Get daily template content
        let dailyTemplateContent: string | null = await readNote(vault, dailyTemplateFilePath);

        if (!dailyTemplateContent){
            new Notice("Error retrieving daily note template");
            return;
        }

        //? Create daily file
        todaysDailyFile = await createTodaysDailyNote(vault, dailyFolderPath, dailyTemplateContent);

        if (!todaysDailyFile){
            new Notice("Error creating daily note");
        }
    }

    //? Get daily note, if it already exists
    else {
        todaysDailyFile = getTodaysDailyFile(vault, dailyFolderPath);

        if (!todaysDailyFile){
            new Notice("Error retrieving todays daily note");
            return;
        }
    }

    if (!todaysDailyFile){
        return;
    }

    let currentDailyNoteContent: string | null = await readNote(vault, undefined, todaysDailyFile);




    //! TEST
    //? --Daily test note to develop task extraction--
    let testDailyNotePath: string = "Notes/Obsidian daily test.md"
    let testDailyNoteContent: string | null = await readNote(vault, testDailyNotePath);
    
    if (!testDailyNoteContent){
        new Notice("Error reading test daily note");
        return;
    }

    let previousTasks: NoteContent = extractTasksFromPreviousDaily(previousDailyContent);
    

    // extractTasksFromPreviousDaily(vault, previousDailyContent)

}
