window.addEventListener('load',function() {

    const cookieBox = document.querySelector('.wrapper');
    let buttons = document.querySelectorAll('.button');

    // 判断cookie
    if (!this.document.cookie.includes('codinglab')) 
    {
        cookieBox.classList.add('show');
    
        buttons.forEach(function(button) {    
           
            button.addEventListener('click',function() {
                
                cookieBox.classList.remove('show');
    
                if (button.id == 'acceptBtn')
                {
                    // 设置cookies时长
                    let maxAge = 30 * 24 * 60 * 60;
                    // 设置cookie属性
                    document.cookie = `cookieBy = codinglab; max-age = ${maxAge}`;
                }
                
            })
        })
    }

})