import React, { useEffect } from "react";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import LinearProgress from '@material-ui/core/LinearProgress';

import "./App.css";
import MediaGridList from "./comonents/media-grid-list";
import { getNASAPictures } from "./NasaAPI";

const endDate = new Date();

const lastXDays = numDays => {
  const d = new Date();
  d.setDate(d.getDate() - numDays);
  return d;
}

const duration = [
  { value: 'lastWeek', label: 'Last week' },
  { value: 'last2Weeks', label: 'Last two weeks' },
  { value: 'lastMonth', label: 'Last month (last 30 days)' }
];

const mapping = {
  lastWeek: { startDate: lastXDays(7), endDate },
  last2Weeks: { startDate: lastXDays(14), endDate },
  lastMonth: { startDate: lastXDays(30), endDate },
}

const data = {};

function App() {
  const [pictures, updatePictures] = React.useState(null);

  const onDurationChange = (event) => {
    // Clear state to show the loader
    updatePictures(null);
    const pics = data[event.target.value];
    if (!pics || !pics.length) {
      // If not cached, call the service
      const { startDate, endDate } = mapping[event.target.value];
      getNASAPictures(startDate, endDate).then((res) => {
        data[event.target.value] = res;
        updatePictures(res);
      });
    } else {
      // Retrieve the images from cache
      updatePictures(pics);
    }
  };

  useEffect(() => {
    if (!pictures) {
      getNASAPictures(lastXDays(7), endDate).then((res) => {
        data.lastWeek = res;
        updatePictures(res);
      });
    }
  }, [pictures]);

  return (
    <div className="App">
      <div className='dropdown'>
        <Select
          labelId="durationDropdown"
          id="durationSelect"
          onChange={onDurationChange}
          defaultValue={duration[0].value}
        >
          {duration.map(dur => <MenuItem value={dur.value}>{dur.label}</MenuItem>)}
        </Select>
      </div>
      {
        pictures ? <MediaGridList pictures={pictures.filter(picture => picture.media_type === 'image')} />
          : <LinearProgress />
      }
    </div>
  );
}

export default App;
