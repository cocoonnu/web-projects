// BUG 删除

// 字数符合规范时显示
var editableInput = document.querySelector('.editable'),
// 字数不符合规范时显示
readonlyInput = document.querySelector('.readonly'),
placeholder = document.querySelector('.placeholder'),
counter = document.querySelector('.counter'),
button = document.querySelector('button');

// 禁止右键
document.oncontextmenu = new Function('event.returnValue = false');
document.onkeydown = function(event) {
    if (event.ctrlKey && window.event.keyCode==86) return false;
}


editableInput.onfocus = (e) => {
    let element = e.target;
    checkInput(element);
    placeholder.style.color = "#c5ccd3";
}
editableInput.onblur = (e) => {
    let element = e.target;
    checkInput(element);
    placeholder.style.color = "#98a5b1";
}

// 实时输入框：当键盘被抬起时监听
editableInput.onkeyup = function(e) {
    // e.target返回触发事件的对象 editableInput、readonlyInput
    let element = e.target;
    checkInput(element);
    if (e.keyCode == 86) return false;
}

// 当持续按下一个键时同步（小bug）
editableInput.onkeypress = function(e) {
    let element = e.target;
    checkInput(element);
    placeholder.style.display = 'none';
}

function checkInput(element) {

    let maxLength = 100; // 最大字数
    let currentLength = element.innerText.length; // 实时字数
    counter.innerText = maxLength - currentLength; // 字数逆向统计
    
    if (currentLength <= 0)
    {
        placeholder.style.display = 'block';
        counter.style.display = 'none';
        button.classList.remove('active');
    }
    else 
    {
        placeholder.style.display = 'none';
        counter.style.display = 'block';
        button.classList.add('active');
    }
    
    // 当输入文字大于最大字数时
    let text;
    if (currentLength > maxLength)
    {
        // 得到超出的文字 substr：提取子字符串
        let overText = element.innerText.substr(maxLength);
        // 将超出的文字添加span标签 添加高亮
        overText = `<span class="highlight">${overText}</span>`;

        text = element.innerText.substr(0,maxLength) + overText; // 总文字html
        
        // 将readonlyInput显示
        readonlyInput.style.zIndex = 1;
        counter.style.color = '#e0245e';
        button.classList.remove('active');
        
    } else
    {
        // 取消readonlyInput显示
        readonlyInput.style.zIndex = -1;
        counter.style.color = '#333';
        button.classList.add('active');
    }
    // readonlyInput始终等于总文字html
    readonlyInput.innerHTML = text;

}