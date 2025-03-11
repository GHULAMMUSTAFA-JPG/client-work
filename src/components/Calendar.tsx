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
      
        
        <div>
  <div className="tw-p-3 tw-border-b tw-border-gray-100 last:tw-border-b-0">
    <div className="tw-text-sm tw-font-medium tw-text-gray-500 tw-mb-2">Mar 10</div>
    <div className="tw-space-y-2">
      <div className="tw-relative">
        <button className="tw-w-full tw-flex tw-items-center tw-justify-between tw-p-2 tw-rounded-md hover:tw-bg-gray-50 tw-transition-all tw-duration-200">
          <div className="tw-flex tw-items-center tw-min-w-0 gap-2">
          <div className="img-container-topHeader">
            <img src="https://cdn.synnc.us/brand/692b7820-71e6-4aa3-b024-3811c6b15c5b.jpg" className="border object-fit-cover rounded-circle flex-shrink-0" alt="Profile Picture" width="30" height="30" />
            </div>
            <div className="tw-truncate tw-text-left">
              <h3 className="tw-text-sm tw-font-medium tw-text-gray-900 tw-truncate">Tech Trends 2025</h3>
              <p className="tw-text-xs tw-text-gray-500 tw-truncate">The Future of AI in Enterprise</p>
              <p className="tw-text-xs tw-text-gray-400 tw-truncate">Jane Smith</p>
            </div>
          </div>
          <span className="tw-ml-2 tw-px-2 tw-py-1 tw-text-xs tw-font-medium tw-rounded-full tw-flex-shrink-0 tw-bg-[#FFEBEE] tw-text-[#C62828]">Due Today</span>
        </button>
      </div>
    </div>
  </div>

  <div className="tw-p-3 tw-border-b tw-border-gray-100 last:tw-border-b-0">
    <div className="tw-text-sm tw-font-medium tw-text-gray-500 tw-mb-2">Mar 12</div>
    <div className="tw-space-y-2">
      <div className="tw-relative">
        <button className="tw-w-full tw-flex tw-items-center tw-justify-between tw-p-2 tw-rounded-md hover:tw-bg-gray-50 tw-transition-all tw-duration-200">
          <div className="tw-flex tw-items-center tw-min-w-0 gap-3">
          <div className="img-container-topHeader">
            <img src="https://cdn.synnc.us/brand/692b7820-71e6-4aa3-b024-3811c6b15c5b.jpg" className="border object-fit-cover rounded-circle flex-shrink-0" alt="Profile Picture" width="30" height="30" />
            </div>
            <div className="tw-truncate tw-text-left">
              <h3 className="tw-text-sm tw-font-medium tw-text-gray-900 tw-truncate">AI Insights</h3>
              <p className="tw-text-xs tw-text-gray-500 tw-truncate">Machine Learning Best Practices</p>
            </div>
          </div>
          <span className="tw-ml-2 tw-px-2 tw-py-1 tw-text-xs tw-font-medium tw-rounded-full tw-flex-shrink-0 tw-bg-[#E8F5E9] tw-text-[#2E7D32]">Live</span>
        </button>
      </div>
    </div>
  </div>
</div>
      </div>
    );
};

export default PostCalendar;
