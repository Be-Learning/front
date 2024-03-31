module.exports.getEventTimingInfo = (timeRanges, now) => {
  const safeNow = +now;
  let round;
  for (round = 0; round < timeRanges.length; round += 1) {
    const roundBeginsAt = +new Date(timeRanges[round]);
    if (safeNow < roundBeginsAt) break;
  }

  const didEventEnd = round >= timeRanges.length;
  const didEventBegin = round > 0;
  const isActiveEvent = didEventBegin && !didEventEnd;
  return { round, didEventBegin, didEventEnd, isActiveEvent };
};
