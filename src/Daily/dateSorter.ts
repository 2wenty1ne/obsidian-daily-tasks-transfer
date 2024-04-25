export function sortDate(): void{
    let dates: string[] = ["25-04-2024", "02-01-2024", "23-04-2024", "25-04-2023", "24-12-2025", "02-02-2024"];

    // let sorted_dates: string[] = dates.sort();
    let teststring: string = dates[0];

    let testdate: Date = new Date(teststring);

    console.log(testdate);
}

function stringToDate(dateString: string){
    const parts = dateString.split('-');

    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const year = parseInt(parts[2]);

    const date = new Date(year, month, day);

    if (isNaN(date.getTime()))
        console.error("Invalid date");
    return 
}

