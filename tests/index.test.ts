import { readTestFile, writeTestFile } from "./testFileInteraction";
import { NoteContent } from "../src/Daily/dailyTransferUtils";

import { extractTasksFromPreviousDaily } from "../src/Daily/dailyStringToNoteContent";
import { testFunctionWrapper } from "./testFunctionWrapper";



describe('A - Previous Content to NoteContent Interface Conversion', () => {
    const errorMessage = 'Error reading file content in string to NoteContent conversion test reading the text test file';

    test('A1 - First test', () => {
        const testFileName = 'A/A1-prevContent-to-NoteContent.txt'
        const resultFileName = 'A/A1-result-prevContent-to-NoteContent.json';

        const [testedFunctionResult, resultFileContent] = testFunctionWrapper<string, NoteContent>(extractTasksFromPreviousDaily, 
            testFileName, resultFileName, errorMessage);

        //! TEST

        // let testNote: NoteContent = {properties: 'props', headers: {'cmogus: ':['amogus', 'bmougs']}}

        console.log("testedFunctionResult")
        writeTestFile(testedFunctionResult, 0)
        console.log("resultFileContent")
        writeTestFile(resultFileContent, 1)
        //! TEST

        expect(testedFunctionResult).toBe(resultFileContent);
    })
    test('A1 TEST', () => {
        expect(4 + 5).toBe(9)
    })
})

// describe('Testing string to NoteContent conversion', () => {
//     test('First test', () => {
//         //? extractTasksFromPreviousDaily  testFileContent -> NoteContent

//         let previousFileContent = readTestFile(testFilePath, 'previous-note-test-1.txt');

//         if (!(previousFileContent)) {
//             throw new Error('Error reading file content in string to NoteContent conversion test reading the text test file')
//         }

//         let content: NoteContent = extractTasksFromPreviousDaily(previousFileContent);
//     })
// })


// describe('Testing note transfer', () => {
//     test('First test', () => {
//         //? addPreviousContentToDaily  previousContent + NoteContent -> filledDailyFile

//         let previousFileContent = readTestFile(testFilePath, 'previous-note-test-1.txt');
//         //console.log(previousFileContent)
//     })
// })


afterAll(() => {
    //TODO close files
})