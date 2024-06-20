// Time Formate

export const handleFormatTime = (timeStamp) => {

    let optionsTime = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    };

    const time = new Date(timeStamp).toLocaleTimeString("en-US", optionsTime);
    return time;
};



// Date Formate

export const handleFormatDate = (dateStamp) => {
    let optionsDate = {
        weekday: "short",
        day: "numeric",
        month: "short",
        // year: "numeric",
    };

    // "en-GB" return DD MM YYYY
    // "en-US" return MM DD, YYYY 
    const date = new Date(dateStamp).toLocaleString("en-gb", optionsDate);
    return date;
};