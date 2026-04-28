import { useCountry } from '../shared/CountryContext';
import { timelineData } from '../../data/timeline';
import TimelineStep from './TimelineStep';

const TimelineTrack = ({ onStepClick }) => {
  const { country } = useCountry();
  const data = timelineData[country] || timelineData['IN'];

  return (
    <div className="relative w-full py-16 md:py-24">
      <div className="absolute top-0 bottom-0 left-[27px] md:left-1/2 w-1 bg-navy-200 transform md:-translate-x-1/2 opacity-60"></div>
      <div className="flex flex-col">
        {data.map((step, idx) => (
          <TimelineStep key={step.id} step={step} index={idx} onClick={onStepClick} />
        ))}
      </div>
    </div>
  );
};

export default TimelineTrack;
