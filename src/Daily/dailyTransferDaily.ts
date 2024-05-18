import { Notice, TAbstractFile, TFile, Vault } from "obsidian";
import { getDailyFiles, getTodaysDailyFile, getPreviousDailyFile, getDailyTemplateContent, createTodaysDailyNote } from "./manageDailyFiles";


//TODO Get values from settings
const dailyFolderPath: string = "Main/Daily";                                       //? Globally used path to daily folder 
const dailyTemplateFilePath: string = "Main/Archive/Templates/Dailes-Template.md"   //? Globally used daily template 


export async function transferDailyContent(vault: Vault){
    //? Get daily template content
    let dailyTemplateContent: string | null = await getDailyTemplateContent(vault, dailyTemplateFilePath);

    if (!dailyTemplateContent){
        new Notice("Error retrieving daily note template");
        return;
    }
    new Notice("Got daily template!") //! TEST

    //! TEST, later only if there is no daily file
    createTodaysDailyNote(vault, dailyFolderPath, dailyTemplateContent);


    //? Get todays daily note
    let todaysDailyFile: TFile | null = getTodaysDailyFile(vault, dailyFolderPath);

    if (!todaysDailyFile){
        new Notice("Error retrieving todays daily note");
        return;
    }
    new Notice("Got todays daily note"); //! TEST


    //? Get previous daily note
    let dailyNotes: TAbstractFile[] | null = getDailyFiles(vault, dailyFolderPath);

    if (!dailyNotes){
        new Notice("Error retrieving daily note folder");
        return;
    }
    new Notice("Got daily folder"); //! TEST


    let previousDailyFile: TAbstractFile | null = getPreviousDailyFile(vault, dailyNotes, dailyFolderPath);
    if (!previousDailyFile){
        new Notice("Error retrieving previous daily note");
        return;
    }

    new Notice("Got previous daily note"); //! TEST
}
