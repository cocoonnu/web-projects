let uersnameRef = document.querySelector("#username"),
passwordRef = document.querySelector("#password"),
submitBtn = document.querySelector("#submit"),
messageRef = document.querySelector("#message-ref");

function isUersnameValid() {
    // 判读用户名正则表达式
    const uersnameRegex = /^[a-zA-Z0-9_-]{4,20}$/gi;
    // 返回bool
    return uersnameRegex.test(uersnameRef.value);
}
function uersnameChange() {
    // 如果用户名格式不正确
    if (!isUersnameValid())
    {
        messageRef.style.visibility = 'hidden';
        uersnameRef.style.cssText = "border-color: #fe2e2e; background-color: #ffc2c2;"
    } else
    {
        uersnameRef.style.cssText = "border-color: #34bd34; background-color: #c2ffc2;"
    }
}

function isPasswordValid() {
    // 判读强密码正则表达式
    const passwordRegex = /^.*(?=.{8,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/gm;
    // 返回bool
    return passwordRegex.test(passwordRef.value);
}
function passwordChange() {
    // 如果密码格式不正确
    if (!isPasswordValid())
    {
        messageRef.style.visibility = 'hidden';
        passwordRef.style.cssText = "border-color: #fe2e2e; background-color: #ffc2c2;"
    } else
    {
        passwordRef.style.cssText = "border-color: #34bd34; background-color: #c2ffc2;"
    }    
}

uersnameRef.addEventListener('input',function() {
    uersnameChange();
})
uersnameRef.addEventListener('blur',function() {
    uersnameChange();
})

passwordRef.addEventListener('input',function() {
    passwordChange();
})
passwordRef.addEventListener('blur',function() {
    passwordChange();
})


const offset_ori = 60;
submitBtn.addEventListener("mouseover",function() {
    // 获取元素位置返回一个位置对象
    let containerRect = document.querySelector(".container").getBoundingClientRect();
    let submitRect = submitBtn.getBoundingClientRect();

    // 当用户名或密码格式不正确时
    if (!isPasswordValid() || !isUersnameValid())
    {
        let offset = submitRect.left - containerRect.left;
        if (offset <= offset_ori)
        {
            submitBtn.style.transform = "translateX(14.6em)";   
        } else
        {
            submitBtn.style.transform = 'translateX(0)';   
        }
    }
})

submitBtn.addEventListener('click',function() {
    // 显示成功信息
    if (isPasswordValid() || isUersnameValid()) {
        messageRef.style.visibility = 'visible';
    }
})