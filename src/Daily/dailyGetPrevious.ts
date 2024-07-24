import { App, Notice, TFile, Vault } from "obsidian";
import { dailyFolderPath } from "./dailyGlobalFilePathStorage";
import { getDailyFiles, getPreviousDailyFile } from "./manageDailyFiles";


export async function getPreviousDaily(app: App) {
    let vault = app.vault;
    //? --Get previous daily note to open it in obisdian--
    
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

    //? Display previous note as current note
    await app.workspace.getLeaf().openFile(previousDailyFile);
}
