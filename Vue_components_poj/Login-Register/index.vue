<template>
    <div class="container" ref="container">

        <!-- 表单盒子 -->
        <div class="forms-container">
            
            <!-- 登录注册表单 -->
            <div class="signin-signup">
                <form class="sign-in-form">
                    <h2 class="title">登录</h2>

                    <div class="input-field">
                        <i><span class="iconfont icon-yonghu"></span></i>
                        <input type="text" placeholder="用户名">
                    </div>

                    <div class="input-field">
                        <i><span class="iconfont icon-mima"></span></i>
                        <input type="password" placeholder="密码">
                    </div>

                    <button class="btn">立即登录</button>

                    <p class="social-text">选择其他平台登录</p>
                    <div class="social-media">
                        <a href="javascript:void(0);" class="social-icon">
                            <span class="iconfont icon-xinlangweibo"></span>
                        </a>
                        <a href="javascript:void(0);" class="social-icon">
                            <span class="iconfont icon-weixin"></span>
                        </a>
                        <a href="javascript:void(0);" class="social-icon">
                            <span class="iconfont icon-QQ"></span>
                        </a>
                        <a href="javascript:void(0);" class="social-icon">
                            <span class="iconfont icon-alipay"></span>
                        </a>
                    </div>

                </form>

                <form class="sign-up-form">
                    <h2 class="title">注册</h2>

                    <div class="input-field">
                        <i><span class="iconfont icon-yonghu"></span></i>
                        <input type="text" placeholder="用户名">
                    </div>

                    <div class="input-field">
                        <i><span class="iconfont icon-youxiang"></span></i>
                        <input type="text" placeholder="邮箱">
                    </div>

                    <div class="input-field">
                        <i><span class="iconfont icon-mima"></span></i>
                        <input type="password" placeholder="密码">
                    </div>

                    <button class="btn">立即登录</button>

                    <p class="social-text">选择其他平台登录</p>
                    <div class="social-media">
                        <a class="social-icon">
                            <span class="iconfont icon-xinlangweibo"></span>
                        </a>
                        <a class="social-icon">
                            <span class="iconfont icon-weixin"></span>
                        </a>
                        <a class="social-icon">
                            <span class="iconfont icon-QQ"></span>
                        </a>
                        <a class="social-icon">
                            <span class="iconfont icon-alipay"></span>
                        </a>
                    </div>

                </form>
            </div>

        </div>

        <!-- 文字信息盒子 -->
        <div class="panels-container">
            <div class="panel left-panel">
                
                <div class="content">
                    <h3>欢迎访问！</h3>
                    <p>加入我们，成为本站的一份子吧。</p>
                    <button class="btn" @click="addMove">去注册</button>
                </div>

                <img src="./images/login.svg">
            </div>

            <div class="panel right-panel">
                
                <div class="content">
                    <h3>已有账号？</h3>
                    <p>立即登录，一键享受独家权益。</p>
                    <button class="btn" @click="delMove">去登录</button>
                </div>

                <img src="./images/register.svg">
            </div>
        </div>
    
    </div>
</template>

<script>
// 引入字体图标
import './font/iconfont.css'

export default {
    name: 'Login',

    methods: {
        addMove() {
            this.$refs.container.classList.add('move');
        },
        
        delMove() {
            this.$refs.container.classList.remove('move');
        }
    }
}
</script>

<style scoped>
/* z-index：panel > container:before  >  signin-signup */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "HONOR Sans CN";
    text-decoration: none;
    user-select: none;
}

/* 最外层占据整个窗口大小 */
.container {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background-color: #fff;
    overflow: hidden;
}

/* 利用最外层盒子的伪元素创造蓝色背景 */
.container:before {
    content: '';
    width: 2000px;
    height: 2000px;
    position: absolute;
    top: -10%;
    right: 48%;
    transform: translateY(-50%);
    border-radius: 50%;
    background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
    z-index: 6;
    transition: 1.8s ease-in-out;
} 
/* 蓝色背景的动画（当添加 .move 时执行） */
.container.move:before {
    transform: translate(100%,-50%);
    right: 52%;
}


/*                       表单样式                       */


/* forms-container 占据整个父盒子大小（占据整个窗口） */
.forms-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

/* signin-signup 使用绝对定位+grid */
.signin-signup {
    z-index: 5;
    position: absolute;
    top: 50%;
    transform: translate(-50%,-50%);
    left: 75%;
    transition: 1s .7s ease-in-out;
    /* 设置该盒子宽度 */
    width: 50%;

    /* 将两个 form 表单空间压缩成只有一个（一） */
    display: grid;
    grid-template-columns: 1fr;
}

/* form 表单（宽度默认为父类盒子的100%） */
form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: rgba(59,69,78,1.00);
    padding: 0.5rem;
    overflow: hidden;
    /* 当 form 需要变化的时候添加过渡 作为延时 */
    transition: .2s .7s ease-in-out;

    /* 将两个 form 表单空间压缩成只有一个（二） */
    grid-column: 1 / 2;
    grid-row: 1 / 2;
}

/* 登录表单 */
form.sign-in-form {
    z-index: 2;
}

/* 注册表单 */
form.sign-up-form {
    z-index: 1;
    opacity: 0;
}


.title {
    font-size: 2.2rem;
    margin-bottom: 10px;
}

