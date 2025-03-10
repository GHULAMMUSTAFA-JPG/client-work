import { SetStateAction, useState } from 'react';
import { format } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default styles
import Tooltip from './Tooltip';

const PostCalendar = () => {
    const [date, setDate] = useState(new Date());
    const [selectedFilter, setSelectedFilter] = useState('7');

    const onChange:any = (newDate: Date) => {
        setDate(newDate);
        console.log('Selected Date:', newDate);
    };
    const upcomingPosts = [
        {
            date: new Date(),
            events: [
                { type: 'due', campaign: 'Campaign 1' },
                { type: 'live', campaign: 'Campaign 2' }
            ]
        },
        {
            date: new Date(new Date().setDate(new Date().getDate() + 1)),
            events: [
                { type: 'due', campaign: 'Campaign 3' }
            ]
        }
    ];

    return (
/*         <div style={{ height: '100%' }}>
            <Calendar 
                onChange={onChange} 
                value={date}
                className="h-100"
            />
        </div> */
        <div className="bg-white rounded-lg p-6">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0 fs-16 fw-medium">Upcoming Posts</h2>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="tw-border tw-rounded-lg px-3 py-2"
          >
            <option value="7">Next 7 Days</option>
            <option value="14">Next 14 Days</option>
            <option value="30">Next 30 Days</option>
            <option value="90">Next 90 Days</option>
          </select>
        </div>
      
        
        <div className="space-y-4">
          {upcomingPosts.map((day, index) => (
            <div key={index} className="d-flex align-items-center justify-content-between py-2 px-4 rounded-lg bg-gray-100 tw-border tw-rounded-half mt-3 hover:bg-gray-500">
              <div className="w-24 text-sm font-medium">
                {format(day.date, 'MMM dd')}
              </div>
              <div className="flex-1">
               
                <div className="space-y-2">
                  {day.events.map((event, eventIndex) => (
                    <Tooltip key={eventIndex} content={event.campaign}>
                      <div
                        className={`inline-block px-3 py-1 tw-rounded-full text-sm mr-2 mt-2 mb-2 cursor-pointer ${
                          event.type === 'due'
                            ? 'tw-bg-blue-100 tw-text-blue-700'
                            : 'tw-bg-green-100 tw-text-green-700'
                        }`}
                      >
                        {event.type === 'due' ? 'Due: ' : 'Live: '}
                        {event.campaign}
                      </div>
                    </Tooltip>
                  ))}
                </div>
              
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default PostCalendar;
