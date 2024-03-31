import urls from '../../../urls';
const EventSetting = require('./settings');
const { getClubMemberWithStatus } = require('../../common/club');
const { getExternalRndNo,
  setExternalRndNo,
  getExternalRndNoByDate }  = require('../../common/event');
const { getEventTimingInfo } = require("../../common/utils");

const index = async (fastify) => {

  const createServerData = async (request, now)=> {
    const { custNo } = request.userInfo || {};

    const eventDTRanges = EventSetting.defaultSettings.eventTimeRangeNew;
    const timingInfo =  getEventTimingInfo(eventDTRanges, now);
    const isActiveEvent = timingInfo.isActiveEvent;
    const toDay = new Date(now);
    const chgDate = new Date(EventSetting.defaultSettings.chgDate);
    const { isClubMember, statusCode: clubCode } = await getClubMemberWithStatus(custNo);
    const isLogin = !!custNo;

    return { isLogin, isClubMember, clubCode, isActiveEvent, toDay, chgDate };
  };

  fastify.get('/', async (request, reply) => {
    const data = await createServerData(request, request.now);

    if (!data.isActiveEvent) {
      return  reply.redirect(urls.home);
    }

    const toDay = data.toDay;
    const chgDate = data.chgDate;

    if(toDay < chgDate){
      return reply.view('mth/handlemobility/event.ejs', { data });
    }else{
      return reply.view('mth/handlemobility/eventnew.ejs', { data });
    }
  });

  fastify.get('/apply', async (request, reply) => {
    const { custNo } = request.userInfo || {};
    const eid = EventSetting.defaultSettings.eid;

    //난수 발급 여부 검색
    let rndNo = "";
    rndNo = await getExternalRndNo(custNo, eid);

    if(rndNo == "0")
    {
      //없으면 신규 발급
      rndNo = await setExternalRndNo(custNo, eid);
    }
    return reply.send(JSON.stringify(rndNo));
  });

  fastify.get('/applyDay', async (request, reply) => {
    const { custNo } = request.userInfo || {};
    const eidDay = EventSetting.defaultSettings.eidDay;
    const date = new Date();
    const nowYYYYMMDD = EventSetting.toStringByFormatting(date) ;

    //난수 발급 여부 검색, 없으면 신규 발급
    let rndNo = "";
    rndNo = await getExternalRndNoByDate(custNo, eidDay, nowYYYYMMDD, nowYYYYMMDD);
    return reply.send(JSON.stringify(rndNo));
  });
}

module.exports = index;