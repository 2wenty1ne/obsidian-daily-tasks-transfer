import { App, Notice, TFile } from "obsidian";
import { extractTasksFromPreviousDaily } from "src/Daily/dailyStringToNoteContent";
import { NoteContent, readNote } from "src/Daily/dailyTransferUtils";

export async function getNoteContent(app: App) {
    const activeFile: TFile | null = app.workspace.getActiveFile();

    if (!(activeFile)) {
        new Notice("Error finding current note")
        new Error("Couldn't get currently open note")
        return
    }

    const activeFileContent: string | null = await readNote(app.vault, undefined, activeFile);
    console.log(`Current content: ${activeFileContent}`)

    if (!(activeFileContent)) {
        new Notice("Error reading the content of the current note")
        new Error(`Couldn't read the content of the note ${activeFile.basename}`)
        return
    }

    const activeFileTasks: NoteContent = extractTasksFromPreviousDaily(activeFileContent);

    console.log(`Current NoteContent: ${activeFileTasks.headers}`)
}
