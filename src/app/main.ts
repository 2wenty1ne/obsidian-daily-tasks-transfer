import { Editor, MarkdownView, Plugin } from 'obsidian'
import { quickAccessDailyRibbonButton } from 'src/Daily/dailyButton';
import { reloadRibbonButton } from 'src/reloadButton/reloadRibbon';


interface DailyTransferPluginSettings {
	dateFormat: string;
}

const DEFAULT_SETTINGS: Partial<DailyTransferPluginSettings> = {
	dateFormat: "YYYY-MM-DD",
};

export default class DailyTransferPlugin extends Plugin {
	settings: DailyTransferPluginSettings;

	onload(): void {
		// await this.loadSettings();
		console.log('Loading DailyTransferPlugin');

		reloadRibbonButton(this);
		quickAccessDailyRibbonButton(this)
	}

	unload(): void {
		console.log('Unloading DailyTransferPlugin');
	}
}
