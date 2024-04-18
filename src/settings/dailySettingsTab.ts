import { App, PluginSettingTab, Setting } from "obsidian";
import DailyTransferPlugin from "src/app/main";


export class DailyTransferSettingTab extends PluginSettingTab  {
    plugin: DailyTransferPlugin;

    constructor(app: App, plugin: DailyTransferPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        let { containerEl } = this;

        containerEl.empty();

        new Setting(containerEl)
        .setName("Date format")
        .setDesc("Default date format")
        .addText((text) =>
            text
                .setPlaceholder("MMMM dd, yyyy")
                .setValue(this.plugin.settings.dateFormat)
                .onChange(async (value) => {
                    this.plugin.settings.dateFormat = value;
                    await this.plugin.saveSettings();
                })
            );
    }
}