
import { popCloseOKLayer,fnCodeCopy } from '../common/useCommonScripts';
popCloseOKLayer();

const popMyCode = document.getElementById('divMyCode');
const popClub = document.getElementById('divClub');
const btnCodeCopy = document.getElementById('btnCodeCopy');

const couponLayer = document.querySelector('.js-coupon-layer-open');
  couponLayer.addEventListener('click', (event) => {
    event.preventDefault();

    //box__layer 0 비회원> 클럽 회원만 받는 혜택입니다.
    //box__layer 1 회원> 나의 쿠폰 코드
    if (window.data.isLogin) {
        if (!window.data.isSmileClubMember)
        {
            popClub.style.display = 'block';
            popMyCode.style.display = 'hidden';
        }
        else
        {
            try {
                  fetch("./apply?type=apply", {
                      method: "GET"
                  }).then(function (res) {
                      return res.text().then(function (text) {

                           if(text != "0")
                           {
                              // window.alert(text);
                               popClub.style.display = 'hidden';
                               popMyCode.style.display = 'block';
                               document.getElementById('txtCodeCopy').value = text;
                           }
                          else
                           {
                               window.alert(text);
                           }
                      });
                  });
              }
              catch (e) {
                  console.error('Error: ', e);
                  window.alert(e.message);
              }
        }
      } else {
      window.alert('로그인이 필요합니다.');
      window.open(`${window.urls.signinssl}/login/login?url=${location.href}`, '_self');
    }
  });


btnCodeCopy.addEventListener('click', (event) => {
  event.preventDefault();
    const copyCode = document.getElementById('txtCodeCopy').value;
  fnCodeCopy(copyCode);
});


