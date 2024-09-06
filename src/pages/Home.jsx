import InputField from '../components/InputField';
import DropDown from '../components/DropDown';
import { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { AppContext } from '../App';
import SessionLink from '../components/SessionLink';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
function Home() {
  const { sessions, userId, setSessions } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    crop: '',
    location: '',
    temperature: '',
    humidity: '',
    sunShine: '',
    windSpeed: '',
    percipitation: '',
    startDate: '',
  });
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [irrigationMethod, setIrrigationMethod] = useState(null);
  const [growthStage, setGrowthStage] = useState(null);

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/generate_report`, {
        user_id: userId,
        report_name: formData.name,
        crop_type: formData.crop,
        temperature: formData.temperature,
        humidity: formData.humidity,
        wind_speed: formData.windSpeed,
        percipitation: formData.percipitation,
        sunchine: formData.sunShine,
        growth_stage: growthStage.value,
        irregation_method: irrigationMethod.value,
        start_date: formData.startDate,
      });
      console.log(res.data);

      setSessions((prev) => [
        ...prev,
        { report_id: res.data.report_id, report_name: formData.name },
      ]);
      toast.success('Report generated successfully');

      navigate('/session/' + res.data.report.report_id);
    } catch (err) {
      console.log(err);
      toast.error('Error generating report');
    } finally {
      setLoading(false);
    }
  };
  const getWeatherByCity = async () => {
    if (!city) toast.error('City is required');
    try {
      const res = await axios.get(`${backendUrl}/get_temps/${city}`);
      console.log(res);

      setFormData((prev) => ({
        ...prev,
        humidity: res.data.humidity,
        percipitation: res.data.percipitation,
        temperature: res.data.temperature,
        windSpeed: res.data.wind_speed,
      }));

      toast.success('retreived weather data successfully');
    } catch (err) {
      console.log(err);
      toast.error('Error getting weather data by city');
    }
  };
  return (
    <div className='greenField w-full min-h-screen flex flex-col lg:flex-row items-stretch '>
      <div className=' flex-1 flex  items-center lg:items-start flex-col gap-2 py-10 px-3'>
        <h2 className='text-5xl font-bold text-main   stroke-white drop-shadow-2xl fadeIn'>
          FarmFlow
        </h2>
        <h4 className='mt-3 text-xl font-bold text-secondary fadeIn'>
          What is FarmFlow ?
        </h4>
        <p className=' text-black w-[85%]  text-balance font-semibold  fadeIn'>
          <span className='font-extrabold'> FarmFlow</span> is a smart
          irrigation management tool that helps farmers and agricultural
          professionals optimize water usage for healthier crops and sustainable
          practices. With real-time climate data, crop-specific watering
          schedules, and detailed reports, FarmFlow makes it easy to manage
          irrigation efficiently. Whether for small gardens or large farms,
          FarmFlow ensures your crops get the right water, at the right time.
          Grow smarter with FarmFlow!
        </p>
        <section className=' w-full '>
          <h4 className='mt-3 text-xl font-bold text-secondary fadeIn'>
            My Sessions
          </h4>

          <div className='glass p-2 min-h-[20vh] w-full flex flex-wrap justify-start items-center  gap-x-3  mt-3'>
            {sessions?.map((session, index) => (
              <SessionLink
                id={session.report_id}
                name={session.report_name}
                index={index}
              />
            ))}
            {!sessions && (
              <p className='text-center w-full font-semibold'>
                No sessions yet!
              </p>
            )}
          </div>
        </section>
      </div>
      <div className=' flex-1 p-10  flex  flex-col gap-3 items-center lg:items-start'>
        <h2 className='text-3xl font-bold text-main fadeIn'>Try it Now!</h2>
        <div className='flex flex-wrap w-full lg:w-[80%] gap-3 glass px-3 py-5 max-h-[80vh] overflow-y-auto fadeIn'>
          <InputField
            label='Report name'
            name='name'
            placeholder={'Enter report name'}
            value={formData.name}
            onChange={handleFormChange}
            className={{ container: 'w-full' }}
          />
          <InputField
            label='Crop type'
            name='crop'
            placeholder={'Enter crop type'}
            value={formData.crop}
            onChange={handleFormChange}
            className={{ container: 'w-full' }}
          />

          <DropDown
            label='Growth Stage'
            options={[
              { value: 'Germination', label: 'Germination' },
              { value: 'Vegetative', label: 'Vegetative' },
              { value: 'Flowering', label: 'Flowering' },
              { value: 'Fruiting', label: 'Fruiting' },
            ]}
            selectedOption={growthStage}
            handleChange={setGrowthStage}
            className={{ container: 'w-full' }}
          />
          <DropDown
            label='Irrigation method'
            options={[
              { value: 'Drip', label: 'Drip' },
              { value: 'Sprinkler', label: 'Sprinkler' },
              { value: 'Flood', label: 'Flood' },
              { value: 'Furrow', label: 'Furrow' },
            ]}
            selectedOption={irrigationMethod}
            handleChange={setIrrigationMethod}
            className={{ container: 'w-full' }}
          />
          <InputField
            label='Start Date'
            name='startDate'
            type='date'
            placeholder={'Enter start date'}
            value={formData.startDate}
            onChange={handleFormChange}
            className={{ container: 'w-full' }}
          />
          <div className='w-full h-[1px] bg-gray-600' />
          <div className='w-full flex items-end  gap-2 justify-between'>
            <InputField
              label='City'
              name='city'
              type='text'
              placeholder={'Enter the city'}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={{ container: 'flex-1' }}
            />
            <button
              className='  bg-bg py-1 px-7 rounded-lg shadow-lg text-main  text-sm  tracking-wider border-2 border-main ml-auto	'
              onClick={getWeatherByCity}
            >
              Fill weather data depending on city
            </button>
          </div>
          <div className='w-full flex items-center'>
            <div className='w-full h-[1px] bg-gray-600' /> <span> Or</span>{' '}
            <div className='w-full h-[1px] bg-gray-600' />
          </div>
          <InputField
            label='Temperature(c)'
            name='temperature'
            type='number'
            placeholder={'Enter temperature'}
            value={formData.temperature}
            onChange={handleFormChange}
            className={{ container: 'w-full' }}
          />
          <InputField
            label='Humidity(%)'
            type='number'
            name='humidity'
            placeholder={'Enter humidity'}
            value={formData.humidity}
            onChange={handleFormChange}
            className={{ container: 'w-full' }}
          />
          <InputField
            label='Wind Speed(km/h)'
            type='number'
            name='windSpeed'
            placeholder={'Enter wind speed'}
            value={formData.windSpeed}
            onChange={handleFormChange}
            className={{ container: 'w-full' }}
          />
          <button
            className=' mt-3 w-full bg-bg py-2 px-7 rounded-lg shadow-lg text-main  font-bold tracking-wider border-2 border-main ml-auto	'
            onClick={handleSubmit}
          >
            Start
          </button>
          {loading && <p className='text-center w-full'>Analyzing...</p>}
        </div>
      </div>
    </div>
  );
}

export default Home;
