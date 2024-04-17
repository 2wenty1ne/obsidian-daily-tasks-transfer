import { Editor, MarkdownView, Menu, Notice, Plugin } from 'obsidian'
import { ExampleSettingTab } from "./settings";

interface DailyTransferPluginSettings {
	dateFormat: string;
}

const DEFAULT_SETTINGS: Partial<DailyTransferPluginSettings> = {
	dateFormat: "YYYY-MM-DD",
};

export default class DailyTransferPlugin extends Plugin {
	settings: DailyTransferPluginSettings;

	async onload(): void {
		console.log('Loading DailyTransferPlugin');
		await this.loadSettings();
		const { vault } = this.app
		
		this.reloadRibbonButton()
		this.getTodaysDailyNote()
		this.quickAccessDailyRibbonButton()
	}

	unload(): void {
		console.log('Unloading DailyTransferPlugin');
	}

	getTodaysDailyNote(): void{
		console.log("in func")
	}

	quickAccessDailyRibbonButton(): void{
		const quickAccessButton = this.addRibbonIcon('calendar-range', 'Dailies', (event) => {
			const menu = new Menu();
			new Notice("today")

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
			menu.showAtMouseEvent(event);
			// menu.showAtMouseEvent()
		})
	} 

	reloadRibbonButton(): void{
		const reloadButton = this.addRibbonIcon('refresh-cw', 'Reload', () => {
			this.app.commands.executeCommandById('app:reload');
		});
	}
}
