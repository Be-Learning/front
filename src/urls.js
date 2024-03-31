import { origins } from 'Config';

const urls = {
  self: `${origins.self}/e`,
  eventNodeApi: origins.eventNodeApi,
  eventPlatform: `${origins.eventApi}/eventPlatform`,
  smileclubMemberApi: `${origins.memberApi}/api/SmileClub`,
  script: origins.script,
  signinssl: origins.signinssl,
  cssBase: `${origins.script}/pc/css/application/kr/promotion`,
  jsBase: `${origins.script}/pc/js/application/kr/promotion`,
  picsBase: `${origins.pics}/pc/single/kr/promotion`,
  pics: origins.pics,
};

export default urls;
