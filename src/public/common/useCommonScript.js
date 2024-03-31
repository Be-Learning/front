

function popCloseOKLayer() {

      const popCloseOkLayer = document.querySelectorAll('.button__close, .button__ok');
      popCloseOkLayer.forEach(pop => {

        pop.addEventListener('click', (event) => {
        event.preventDefault();

        const parentHasClass = pop.parentElement.closest('.box__layer');
        parentHasClass.setAttribute("style", "display:none");
    });
  });
}

function fnCodeCopy(strMyCode)  {

    const myCode = strMyCode;

    const tmpTextarea = document.createElement('textarea');
    tmpTextarea.contentEditable = true;
    tmpTextarea.readOnly = false;
    tmpTextarea.value = myCode;
    document.body.appendChild(tmpTextarea);
    tmpTextarea.select();
    tmpTextarea.setSelectionRange(0, 9999);  // 셀렉트 범위 설정
    document.execCommand('copy');
    document.body.removeChild(tmpTextarea);

    alert('나의 쿠폰코드가 복사되었습니다.');
}
export {popCloseOKLayer, fnCodeCopy};

