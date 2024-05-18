import { Menu, Notice } from "obsidian";
import { transferDailyContent } from "./dailyTransferDaily";

export function addQuickAccessDailyRibbonButton(that: any): void{
    const vault = this.app.vault;

    const quickAccessButton = that.addRibbonIcon('calendar-range', 'Dailies', (evt: MouseEvent) => {
        const menu = new Menu();

        //? Adding button to transfer last daily note to todays daily note
        menu.addItem((item) =>
            item
                .setTitle("Transfer to daily note!")
                .setIcon("file-input")
                .onClick(() => {
                    new Notice("Transfering...");

                    transferDailyContent(this.app.vault);
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
                    new Notice("previous");
                })
        );
        menu.showAtPosition({ x: 200, y: 200 })
        menu.showAtMouseEvent(evt);
    })
}