import urls from '../../urls';
import fetch from 'cross-fetch';

const getEventInfo = async (eids) => {
  const url = `${urls.eventNodeApi}/GetClubCouponEventList?eids=${eids}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.Data ? data.Data.SmileCouponEventData || [] : [];
};


const getExternalRndNo =  async(custno, eid) => {
  const url =  `${urls.eventPlatform}/FE/GetEventExRndNo/Custno/${custno}/Eid/${eid}`;
  const res = await fetch(url);
  const data = await res.json();

  try {
    return data.Data.GetEXRndNoResult.RAND_NO;
  } catch (e) {
    return e.message;
  }
};

const setExternalRndNo = async(custno, eid) => {
  const url =  `${urls.eventPlatform}/FE/SetEventExRndNo/Custno/${custno}/Eid/${eid}`;
  const res = await fetch(url);
  const data = await res.json();

  try {
    return data.Data.GetEXRndNoResult.RAND_NO;
  } catch (e) {
    return e.message;
  }
};

const getExternalRndNoByDate = async (custNo, eid, startDate, endDate) => {
  const url = `${urls.eventPlatform}/FE/GetEventExRndNooByDate/Custno/${custNo}/Eid/${eid}/startDate/${startDate}/endDate/${endDate}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.Data || 0 ;
};

module.exports = { getEventInfo, getExternalRndNo, setExternalRndNo, getExternalRndNoByDate };