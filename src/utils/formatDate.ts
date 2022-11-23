export const formatMatchDate = (d: Date): string => {
    

    const msLeftInWeek = 6 * 24 * 60 * 60 * 1000;
    let day = '';

    if (d.getTime() < Date.now()){
        return 'Completed';
    }

    if(Date.now() + msLeftInWeek > d.getTime()){
        switch(d.getDay()){
            case 0:
                day = 'Sunday';
                break;
            case 1:
                day = 'Monday';
                break;
            case 2:
                day = 'Tuesday';
                break;
            case 3:
                day = 'Wednesday';
                break;
            case 4:
                day = 'Thursday';
                break;
            case 5:
                day = 'Friday';
                break;
            case 6:
                day = 'Saturday';
                break;
        }  
    }
    else {
        day = `${d.getMonth() + 1}/${d.getDate()}`;
    }

    let hours = d.getHours();
    let minutes = d.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    return (`${day} @ ${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`);
}