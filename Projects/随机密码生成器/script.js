let passwordInput = document.querySelector(".password-box input"),
copyIcon = document.querySelector(".password-box i"),
rangeInput = document.querySelector(".range-box input"),
sliderNum = document.querySelector(".slider-num"),
generateBtn = document.querySelector(".generate-btn");

// 生成字符串组
var AllCharaters = [];
for (let i=33;i<=47;i++) AllCharaters.push(String.fromCharCode(i)); // 特殊字符
for (let i=48;i<=57;i++) AllCharaters.push(String.fromCharCode(i)); // 数字
for (let i=65;i<=90;i++) AllCharaters.push(String.fromCharCode(i)); // 大写字母
for (let i=97;i<=122;i++) AllCharaters.push(String.fromCharCode(i)); // 小写字母

function generatePassword() {
    let newPassword = '';
    for (let i=0;i<rangeInput.value;i++)
    {
        let rangeNum = Math.floor(Math.random() * AllCharaters.length);
        newPassword = newPassword + AllCharaters[rangeNum];
    }

    passwordInput.value = newPassword;
    copyIcon.classList.replace('icon-chenggongfuzhi','icon-fuzhi');

}
generatePassword(); // 每次刷新即执行

rangeInput.addEventListener('input',function() {
    sliderNum.innerHTML = rangeInput.value;
    generatePassword();
});

generateBtn.addEventListener('click',generatePassword);

copyIcon.addEventListener('click',function() {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.classList.replace('icon-fuzhi','icon-chenggongfuzhi');
})