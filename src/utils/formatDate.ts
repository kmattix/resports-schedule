export const formatMatchDate = (n: number): string => {
    const d = new Date(n);
    const msLeftInWeek = 6 * 24 * 60 * 60 * 1000;
    let day = '';

    if (d.getTime() < Date.now() - 60 * 60 * 1000){
        return 'Completed';
    }
    
    if(d.getTime() < Date.now()){
        return 'Live Now';
    }

    if(Date.now() + msLeftInWeek > d.getTime()){
        if(d.getDay() === new Date().getDay()){
            day = 'Today';
        } 
        else{
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