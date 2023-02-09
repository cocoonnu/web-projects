<template>
	<div class="container">
        <!-- style="zoom: 0.8" -->
		<div class="card" style="zoom: 0.9">
            
            <!-- 右边商品展示 -->
		    <div class="shoeBackground">
		        <div class="gradients">
                    <div
                        v-for="(item,index) in colors"
                        class="gradient"
                        :class="{ first: gradientIndex == index }"
                        :color="item.color"
                    ></div>  
		        </div>
		        
                <h1 class="brand">New Balance</h1>
		        <img class="logo" src="./images/logo.png">
		        <a class="share"> 
                    <i class='bx bx-share-alt' ></i>
                </a>
	  
                <!-- 不同商品颜色展示（图片只有一张） -->
                <img
                    v-for="(item,index) in colors"
                    class="commodity"
                    :class="{ show: commodityIndex == index }"
                    :color="item.color"
                    src="./images/blue.png"
                    ref="commodity"
                >	  
		    </div>

            <!-- 左边信息介绍 -->
		    <div class="info">
		        <div class="name-container">
                    <div class="name">
                        <h1 class="name-big">耐克 Zoom KD 12</h1>
                        <span class="status" ref="status">NEW</span>
                    </div>
					<h3 class="name-small">男士运动鞋</h3>
		        </div>
		       
				<div class="description">
					<h3 class="title">产品信息</h3>
					<p class="text">
                        灵感源自 KD 对复古T恤的热爱，轻盈柔软的鞋面带来即刻舒适的体验。该鞋款柔软舒适，是日常打球的理想选择。
                    </p>
		        </div>
				
				<div class="color-container">
					<h3 class="title">颜色</h3>
					<div class="colors">
                        <span 
                            v-for="(item,index) in colors"
                            class="color"
                            :class="{ active: colorIndex == index }"
                            :key="index"
                            :color="item.color"
                            @click="changeColor(index,item.primary)"
                        ></span>
					</div>
		        </div>
		        
				<div class="size-container">
					<h3 class="title">尺码</h3>
					<div class="sizes">
                        <span
                            v-for="(item,index) in [7,8,9,10,11]" 
                            class="size"
                            :class="{ active: sizeIndex == index }"
                            @click="changeSize(index)"
                            ref="sizes"
                        >{{item}}</span>
					</div>
		        </div>
		        				
				<div class="buy-price">
					<a href="#" class="buy" ref="buy">
                        <i class='bx bxs-cart-add' ></i>
                        <span>加入购物车</span>
                    </a>
					
                    <div class="price">
						<i>￥</i>			 
						<h1>189.99</h1>
					</div>
		        </div>
				
		    </div>
		
        </div>
	</div>

</template>

<script>
export default {
    name: 'Card',

    data() {
        return {
            gradientIndex: 0,
            commodityIndex: 0,
            colorIndex: 0,
            sizeIndex: 3,
            colors: [
                {color: 'blue', primary: '#2175f5'},
                {color: 'red', primary: '#f84848'},
                {color: 'green', primary: '#29b864'},
                {color: 'orange', primary: '#ff5521'},
                {color: 'black', primary: '#000'},
            ]
        }
    },

    methods: {
        changeSize(index) {
            this.sizeIndex = index;
            for(let i=0;i<this.$refs.commodity.length;i++)
            {
                this.$refs.commodity[i].style.width = 110 + index * 10 + '%';
                this.$refs.sizes[i].style.backgroundColor = '#eee';
            }
            this.$refs.sizes[index].style.backgroundColor = this.colors[this.colorIndex].primary;
        },

        changeColor(index) {
            this.colorIndex = index;
            this.gradientIndex = index;
            this.$refs.sizes[this.sizeIndex].style.backgroundColor = this.colors[index].primary;
            this.$refs.buy.style.backgroundColor = this.colors[index].primary;
            this.$refs.status.style.backgroundColor = this.colors[index].primary;

        }
    }

}
</script>

<style lang="less" scoped>

// <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>


@myColor: #2175f5;

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: rgba(59,69,78,1.00);
    font-family: 'HONOR Sans CN','Poppins', sans-serif;
}

.container{
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    overflow: hidden;
    background-color: #efefef;
}

