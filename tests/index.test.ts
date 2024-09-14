import { NoteContent } from "../src/Daily/dailyTransferUtils";

import { extractTasksFromPreviousDaily } from "../src/Daily/dailyStringToNoteContent";
import { testFunctionWrapper } from "./testFunctionWrapper";


describe('A - Previous Content to NoteContent Interface Conversion', () => {
    const errorMessage = 'Error reading file content in string to NoteContent conversion test reading the text test file';

    test('A1 - Overall test', () => {
        const testFileName = 'A/A1-prevContent-to-NoteContent.txt'
        const resultFileName = 'A/A1-result-prevContent-to-NoteContent.json';

        const [testedFunctionResult, resultFileContent] = testFunctionWrapper<string, NoteContent>(extractTasksFromPreviousDaily, 
            testFileName, resultFileName, errorMessage);

        expect(testedFunctionResult).toStrictEqual(resultFileContent);
    })

    test('A2 - No done tasks', () => {
        const testFileName = 'A/A2-prevContent-to-NoteContent.txt'
        const resultFileName = 'A/A2-result-prevContent-to-NoteContent.json';

        const [testedFunctionResult, resultFileContent] = testFunctionWrapper<string, NoteContent>(extractTasksFromPreviousDaily, 
            testFileName, resultFileName, errorMessage);

        expect(testedFunctionResult).toStrictEqual(resultFileContent);
    })

    test('A3 - Random done tasks', () => {
        const testFileName = 'A/A3-prevContent-to-NoteContent.txt'
        const resultFileName = 'A/A3-result-prevContent-to-NoteContent.json';

        const [testedFunctionResult, resultFileContent] = testFunctionWrapper<string, NoteContent>(extractTasksFromPreviousDaily, 
            testFileName, resultFileName, errorMessage);
        
        expect(testedFunctionResult).toStrictEqual(resultFileContent);
    })

    test('A4 - No done tasks', () => {
        const testFileName = 'A/A4-prevContent-to-NoteContent.txt'
        const resultFileName = 'A/A4-result-prevContent-to-NoteContent.json';

        const [testedFunctionResult, resultFileContent] = testFunctionWrapper<string, NoteContent>(extractTasksFromPreviousDaily, 
            testFileName, resultFileName, errorMessage);
        
        expect(testedFunctionResult).toStrictEqual(resultFileContent);
    })
})


describe('B - Note-Content Interface from previous Note to new Note Content string Conversion', () => {
    const errorMessage = 'Error reading file content in NoteContent to string conversion test reading the text test file';

    test('Test', () => {
        expect(4+9).toBe(13)
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