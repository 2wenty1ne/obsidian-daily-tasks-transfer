import dotenv from "dotenv";
import { readTestFile } from "./testFileInteraction";


type functionToTest<TestContentType, CompareType> = (testFileName: TestContentType) => CompareType;


export function testFunctionWrapper<TestContentType, CompareType>(
    func: functionToTest<TestContentType, CompareType>, 
    testFileName: string, 
    resultFileName: string,
    errorMessage: string
    ): [CompareType, CompareType]{


    const testFilePath: string = getTestFilePath();

    
    //? Get the content of the test file
    const previousFileContent: TestContentType = readTestFile(testFilePath, testFileName);
    
    if (!(previousFileContent)) {
        throw new Error('Test file: ' + errorMessage)
    }

    let testedFunctionResult: CompareType = func(previousFileContent);


    //? Get the content of the expected result file
    const resultFileContent: CompareType = readTestFile<CompareType>(testFilePath, resultFileName);
    
    if (!(resultFileContent)) {
        throw new Error('Result file: ' + errorMessage)
    }


    return [testedFunctionResult, resultFileContent] as [CompareType, CompareType]
}



function getTestFilePath(): string {
    dotenv.config()
    const testFilePath: string | undefined = process.env.TEST_FILES_PATH;

    if (!(testFilePath)) {
        throw new Error('Failed to get test file paths from .env in getTestFilePath for the test function wrapper.');
    }

    return testFilePath;
}