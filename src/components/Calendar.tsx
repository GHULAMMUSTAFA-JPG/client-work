import { SetStateAction, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default styles

const PostCalendar = () => {
    const [date, setDate] = useState(new Date());

    const onChange:any = (newDate: Date) => {
        setDate(newDate);
        console.log('Selected Date:', newDate);
    };

    return (
        <Calendar onChange={onChange} value={date} />
    );
};

export default PostCalendar;
