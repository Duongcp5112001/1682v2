import React from 'react';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';
import generatePicker from 'antd/es/date-picker/generatePicker';
import { DATE } from '~/utils/constant';


const DatePickerAntd = generatePicker<Date>(dateFnsGenerateConfig);

function DatePicker(props: any) {
  return (
    <DatePickerAntd
      format={DATE}
      {...props}
    />
  );
}

export default DatePicker;
