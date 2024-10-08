import { Notice, TAbstractFile, TFile, Vault } from "obsidian";
import { getDailyFiles, getTodaysDailyFile, getPreviousDailyFile, createTodaysDailyNote, checkTodaysNote, addPreviousContentToDaily } from "./manageDailyFiles";
import { NoteContent, readNote } from "./dailyTransferUtils";
import { dailyFolderPath, dailyTemplateFilePath } from "./dailyGlobalFilePathStorage";
import { extractTasksFromPreviousDaily } from "./dailyStringToNoteContent";
import { writeTestFile } from "tests/testFileInteraction";


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

    //? --Add previous note content to daily note--

    let previousTasks: NoteContent = extractTasksFromPreviousDaily(previousDailyContent);

    let currentDailyNoteContent: string | null = await readNote(vault, undefined, todaysDailyFile);

    if (!currentDailyNoteContent){
        new Notice("Error getting todays daily note content");
        return;
    }

    let newDailyContent: string = addPreviousContentToDaily(currentDailyNoteContent, previousTasks);


    let awaiting = await vault.modify(todaysDailyFile, newDailyContent);

    new Notice("Transfered!");
}
