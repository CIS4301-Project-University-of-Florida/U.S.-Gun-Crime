import React from 'react';
import moment from 'moment';
import { RangePickerProps } from 'antd/lib/date-picker/interface';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

export const DATE_FORMAT = 'MM/DD/YYYY';
export const earliestDate = '01/01/2013';
export const latestDate = '03/31/2018';

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
      {...props}
    />
  );
};

export default DateRangePicker;
