import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Skeleton from '../components/Skeleton';
import CircularProgress from '../components/CircularProgress';
import YearlyCalendar from '../components/YearlyCalendar';
import dayjs from 'dayjs';
import BarProgress from '../components/BarProgress';
import { Link } from 'react-router-dom';
const backendUrl = import.meta.env.VITE_BACKEND_URL;
function Session() {
  const { sessionId } = useParams();
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(
    {
      report_id: '123',
      report_name: 'report 1',
      start_date: '2024-09-6',
      report: {
        explanation:
          'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum',
        irregation_frequency: 25,
        irregation_amount: 13,
      },
    } || null
  );
  console.log(session);

  useEffect(() => {
    const getSession = async () => {
      try {
        const res = await axios.get(`${backendUrl}/get_report/${sessionId}`);
        console.log('aaa', res);
        setSession(res.data);
      } catch (err) {
        console.log(err);
        toast.error('Error fetching session');
      } finally {
        setLoading(false);
      }
    };
    getSession();
  }, [sessionId]);
  const calculateEventDays = () => {
    const year = dayjs(session.start_date).year();
    const eventDays = [];
    let currentEventDay = dayjs(session.start_date);

    while (currentEventDay.year() === year) {
      eventDays.push(currentEventDay.format('YYYY-MM-DD'));
      currentEventDay = currentEventDay.add(
        session.report.irregation_frequency,
        'day'
      );
    }

    return eventDays;
  };
  const eventDays = calculateEventDays();
  const shouldIrrigateToday = eventDays.includes(dayjs().format('YYYY-MM-DD'));

  const findNextIrrigationDate = () => {
    const nextIrrigationDate = eventDays.findIndex(
      (date) => date === dayjs().format('YYYY-MM-DD')
    );
    return nextIrrigationDate;
  };
  const nextIrrigationDate = eventDays[findNextIrrigationDate() + 1];
  function getDigitFromString(str) {
    let newStr = '';
    for (let i = 0; i < str?.length; i++) {
      if (isNaN(str[i])) {
        return Number(newStr);
      }
      newStr += str[i];
    }
    return Number(newStr);
  }
  return (
    <div className='p-3 space-y-5 fadeIn'>
      <header className='glass p-2 flex flex-col justify-center items-center'>
        <Link to='/'>
          <h2 className='font-extrabold text-main text-2xl tracking-widest	'>
            FarmFlow
          </h2>
        </Link>
        <article className=' flex items-end justify-around w-full gap-2'>
          {loading ? (
            <>
              <div className='flex items-center gap-1 '>
                <p className='font-semibold'> Report:</p>{' '}
                <Skeleton className='h-5 w-20' />
              </div>
              <div className='flex items-center gap-1 '>
                <p className='font-semibold'> Starting Date:</p>{' '}
                <Skeleton className='h-5 w-24' />
              </div>
              <div className='flex items-center gap-1 '>
                <p className='font-semibold'> Today:</p>{' '}
                <Skeleton className='h-5 w-32' />
              </div>
              <div className='flex items-center gap-1 '>
                <p className='font-semibold'> Next Irrigation Date:</p>{' '}
                <Skeleton className='h-5 w-24' />
              </div>
            </>
          ) : (
            <>
              {' '}
              <p className=' font-semibold'>Report: {session.report_name}</p>
              <p className=' font-semibold'>
                Starting Date: {session.start_date}
              </p>
              <p className=' font-semibold'>
                Today: {shouldIrrigateToday ? 'Irrigate' : 'No Irrigation'}
              </p>
              <p className=' font-semibold'>
                Next Irrigation Date: {nextIrrigationDate}
              </p>
            </>
          )}
        </article>
      </header>

      <main className='flex gap-3 flex-col lg:flex-row'>
        <div className=' flex-1 lg:w-[43.8%] flex flex-col justify-between gap-3 lg:gap-0'>
          <div
            className={`glass p-3 rounded-md flex items-center justify-around gap-3 min-h-[21vh] ${
              loading ? 'animate-pulse' : ''
            }`}
          >
            {!loading && (
              <>
                <div className={`${loading ? 'animate-pulse' : ''}`}>
                  <CircularProgress
                    min={0}
                    max={0}
                    val={Number(session?.report?.irregation_frequency)}
                    showNumber
                    withoutProgress
                  />
                  <h5>Irrigation Frequency</h5>
                </div>
                <div className='flex flex-col items-center'>
                  <CircularProgress
                    min={0}
                    max={50}
                    val={Number(session?.report?.irregation_amount)}
                    showNumber
                  />
                  <h5>Irrigation Amount</h5>
                </div>
                <div className='flex flex-col items-center'>
                  <CircularProgress
                    min={-10}
                    max={60}
                    val={Number(
                      getDigitFromString(session?.weather_data?.temperature)
                    )}
                    showNumber
                  />
                  <h5>Temperature(c°)</h5>
                </div>
              </>
            )}
          </div>
          <div
            className={`glass p-3 rounded-md flex items-center justify-around gap-3 min-h-[21vh] ${
              loading ? 'animate-pulse' : ''
            }`}
          >
            {!loading && (
              <>
                {/* <CircularProgress min={-10} max={50} val={33} /> */}
                <p className='text-main text-lg font-semibold'>
                  More useful data coming soon!
                </p>
              </>
            )}
          </div>
          <div
            className={`glass p-3 rounded-md flex flex-col gap-1 min-h-[21vh] ${
              loading ? 'animate-pulse' : ''
            }`}
          >
            {!loading && (
              <>
                {' '}
                <p className='font-semibold text-main text-lg'>Explanation:</p>
                <p className=''>{session.report.explanation}</p>
              </>
            )}
          </div>
        </div>
        <div className=' flex-1 flex items-start justify-center  max-h-[80vh] overflow-auto'>
          <YearlyCalendar
            startingDate={session.start_date}
            frequency={session.report.irregation_frequency}
          />
        </div>
      </main>
    </div>
  );
}

export default Session;
