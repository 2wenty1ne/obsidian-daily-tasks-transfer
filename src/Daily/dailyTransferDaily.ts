import { Notice, TAbstractFile, TFile, Vault } from "obsidian";
import { getDailyFiles, getTodaysDailyFile, getPreviousDailyFileComp, getPreviousDailyFileSort } from "./manageDailyFiles";


const dailyFolderPath: string = "Main/Daily";


export function transferDailyContent(vault: Vault){
    //? Get todays daily note
    let todaysDailyFile: TFile | null = getTodaysDailyFile(vault, dailyFolderPath);

    if (!todaysDailyFile){
        new Notice("Error retrieving todays daily note");
        return;
    }
    new Notice("Got todays daily note"); //! TEST


    //TODO get last daily note
    //? Get previous daily note
    let dailyNotes: TAbstractFile[] | null = getDailyFiles(vault, dailyFolderPath);

    if (!dailyNotes){
        new Notice("Error retrieving daily note folder");
        return;
    }
    new Notice("Got daily folder"); //! TEST


    let previousDailyFile: TAbstractFile | null = getPreviousDailyFileComp(vault, dailyNotes);
    if (!previousDailyFile){
        new Notice("Error retrieving previous daily note");
        return;
    }

    new Notice("Got previous daily note"); //! TEST
    console.log(`Comp: Previous daily note: ${previousDailyFile.name}`)

    console.log(`Sort: Previous daily note: ${getPreviousDailyFileSort(vault, dailyNotes, dailyFolderPath).name}`);
}
