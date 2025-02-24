import React from 'react'

export default function MyCalendar({ year = (new Date().getFullYear()) }) {

    const getMonthName = (year, month) => {
        return new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(year, month));
    }

    let monthNames = [
    ];
    for (let i = 0; i < 12; i++) {
        monthNames.push(getMonthName(year, i))
    }

    const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Saturday"];

    const today = new Date();
    const currentYear = today.getFullYear();

    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    const formateDate = (year, month, day) => {
        try {
            const date = new Date(year, month, day);
            if (isNaN(date)) return "";
            return new Intl.DateTimeFormat("en-US", {
                month: "long",
                year: "numeric",
                date: "numeric"
            }).format(date)
        } catch (error) {
            console.error("error", error)
            return ""
        }
    }

    const generateCalendar = (year) => {
        return Array.from({ length: 12 }, (_, month) => {
            try {
                const firsDayOfMonth = new Date(year, month, 1).getDay();
                const datesOfMonth = new Date(year, month + 1, 0).getDate();

                const days = [];
                dayNames.forEach((day) => {
                    days.push(
                        <div key={`header-${month}-${day}`} className="day-header">
                            {day}
                        </div>
                    );
                });

                for (let i = 0; i < firsDayOfMonth; i++) {
                    days.push(
                        <div className='empty-placeholder' />
                    )
                }

                for (let day = 1; day <= datesOfMonth; day++) {
                    const isToday = year == currentYear && month == currentMonth && day === currentDay
                    const fullDate = formateDate(year, month, day)
                    days.push(
                        <div
                            key={`month-${month}-${day}`}
                            className={`calendar-day ${isToday ? 'today' : ''}`}
                        >
                            <span>{day}</span>
                        </div>
                    )
                }
                return {
                    monthName: monthNames[month],
                    monthDate: new Intl.DateTimeFormat('en-US', {
                        month: 'long',
                        year: 'numeric'
                    }).format(new Date(year, month)),
                    days
                }
            } catch (error) {
                console.error("error::", error)
                return {
                    monthName: monthNames[month],
                    monthDate: `${monthNames[month]} ${year}`,
                    days: []
                }
            }

        })

    }
    const calendar = generateCalendar(year)

    const styles = `
    .days-grid{
    display:grid;
grid-template-columns: repeat(7, 1fr);
      gap: 5px;
      padding: 10px;
    }
    .empty{
    height:13px;
    background-color:#eee,
    }
   
       .month-title {
      background: #007bff;
      color: white;
      text-align: center;
      padding: 10px;
      font-size: 18px;
      border-radius: 5px 5px 0 0;
      margin: -10px -10px 10px -10px;
    }

    
    .months-container {
    overflow:hidden;
      display: grid;
      grid-template-columns: auto auto auto   ;
      gap: 20px;
    }

      .month-box{
    border: 1px solid #ddd;
      border-radius: 8px;
      padding: 10px;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
      }

  
    .day-header {
      font-weight: bold;
      text-align: center;
      background: #f4f4f4;
      padding: 5px;
    }

      .calendar-day {
      text-align: center;
      padding: 10px;
      background: #f9f9f9;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.3s ease;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .calendar-day:hover {
      background: #add8e6;
    }

     .today{
    background:#ff2200;
    color:white;
    font-weight:500
    }
    
    `
    return (
        <>
            <style>{styles}</style>
            <div className="months-container">
                {calendar?.map(({ monthName, monthDate, days }, index) => (
                    <div key={`month-${monthName}${index}`} className="month-box">
                        <h2 className='month-title'>{monthDate}</h2>
                        <div className='days-grid'>{days}</div>
                    </div>
                ))}
            </div>
        </>
    )
}
