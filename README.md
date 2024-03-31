
### 1. 신규 서비스 추가하기

index.js

  fastify.get('/', async (request, reply) => {
    const data = { variableFromServer: true }; // 서버에서 클라이언트로 넘길 데이터를 data 오브젝트에 담습니다.
    return reply.view('index.ejs', { data }); // 사용할 ejs 파일명을 상대경로로 넣고 두번째 인자에 프로퍼티로 data 오브젝트를 넣습니다.
  });
};


### 2. EJS 파일에서 서버에서 넘겨받은 데이터를 `writeInjection()` 함수를 이용해 javascript 전역으로 노출시키고 클라이언트 사이드 메인 스크립트를 호출합니다.

<%# src/services/example/index.ejs %>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <%# 사전에 src/init.js에서 정의한 `writeInjection()` 함수를 이용하여 JS 전역으로 값을 넘겨 사용합니다. %>
    <%- writeInjection({ data }) %>
    <%# src/public/ 폴더에서부터 상대경로로 클라이언트 스크립트를 로드합니다. DOMContentLoaded 이벤트 핸들러 대신 defer를 사용합니다. %>
    <script src="/example/main.js" defer></script>
  </head>
  <body>
    <script>
      DesktopLayout.render([
        <%# writeInjection() 함수가 실행되면 전역에 defaultHeaderParams 변수가 설정됩니다. 해당 헤더 타입은 기본적인 서브헤더 타입입니다. %>
        { name: 'Header', params: defaultHeaderParams, container: document.getElementById('header') },
      ]);
    </script>
    <div id="container"></div>
  </body>
</html>


### 3. Internal API 

Internal API는 클라이언트 사이드(브라우저 상)에서 접근할 수 없는 내부 API 이므로 서버 내에서 호출합니다.
`src/common` 폴더에 각 api 별로 파일을 만들어서 사용합니다. 
// src/common/event.js

// configs 폴더에서 현재 환경의 url 값을 불러옵니다.
const urls = require('../urls');

// request 대신 cross-fetch 패키지를 사용합니다.
const fetch = require('cross-fetch');

// async 함수로 사용하여 API 호출 로직을 작성합니다.
const getEventInfo = async (eids) => {
  const url = `${urls.Api}/event/GetList?eids=${eids}`;
  const res = await fetch(url);
  
  if (res.status < 200 || res.status >= 300) throw new Error(`HTTP ${res.status}`);

  const data = await res.json();
  return data.Data ? data.Data.SmileCouponEventData || [] : [];
};

