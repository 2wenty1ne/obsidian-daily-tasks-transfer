import { Menu, Notice, TAbstractFile, TFolder } from "obsidian";
import { getDailyFiles } from "./manageDailyFiles";

export function addQuickAccessDailyRibbonButton(that: any): void{
    const vault = this.app.vault;

    const quickAccessButton = that.addRibbonIcon('calendar-range', 'Dailies', (evt: MouseEvent) => {
        const menu = new Menu();

        menu.addItem((item) =>
            item
                .setTitle("Transfer to daily note!")
                .setIcon("file-input")
                .onClick(() => {
                    new Notice("Transfering...");
                    
                    const fileRoot: TFolder = vault.getRoot();
                    const filepath: String = fileRoot.path;
                    // const completeFilePath: String = filepath + "Main"

                    // const completeFilePath: String = "/" + "Main"
                    // console.log(`Main file path: ${completeFilePath}`);
                    // const mainFolder = this.app.vault.getFolderByPath(completeFilePath);
                    // console.log(`Type: ${typeof(mainFolder)}, ${mainFolder}`);

                    //? Funktioniert für eine Ebene childs
                    // const rootChildren: TAbstractFile[] = fileRoot.children;
                    //console.log(`Amount childs: ${rootChildren.length}`);

                    static vault.recurseChildren(fileRoot, (file: TAbstractFile) => {
                        console.log(`Type: ${typeof(file)}, ${file}`);
                    });

                    // console.log(filepath)
                    getDailyFiles(filepath)
                })
        );

        menu.addSeparator();

        menu.addItem((item) =>
            item
                .setTitle("Tomorrow")
                .setIcon("step-forward")
                .onClick(() => {
                    new Notice("tomorrow");
                })
        );
        menu.addSeparator();

        menu.addItem((item) =>
            item
                .setTitle("Previous")
                .setIcon("step-back")
                .onClick(() => {
                    new Notice("previous");
                })
        );
        menu.showAtPosition({ x: 200, y: 200 })
        menu.showAtMouseEvent(evt);
    })
}