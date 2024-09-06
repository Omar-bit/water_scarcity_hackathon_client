import dayjs from 'dayjs';
import { IoCalendar } from 'react-icons/io5';

const YearlyCalendar = ({ startingDate, frequency, maxHeight }) => {
  maxHeight = maxHeight || '80vh';
  const start = dayjs(startingDate);
  const year = start.year();
  const months = Array.from({ length: 12 }, (_, index) => {
    const monthStart = dayjs().year(year).month(index).startOf('month');
    return {
      name: monthStart.format('MMMM'),
      startDate: monthStart,
      daysInMonth: monthStart.daysInMonth(),
    };
  });

  const calculateEventDays = () => {
    const eventDays = [];
    let currentEventDay = dayjs(startingDate);

    while (currentEventDay.year() === year) {
      eventDays.push(currentEventDay.format('YYYY-MM-DD'));
      currentEventDay = currentEventDay.add(frequency, 'day');
    }

    return eventDays;
  };

  const eventDays = calculateEventDays();

  return (
    <div
      className='glass p-3 bg-white space-y-3 '
      style={{ maxHeight: maxHeight, overflow: 'auto' }}
    >
      <header className='flex items-center gap-1 text-main'>
        <IoCalendar className='text-xl' />
        <h3 className='text-lg font-semibold'>
          Irrigation Schedule of {start.year()}
        </h3>
      </header>

      <div className='  grid grid-cols-3 gap-4'>
        {months.map((month, idx) => (
          <MiniCalendar
            key={idx}
            monthName={month.name}
            startDate={month.startDate}
            daysInMonth={month.daysInMonth}
            eventDays={eventDays}
          />
        ))}
      </div>
    </div>
  );
};

export default YearlyCalendar;

const MiniCalendar = ({ monthName, startDate, daysInMonth, eventDays }) => {
  const daysArray = Array.from({ length: daysInMonth }, (_, index) => {
    const dayDate = startDate.add(index, 'day').format('YYYY-MM-DD');
    const isEventDay = eventDays.includes(dayDate);
    return {
      day: index + 1,
      isEventDay,
    };
  });

  return (
    <div className='border p-4 rounded shadow-lg glass'>
      <h3 className='text-lg font-bold mb-2 text-center'>{monthName}</h3>
      <div className='grid grid-cols-7 gap-1'>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
          <div
            key={idx}
            className='text-sm font-semibold text-center text-main'
          >
            {day}
          </div>
        ))}
        {daysArray.map(({ day, isEventDay }, idx) => (
          <div
            key={idx}
            className={`text-center flex items-center justify-center aspect-square rounded-full ${
              isEventDay ? 'bg-main text-aux' : 'bg-white text-secondary'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};
