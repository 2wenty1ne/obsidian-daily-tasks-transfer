import { TFile } from "obsidian";

export function getDailyFiles(daliesPath: String): void{

    const fs = require('fs');
    fs.readdir(daliesPath, (err: any, files: { array: any[]; }) => {
        files.array.forEach(file => {
            console.log(`Type: ${typeof(file)}: ${file}`)
        });
    })
}
export function removeTagFromNote(noteContent: string){
    const taskRemovalRegex = //;
}


export function getTodaysDailyFile(vault: any): any{
    //? Path von "const files = this.app.vault.getMarkdownFiles()":
    //? Main/Daily/26-03-2024.md

    //? Path to daily folder:
    //? Main/Daily/

    let dailyFolderPath = "Main/Daily/";

    let todaysDateString: string = getTodayString();
    let todayDateFilePathString: string = `${dailyFolderPath}${todaysDateString}.md`
    console.log(`Today daily file path string: ${todayDateFilePathString}`)

    let todayDailyFile: TFile | null = vault.getFileByPath(todayDateFilePathString)

    if (todayDailyFile instanceof TFile) {
        return todayDailyFile as TFile;
    }

    return null;
}


function getTodayString(): string{
    const today = new Date();

    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const currentDate = `${dd}-${mm}-${yyyy}`;

    return currentDate;
}