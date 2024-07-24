import { Menu, Notice } from "obsidian";
import { transferDailyContent } from "./dailyTransferDaily";
import { transferDailyTestContent } from "./dailyTestTransfer";
import { getPreviousDaily } from "./dailyGetPrevious";

export function addQuickAccessDailyRibbonButton(that: any): void{
    const vault = this.app.vault;

    const quickAccessButton = that.addRibbonIcon('calendar-range', 'Dailies', (evt: MouseEvent) => {
        const menu = new Menu();

        // menu.addItem((item) => 
        //     item
        //         .setTitle("Test transfer")
        //         .setIcon("flask-conical")
        //         .onClick(() => {
        //             new Notice("Test transfer")

        //             transferDailyTestContent(vault)
        //         })
        // )

        //? Adding button to transfer last daily note to todays daily note
        menu.addItem((item) =>
            item
                .setTitle("Transfer to daily note!")
                .setIcon("file-input")
                .onClick(() => {
                    new Notice("Transfering...");

                    transferDailyContent(vault);
                })
        );

        menu.addSeparator();

        //? Add button to open tomorrows daily note
        menu.addItem((item) =>
            item
                .setTitle("Tomorrow")
                .setIcon("step-forward")
                .onClick(() => {
                    new Notice("tomorrow");
                })
        );

        //? Add button to open last daily note
        menu.addItem((item) =>
            item
                .setTitle("Previous")
                .setIcon("step-back")
                .onClick(() => {
                    getPreviousDaily(this.app);
                })
        );
        menu.showAtPosition({ x: 200, y: 200 })
        menu.showAtMouseEvent(evt);
    })
}
