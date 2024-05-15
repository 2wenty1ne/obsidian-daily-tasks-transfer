export function sortDate(): void{
    let dateStrings: string[] = ["25-04-2024", "02-01-2024", "23-04-2024", "25-04-2023", "24-12-2025", "02-02-2024", "23-01-2024", "31-03-2024", "01-01-2001", "000-00-99", "00000000000000"];

    let dates: Date[] = [];

    for (let dateString of dateStrings){
        let date: Date  | null = stringToDate(dateString);

        if (date !== null) {
            dates.push(date)
        }
    }

    for(let testdate of dates){
        console.log(`${testdate.toLocaleDateString('de-DE')}`);
    }

    // let sortedDates: Date[] = dates.sort()
    dates.sort((a, b) => a.getTime() - b.getTime());

    console.log("After sorting: ")
    for(let testdate of dates){
        console.log(`${testdate.toLocaleDateString('de-DE')}`);
    }
}


function stringToDate(dateString: string): Date | null{
    const parts = dateString.split('-');

    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const year = parseInt(parts[2]);

    const date = new Date(year, month, day);

    if (isNaN(date.getTime())){
        console.error(`Invalid date: ${dateString}`);
        return null;
    }

    return date; 
}

