<template>
    <div class="body">
        <header class="header">
            <nav class="nav">
                <a class="nav-logo">COCOON</a>

                <div class="nav-menu" ref="menu">
                    <ul class="nav-list">
                        <li>
                            <a @click="closeMenu">首页</a>
                        </li>
                        <li>
                            <a @click="closeMenu">关于</a>
                        </li>
                        <li>
                            <a @click="closeMenu">联系</a>
                        </li>
                    </ul>

                    <div class="nav-close" @click="closeMenu">
                        <i class='bx bx-x'></i>
                    </div>
                </div>

                <div class="nav-toggle" @click="showMenu">
                    <i class='bx bx-grid-alt' ></i>
                </div>
            </nav>
        </header>

        <section class="home">
            <div class="home-container">

                <div class="home-data animate__animated animate__fadeInDown" >
                    <span class="subtitle">Error 404</span>
                    <h1 class= "title">页面丢失</h1>
                    <p class="description">
                        您要寻找的页面不存在 <br> 请尝试重新搜索
                    </p>
                    <button>
                        返回首页
                    </button>
                </div>

                <div class="home-img animate__animated animate__fadeInUp">
                    <img src="./images/ghost.png">
                    <div class="shadow"></div>
                </div>

            </div>

            <div class="home-footer animate__animated animate__fadeInUp">
                <span>cocoon</span>
                <span>|</span>
                <span>2806525575@qq.com</span>
            </div>
        </section>

    </div>
</template>

<script>
export default {
    name: 'Notfound',

    methods: {
        showMenu() {
            this.$refs.menu.style.top = '0';
        },

        closeMenu() {
            this.$refs.menu.style.top = '-100%';
        }
    }
}
</script>

<style lang="less" scoped>

// 引入字体
@import url('https://fonts.font.im/css?family=Source+Sans+Pro');


// 设置变量
@header-height: 3.5rem;

@first-color: hsl(38, 69%, 59%);
@text-color: hsl(38, 8%, 8%);

@body-font: 'HONOR Sans CN','Source Sans Pro', sans-serif;
@biggest-font-size: 2.375rem;
@normal-font-size: 1rem;
@smaller-font-size: .8rem;


// 动画
@keyframes floaty {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(15px);
    }
}

@keyframes shadow {
    0% {
        transform: scale(1, 1);
    }
    100% {
        transform: scale(.85, .85);
    }
}

.animate__animated {
    animation-duration: 2s;
    animation-delay: 0.2s;
}


// 移动端适配（视口宽度：0 - 767px）
.body {
    position: relative;
    width: 100%;
    min-height: 100vh;
    font-family: @body-font;
    font-size: @normal-font-size;
    color: @text-color;
    user-select: none;

    .header {
        // 头部使用固定定位
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 100;

        .nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: @header-height;
            margin: 0 1.5rem;


            .nav-logo {
                display: inline-flex;
                font-weight: 800;
            }

            .nav-toggle {
                display: inline-flex;
                font-size: 1.25rem;
                cursor: pointer;
            }


        }
    }

    .home {
        height: 100vh;
        padding: 9rem 0 2rem;
        background: @first-color;
        overflow: hidden;

        .home-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            row-gap: 2.5rem;

            .home-data {
                text-align: center;

                .title {
                    font-size: @biggest-font-size;
                    margin: .75rem 0;
                }

                button {
                    border: 0;
                    color: #e8eef1;
                    margin-top: 2rem;
                    background: @text-color;
                    padding: .8rem 1.5rem;
                    border-radius: 3rem;
                    cursor: pointer;
                }
            }

            .home-img {
                img {
                    width: 230px;
                    animation: floaty 1.8s infinite alternate;
                }

                .shadow {
                    width: 130px;
                    height: 24px;
                    border-radius: 50%;
                    // 高斯模糊
                    background-color: hsla(38, 21%, 19%, .16);
                    filter: blur(6px);
                    // 水平居中
                    margin: 0 auto;
                    animation: shadow 1.8s infinite alternate;
                }
            }
        }

        .home-footer {
            display: flex;
            justify-content: center;
            column-gap: .5rem;
            font-size: @smaller-font-size;
            margin-top: 3rem;
            animation-delay: 0.8s;
        }

    }

}



// 移动端适配（视口宽度：0 - 767px）（针对 nav-menu ）
@media screen and (max-width: 767px) {
    .nav-menu {
        position: fixed;
        background-color: @first-color;
        left: 0;
        top: -100%;
        width: 100%;
        padding: 5rem 0 4rem;
        border-radius: 0 0 1.5rem 1.5rem;
        box-shadow: 0 2px 4px hsla(38, 4%, 15%, .15);
        transition: .6s ease-in-out;

        .nav-list {
            display: flex;
            flex-direction: column;
            text-align: center;
            // 行间距
            grid-row-gap: 2rem;
        }

        .nav-close {
            position: absolute;
            top: 1rem;
            right: 1.5rem;
            font-size: 1.5rem;
            cursor: pointer;
        }

    }
}


// 电脑端适配（视口宽度：767 - ）
@media screen and (min-width: 767px) {
    .body .header .nav {
        margin: 0 4rem;
        height: (@header-height + 1.5rem);

        .nav-list {
            display: flex;
            column-gap: 2rem;
        }
    
        .nav-close, .nav-toggle {
            display: none!important;
        }
    }

    .body .home .home-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        column-gap: 5rem;

        .home-data {
            .title {
                font-size: (@biggest-font-size + 1.5rem);
                margin: 1rem 0;
            }
        }

        .home-img {
            img {
                width: 400px;
            }

            .shadow {
                width: 250px;
                height: 40px;
            }
        }

    }
}

</style>