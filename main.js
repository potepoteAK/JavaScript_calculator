//直前の四則演算符号までの数値
let lastValue = '0'

document.addEventListener('DOMContentLoaded', function() {
  const btns = document.querySelectorAll('button');
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', calculate, false);
  }
}, false);

function calculate(button) {
  let displayArea = document.getElementById('display-area');
  const previousInput = displayArea.textContent.slice(-1);
  const key = button.currentTarget
  const keyValue = key.textContent
  if (keyValue === 'AC') {
    displayArea.textContent = 0
    lastValue = '0'
  }
  else if (keyValue === '=') {
    //前の入力値が四則演算符号だった場合、そのまま処理を終了する。
    if (previousInput.match(/[+\-*/]/)) {
      return
    }
    displayArea.textContent = eval(displayArea.textContent)
    lastValue = displayArea.textContent
  }
  else if (keyValue.match(/[+\-*/]/)) {
    //前の入力値が四則演算符号だった場合、そのまま処理を終了する。
    if (previousInput.match(/[+\-*/]/)) {
      return
    }
    //入力されたのが割り算の場合、直前の四則演算符号までの数値に0しか入っていない場合、0除算を防ぐ。
    if (keyValue === '/' && previousInput === '0' && lastValue.length === 1) {
      alert('0除算は禁止されています。')
      return
    }
    displayArea.textContent += keyValue
    lastValue = ''
  }
  else {
    //直前の四則演算符号までの数値に0しか入っていない場合、その0を入力された数値で上書きする。
    if (previousInput === '0' && lastValue.length === 1) {
      displayArea.textContent = displayArea.textContent.slice(0, -1) + keyValue
      lastValue = keyValue
      return
    }
    displayArea.textContent += keyValue
    lastValue = keyValue + lastValue
  }
}
