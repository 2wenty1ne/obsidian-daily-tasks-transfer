import { NoteContent } from "./dailyTransferUtils";

//? Extracs every task and its corresponding header from the previous daily note
export function extractTasksFromPreviousDaily(previousDailyContent: string): NoteContent{

    const lines = previousDailyContent.split('\n');
    
    let type = 'NoteContent'
    let properties = '';
    let inProperties = false;
    let gotProperties = false;

    let currentHeader: string = "topText";
    let headers: { [key: string]: string[]} = {"topText": []};


    let line: string;
    for (line of lines){

        //? Extract properties from properties
        if (!gotProperties) {
            if (line.startsWith('---')) {
                if (!inProperties) {
                    //? Start of properties
                    inProperties = true;
                }
                else {
                    //? End of properties
                    gotProperties = true;
                    inProperties = false;
                }
            }
            properties += line + '\n';
            continue;
        }

        //? Detect new header
        if (line.startsWith('#')) {
            currentHeader = line.replace('#', '').trim();
            
            if (!headers[currentHeader]){
                headers[currentHeader] = [];
            }
        }
        else {
            //? Skip done tasks
            if (line.startsWith("- [x]")){
                continue;
            }
            //? Add task to current header
            headers[currentHeader].push(line + '\n');
        }
    }                             

    return {type, properties, headers} as NoteContent;
}