.card{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 860px;

    .shoeBackground{
        position: relative;
        width: 50%;
        height: 475px;
        box-shadow: -15px 0 35px rgba(0, 0, 0, 0.1),
        -15px 0 35px rgba(0, 0, 0, 0.1);
        transition: .5s;

        .gradients{
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;

            .gradient{
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                z-index: -1;
            }
            .first{
                z-index: 0;
                animation: 1s width ease;
            }

            .gradient[color="blue"]{
                background-image: linear-gradient(45deg, #0136af, #22abfa);
            }
            
            .gradient[color="red"]{
                background-image: linear-gradient(45deg, #d62926, #ee625f);
            }
            
            .gradient[color="green"]{
                background-image: linear-gradient(45deg, #11998e, #1ce669);
            }
            
            .gradient[color="orange"]{
                background-image: linear-gradient(45deg, #fc4a1a, #f7b733);
            }
            
            .gradient[color="black"]{
                background-image: linear-gradient(45deg, #000, #000);
            }


        }

        .brand{
            position: absolute;
            top: 85px;
            left: 15px;
            font-family: 'Poppins';
            font-size: 11rem;
            line-height: .9;
            color: #fff;
            opacity: .3;
        }

        .logo{
            position: absolute;
            width: 100px;
            left: 20px;
            top: 20px;
        }
      
        .share{
            position: absolute;
            top: 15px;
            right: 15px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            text-align: center;
            text-decoration: none;
            background-color: #fff;
            transition: .5s;

            i{
                font-size: 20px;
                line-height: 50px;
            }
        }

        .commodity{
            position: absolute;
            width: 140%;
            opacity: 0;
            bottom: 0;
            right: 0;
            transform: rotate(-20deg);
            transition: .5s;
        }
        .commodity.show{
            opacity: 1;
        }
    }

    .info{
        width: 50%;
        background-color: #fff;
        z-index: 1;
        padding: 35px 40px;
        box-shadow: 15px 0 35px rgba(0, 0, 0, 0.1),
        0 15px 35px rgba(0, 0, 0, 0.1);

        .title{
            font-weight: 600;
            font-size: 1.2rem;
        }


        .name-container {
            padding-bottom: 10px;
            border-bottom: 1px solid #dadada;
        
            .name {
                display: flex;
                column-gap: 7px;

                .name-big {
                    margin-right: 10px;
                    font-size: 2rem;
                    line-height: 1;
                }

                .status {
                    color: #fff;
                    width: 55px;
                    height: 28px;
                    font-size: .9rem;
                    line-height: 30px;
                    text-align: center;
                    border-radius: 3px;
                    transition: .5s;
                    margin-top: -1px;
                    background-color: @myColor;
                }
            }

            .name-small {
                color: #444;
                font-weight: 500;
                margin-top: 5px;
                text-transform: capitalize;
            }

        }

        .description {
            padding: 10px 0;
            border-bottom: 1px solid #dadada;
            
            .text{
                color: #555;
                margin-top: 5px;
                font-size: 17px;
                line-height: 24px;
            }

        }

        .color-container{
            padding: 10px 0;
            border-bottom: 1px solid #dadada;

            .colors{
                display: flex;
                align-items: center;
                padding: 8px 0;

                .active{
                    border-color: #fff!important;
                    box-shadow: 0 0 10px .5px rgba(0, 0, 0, 0.2)!important;
                    transform: scale(1.1)!important;
                }
                
                .color{
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                    margin: 0 10px;
                    border: 5px solid;
                    transition: .5s;
                    cursor: pointer;
                }
                .color[color="blue"]{
                    background-color: #2175f5;
                    border-color: #2175f5;
                }
                
                .color[color="red"]{
                    background-color: #f84848;
                    border-color: #f84848;
                }
                
                .color[color="green"]{
                    background-color: #29b864;
                    border-color: #29b864;
                }
                
                .color[color="orange"]{
                    background-color: #ff5521;
                    border-color: #ff5521;
                }
                
                .color[color="black"]{
                    background-color: #000;
                    border-color: #000;
                }
            }

        }
      
        .size-container{
            padding: 10px 0;
            margin-bottom: 10px;
            border-bottom: 1px solid #dadada;

            .sizes{
                padding: 8px 0;
                display: flex;
                align-items: center;

                .size{
                    width: 40px;
                    height: 40px;
                    border-radius: 3px;
                    background-color: #eee;
                    margin: 0 10px;
                    text-align: center;
                    line-height: 40px;
                    font-size: 1.1rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: .3s;
                }

                .size.active{
                    background-color: @myColor;
                    color: #fff;
                    transition: .5s;
                }

            }

        }
            
        .buy-price{
            padding-top: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .price{
                display: flex;
                align-items: flex-start;

                h1{
                    font-size: 2rem;
                    font-weight: 600;
                    line-height: 1;
                }

                i{
                    font-size: 1.6rem;
                    margin: 1px 5px 0 0;
                }
            }

            .buy{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 150px;
                height: 45px;
                background-color: @myColor;
                text-decoration: none;
                letter-spacing: 1px;
                font-weight: 500;
                transition: .5s;

                i{
                    color: #fff;
                    font-size: 1.5rem;
                }

                span {
                    color: #fff;
                    font-size: 1.1rem;
                    margin: 4px 0 0 5px;
                }
            }
        }
    }
}

// 动画
@keyframes width{
    from{
        width: 0%;
    }
    to{
        width: 100%;
    }
}


</style>