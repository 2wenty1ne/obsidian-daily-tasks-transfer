import { Plugin } from 'obsidian'

export default class DailyTransferPlugin extends Plugin {
	onload(): void {
		const { vault, moment } = this.app
		console.log(`Vault type: ${typeof vault}`)
		console.log(`Vault content: ${vault}`)
		console.log('Amogus')
	}

	function getTodaysDailyNote(): void{
		
	}
}