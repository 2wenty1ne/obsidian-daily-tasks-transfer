export function addReloadRibbonButton(that: any): void{
    const reloadButton = that.addRibbonIcon('refresh-cw', 'Reload', () => {
        that.app.commands.executeCommandById('app:reload');
    });
}