/* input-field 输入框div */
.input-field {
    /* 响应式宽度 默认占满 signin-signup 盒子 */
    max-width: 380px;
    width: 100%;
    height: 55px;
    margin: 10px 0;
    background-color: #f0f0f0;
    border-radius: 55px;

    /* 将两个子元素按比例划分 */
    display: grid;
    grid-template-columns: 15% 85%;
}

/* icon 图标居中显示 */
.input-field i {
    display: flex;
    justify-content: center;
    align-items: center;
}

.input-field i span {
    font-size: 1.1rem;
    color: #acacac;
    margin-top: -1.5px;
}

.input-field input {
    background: none;
    border: none;
    outline: none;
    font-size: 1.1rem;
    color: #333;
}

.input-field input::placeholder {
    color: #aaa;
}

.btn {
    width: 150px;
    height: 49px;
    border: none;
    outline: none;
    margin: 10px 0;
    color: #fff;
    border-radius: 49px;
    font-size: 1.1rem;
    background-color: #5995fd;
    cursor: pointer;
    transition: 0.5s;
}

.btn:hover {
    background-color: #4d84e2;
}

.social-text {
    font-size: 1rem;
    padding: 1rem 0;
}

.social-media {
    display: flex;
    justify-content: center;
}

.social-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 46px;
    height: 46px;
    color: #333;
    border: 1.1px solid #333;
    border-radius: 50%;
    margin: 0 10px;
    cursor: pointer;
}
.social-icon:hover {
    border: 1.1px solid #4d84e2;
}

.social-icon span {
    font-size: 1.2rem;
}
.social-icon:hover span {
    color: #4d84e2;
}


/*                       文字信息样式                       */

.panels-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;    
    /* 分成两列 */
    display: grid;
    grid-template-columns: repeat(2,1fr);
}

.panel {
    /* 内容上下分散对齐 左右居中对齐 */
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    text-align: center;
    z-index: 7;
}

.left-panel {
    padding: 3rem 17% 2rem 12%;
}

.right-panel {
    /* 整个盒子无法被点击选中 */
    pointer-events: none;
    padding: 3rem 12% 2rem 17%;
}

.content {
    color: #fff;
    transition: .9s .6s ease-in-out;
}

.content h3 {
    font-size: 2rem;
    line-height: 1;
}

.content p {
    font-size: 1rem;
    padding: 1rem 0;
}

.content button {
    background: none;
    border: 2px solid #fff;
    width: 130px;
    height: 40px;
    font-size: 1rem;
}

.panel img {
    width: 90%;   
    transition: 1.1s .4s ease-in-out;
}

/* 右边文字信息暂时隐藏 */
.right-panel .content, .right-panel img {
    transform: translateX(800px);
} 


/*                       登录注册转换                      */

/* 左边文字信息隐藏 右边出现 */
.container.move .left-panel .content,
.container.move .left-panel img {
    transform: translateX(-800px);
}

.container.move .right-panel .content, 
.container.move .right-panel img {
    transform: translateX(0px);
} 

/* 开启 pointer-events */
.container.move .right-panel {
    pointer-events: all;
}

.container.move .left-panel {
    pointer-events: none;
}

/* form 表单切换 */
.container.move .signin-signup {
    left: 25%;
}
.container.move form.sign-up-form {
    z-index: 2;
    opacity: 1;
}
.container.move form.sign-in-form {
    z-index: 1;
    opacity: 0;
}



/*                       平板手机端适配（视口宽度：570 - 870px）                      */

@media (max-width: 870px) {
    .container {
        min-height: 800px;
        height: 100vh;
    }

    .container:before {
        width: 1500px;
        height: 1500px;
        transform: translateX(-50%);
        left: 30%;
        bottom: 68%;
        /* right top 用初始值（不是0）而不是继承之前的  */
        right: initial;
        top: initial;
        transition: 2s ease-in-out;
    }

    .signin-signup {
        /* 宽度占满整个窗口 */
        width: 100%;
        top: 95%;
        left: 50%;
        transform: translate(-50%,-100%);
        transition: 1s .8s ease-in-out;
    }

    .panels-container {
        /* 分成一列 三行（1:2:1） */
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 2fr 1fr;
    }

    .panel {
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding: 2.5rem 8%;
    }

    .left-panel {
        grid-row: 1 / 2;
    }

    .right-panel {
        grid-row: 3 / 4;
    }

    .panel img {
        width: 200px;
        transition: transform 0.9s ease-in-out;
    }

    .content {
        padding-right: 15%;
        transition: transform 0.9s ease-in-out;
        transition-delay: 0.8s;
    }

    .content h3 {
        font-size: 1.7rem;
    }

    .content p {
        font-size: 0.8rem;
        padding: 1rem 0;
    }

    .content button {
        width: 110px;
        height: 35px;
        font-size: 0.8rem;
    }

    .right-panel .content, .right-panel img {
        transform: translateY(300px);
    } 

    /*    登录注册转换     */
    .container.move:before {
        transform: translate(-50%, 100%);
        bottom: 32%;
        right: initial;
    }

    .container.move .left-panel .content,
    .container.move .left-panel img {
        transform: translateY(-300px);
    }

    .container.move .signin-signup {
        left: 50%;
        top: 5%;
        transform: translate(-50%, 0);
    }
}


/*                       手机端适配（视口宽度：0 - 570px）                      */

@media (max-width: 570px) {
    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-right: 0%;
    }

    .panel img {
        display: none;
    }

    .container:before {
        bottom: 72%;
        left: 50%;
    }

    .container.move:before {
        bottom: 28%;
        left: 50%;
    }

}
</style>