import React from "react";

const Calendar = ({ year = new Date().getFullYear() }) => {
  const styles = `
    .calendar-container {
      padding: 20px;
      font-family: Arial, sans-serif;
    }

    .calendar-title {
      text-align: center;
      font-size: 24px;
      margin-bottom: 20px;
    }

    .months-container {
    overflow:hidden;
      display: grid;
      grid-template-columns: auto auto ;
      gap: 20px;
    }

    .month-box {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 10px;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
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

    .days-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 5px;
      padding: 10px;
    }

    .day-header {
      font-weight: bold;
      text-align: center;
      background: #f4f4f4;
      padding: 5px;
    }

    .empty-day {
      height: 30px;
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

    .today {
      background: #ff0000 !important;
      color: white;
      font-weight: bold;
    }

    .day-number {
      font-size: 14px;
    }

    .full-date {
      font-size: 12px;
      color: #666;
    }
  `;

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  const formatDate = (year, month, day) => {
    try {
      const date = new Date(year, month, day);
      if (isNaN(date.getTime())) return "";
      return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }).format(date);
    } catch {
      return "";
    }
  };

  const generateCalendar = (year) => {
    return Array.from({ length: 12 }, (_, month) => {
      try {
        const firstDay = new Date(year, month, 1).getDay();
        console.log("firstDay:::::::",firstDay);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        console.log("daysInMonth::::::;",daysInMonth);

        let days = [];

        // Add day headers
        dayNames.forEach((day) => {
          days.push(
            <div key={`header-${month}-${day}`} className="day-header">
              {day}
            </div>
          );
        });

        // Add empty placeholders
        for (let i = 0; i < firstDay; i++) {
          days.push(
            <div key={`empty-${month}-${i}`} className="empty-day" />
          );
        }

        // Add days
        for (let day = 1; day <= daysInMonth; day++) {
          const isToday = year === currentYear && month === currentMonth && day === currentDay;
          const fullDate = formatDate(year, month, day);
          
          days.push(
            <div
              key={`day-${month}-${day}`}
              className={`calendar-day ${isToday ? "today" : ""}`}
              title={fullDate}
            >
              <span className="day-number">{day}</span>
              {/* <span className="full-date">{monthNames[month]} {day}</span> */}
            </div>
          );
        }

        return {
          monthName: monthNames[month],
          monthDate: new Intl.DateTimeFormat('en-US', {
            month: 'long',
            year: 'numeric'
          }).format(new Date(year, month)),
          days
        };
      } catch (e) {
        console.error(`Error generating calendar for month ${month}:`, e);
        return {
          monthName: monthNames[month],
          monthDate: `${monthNames[month]} ${year}`,
          days: []
        };
      }
    });
  };

  const calendar = generateCalendar(year);
  console.log("calendar::",calendar)

  return (
    <>
      <style>{styles}</style>
      <div className="calendar-container">
        <h1 className="calendar-title">Yearly Calendar - {year}</h1>
        <div className="months-container">
          {calendar.map(({ monthName, monthDate, days }, index) => (
            // Month Header
            <div key={monthName} className="month-box">
              {/* Weekly Header */}
              <h2 className="month-title">{monthDate}</h2>
              {/* Date's */}
              <div className="days-grid">{days}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Calendar;