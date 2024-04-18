import { Menu, Notice } from "obsidian";

export function quickAccessDailyRibbonButton(that: any): void{
    const quickAccessButton = that.addRibbonIcon('calendar-range', 'Dailies', (evt: MouseEvent) => {
        const menu = new Menu();

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