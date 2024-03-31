const defaultSettings = {
  eventTimeRange: ['2022-12-20 00:00:00', '2023-04-01 00:00:00'], //이벤트(테스트) 시작일, 종료일 + 1 00:00:00
  eventTimeRangeNew: ['2023-03-27 00:00:00', '2023-05-01 00:00:00'], //리뉴얼 적용시작
  chgDate: '2023-04-01 00:00:00', //실제 이벤트 시작일
  eid :  '222906',
  eidDay :  '235812'
};

const dateLeftPad = (value) => {
  if (value >= 10) {
    return value;
  }

  return `0${value}`;
}

const toStringByFormatting = (source, delimiter = '-') => {
  const year = source.getFullYear();
  const month = dateLeftPad(source.getMonth() + 1);
  const day = dateLeftPad(source.getDate());

  return [year, month, day].join(delimiter);
}

module.exports = { defaultSettings, dateLeftPad, toStringByFormatting };
