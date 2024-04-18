export function reloadRibbonButton(that: any): void{
    console.log("loaded button func")
    const reloadButton = that.addRibbonIcon('refresh-cw', 'Reload', () => {
        that.app.commands.executeCommandById('app:reload');
    });
}