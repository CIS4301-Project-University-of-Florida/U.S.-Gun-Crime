import React from 'react';
import moment from 'moment';
import { RangePickerProps, RangePickerPresetRange } from 'antd/lib/date-picker/interface';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

export const DATE_FORMAT = 'MM/DD/YYYY';
export const earliestDate = '01/01/2013';
export const latestDate = '03/31/2018';

const presetRanges: { [range: string]: RangePickerPresetRange } = {
  '2013': [moment('01/01/2013'), moment('12/31/2013')],
  '2014': [moment('01/01/2014'), moment('12/31/2014')],
  '2015': [moment('01/01/2015'), moment('12/31/2015')],
  '2016': [moment('01/01/2016'), moment('12/31/2016')],
  '2017': [moment('01/01/2017'), moment('12/31/2017')],
  '2018': [moment('01/01/2018'), moment('03/31/2018')],
};

const forbiddenDates = (current: moment.Moment | undefined) => {
  return (
    !current || current.isBefore(earliestDate) || current.isAfter(latestDate)
  );
};

const DateRangePicker = (props: RangePickerProps) => {
  return (
    <RangePicker
      format={DATE_FORMAT}
      defaultPickerValue={[moment(earliestDate), moment(latestDate)]}
      disabledDate={forbiddenDates}
      ranges={presetRanges}
      
      {...props}
    />
  );
};

export default DateRangePicker;
