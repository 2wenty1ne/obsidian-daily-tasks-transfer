import { Plugin } from 'obsidian'

import { reloadRibbonButton } from 'src/reloadButton/reloadRibbon';

import { quickAccessDailyRibbonButton } from 'src/Daily/dailyButton';
import { DailyTransferSettingTab } from 'src/settings/dailySettingsTab';

import { sortDate } from 'src/Daily/dateSorter';


interface DailyTransferPluginSettings {
	dateFormat: string;
}

const DEFAULT_SETTINGS: Partial<DailyTransferPluginSettings> = {
	dateFormat: "YYYY-MM-DD",
};


export default class DailyTransferPlugin extends Plugin {
	settings: DailyTransferPluginSettings;

	async onload(): Promise<void> {
		await this.loadSettings();
		console.log('Loading DailyTransferPlugin');

		// 
		sortDate();
		// 

		this.addSettingTab(new DailyTransferSettingTab(this.app, this));
		reloadRibbonButton(this);
		quickAccessDailyRibbonButton(this)
	}

	unload(): void {
		console.log('Unloading DailyTransferPlugin');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}
	
	async saveSettings() {
		await this.saveData(this.settings);
	}
}
