export function getDailyFiles(daliesPath: String): void{

    const fs = require('fs');
    fs.readdir(daliesPath, (err: any, files: { array: any[]; }) => {
        files.array.forEach(file => {
            console.log(`Type: ${typeof(file)}: ${file}`)
        });
    })
}