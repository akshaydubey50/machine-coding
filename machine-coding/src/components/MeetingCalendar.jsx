import React from 'react'
import EventList from "../constant/MeetingCalendar.json"
export default function MeetingCalendar() {
    return (
        <div className='relative overflow-hidden'>
        <div className='border-r-2 border-gray-400  h-full p-6 absolute left-10'></div>

        <TimeSlot />
        <Event  list={EventList}/>
        </div>
    )
}


const Event = ({list}) => {
    return (
        <>
            {list?.map((event) => {
                   const startHour = event.start.split(":")[0];
                   const startMinute = event.start.split(":")[1];
                   const endHour = event.end.split(":")[0];
                   const endMinute = event.end.split(":")[1];
                   const top = startHour * 5 + (startMinute / 60) * 5;
                   const height =
                   (endHour - startHour) * 5 + ((endMinute - startMinute) / 60) * 5;
                return(
                    <div
                    key={event.id}
                    className="absolute left-28 flex justify-center items-center bg-blue-400 event mx-6"
                    style={{ top: `${top}rem`, height: `${height}rem` }}
                  >
                    {event.title}
                  </div>
                )
            }
            )}
        </>
    )
}

const TimeSlot = () => {
    return (
        <>
            {Array.from({ length: 24 }, (_, index) => (
                    <p key={index} className='border-b border-gray-400 h-20 px-6'> {index}:00</p>
            ))}
        </>
    )
}