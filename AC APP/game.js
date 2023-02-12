class AcGameMenu
{
    constructor(root)
    {

        this.root = root;
        this.$menu = $(`
<div class="ac-game-menu" >

  <div class="ac-game-menu-field">

   <div class="ac-game-menu-field-item ac-game-menu-field-item-single-mode">
      开始游戏
    </div>

    <br>

    <div class="ac-game-menu-field-item ac-game-menu-field-item-logout">
      退出登录
    </div>

    <br>

    <div class="ac-game-menu-field-item ac-game-menu-field-item-settings">
      游戏说明
    </div>

  </div>
</div>
`);

        this.root.$ac_game.append(this.$menu);

        this.$single_mode = this.$menu.find('.ac-game-menu-field-item-single-mode');
        this.$settings = this.$menu.find('.ac-game-menu-field-item-settings');
        this.$logout = this.$menu.find('.ac-game-menu-field-item-logout');

        this.start();
    }

    add_listening_events() {

        let outer = this;

        this.$single_mode.click(function(){
            outer.hide();
            outer.root.playground.show("single mode");
        });

        this.$settings.click(function(){
            outer.hide();
            outer.root.info.show();
        });


        this.$logout.click(function(){
            outer.root.settings.logout_on_remote(); // 点击到退出就登出账号
        });
    }

    start() {
        this.show();
        this.add_listening_events();
    }

    show() {  // 显示menu界面
        this.$menu.show();
    }

    hide() {  // 关闭menu界面
        this.$menu.hide();
    }

}
let AC_GAME_OBJECTS = []; // 储存所有“可动物体”的全局数组

//创建“可动物体”基类
class AcGameObject
{
    constructor() // 构造函数
    {
        AC_GAME_OBJECTS.push(this); //将这个对象加入到储存动元素的全局数组里

        this.has_call_start = false; // 记录这个对象是否已经调用了start函数
        this.timedelta = 0; // 当前距离上一帧的时间间隔，相等于时间微分

    }

    start()
    {
        // 只会在第一帧执行一次的过程
    }

    update()
    {
        // 每一帧都会执行的过程
    }
    late_update()
    {   //每一帧均会执行一次，且在所有 update 执行完后才执行

    }

    //基类需定义销毁函数  on_destroy()派生类自己定义
    destroy()
    {
        this.on_destroy();

        // 删除
        for(let i=0; i<AC_GAME_OBJECTS.length; ++i)
        {
            if (AC_GAME_OBJECTS[i] === this)
             {
                 AC_GAME_OBJECTS.splice(i, 1); //删除元素函数splice()
                 break;
             }
        }
    }

    on_destroy()
    {
        // 被删除之前执行的函数
    }
}


//实现每一帧都调用AC_GAME_ANIMATION函数：
//AC_GAME_ANIMATION又每次都执行update函数

let last_timestp; // 上一帧的时间

let AC_GAME_ANIMATION = function(timestp) //传入当前时间
{
    for (let i = 0; i < AC_GAME_OBJECTS.length; ++ i)
    {
        let obj = AC_GAME_OBJECTS[i];

        if (!obj.has_called_start)
        {
            obj.start();
            obj.has_called_start = true; // 表示已经调用过start()了
        }
        else
        {
            obj.timedelta = timestp - last_timestp; // 时间间隔
            obj.update(); // 不断调用
        }

    }
    for (let i = 0; i < AC_GAME_OBJECTS.length; i ++ )
    {
        let obj = AC_GAME_OBJECTS[i];
        obj.late_update();
    }

    last_timestp = timestp;

    requestAnimationFrame(AC_GAME_ANIMATION); // 不断递归调用从而实现每一帧都调用
}

requestAnimationFrame(AC_GAME_ANIMATION); // JS的API,一帧下执行该函数


class Particle extends AcGameObject
{
    constructor(playground, x, y, radius, color, vx, vy, speed)
    {
        super();

        AC_GAME_OBJECTS.splice()

        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.eps=1;

        this.vx = vx;
        this.vy = vy;
        this.speed = speed;
    }

    render()
    {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius,0,Math.PI*2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    start()
    {
        this.friction_speed = 0.85;
        this.friction_radius = 0.9;
    }

    update()
    {
        this.update_move();
        this.render();
    }

    update_move()
    {
        if (this.speed < this.eps || this.radius < this.eps)
        {
            this.destroy();
            return false;
        }

        this.x += this.vx * this.speed * this.timedelta / 1000;
        this.y += this.vy * this.speed * this.timedelta / 1000;

        this.speed *= this.friction_speed;
        this.radius *= this.friction_radius;
    }

    is_attacked_ice(obj)
    {
        return false;
    }
    is_attacked_fire(obj)
    {
        return false;
    }


}
//创建地图类 继承AcGameObject

class GameMap extends AcGameObject
{
    //创建GameMap对象时 要传入AcGamePlayground对象
    constructor(playground)
    {
        super(); // 调用基类的构造函数 一定要放在最前面！！！

        this.playground = playground;

        this.$canvas = $(`<canvas></canvas>`); // canvas是画布

        this.ctx = this.$canvas[0].getContext('2d'); // ctx是画笔

        this.ctx.canvas.width = this.playground.width;
        this.ctx.canvas.height = this.playground.height;

        this.playground.$playground.append(this.$canvas); //将画布添加到AcGamePlayground下div变量$playground中
    }

    render()
    {
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.15)";

        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); // 画上给定的坐标的矩形
    }

    start()
    {

    }

    update()
    {
        this.render();
    }

}
class Info {
    constructor(root) {
        this.root = root; //AcGame

        this.$info = $(`

<div class="ac-game-info">

    <div class="ac-game-info-item">

        <div class="ac-game-info-title">
        游戏说明
        </div>
        <div class="ac-game-info-tip">
         注：开局4秒内无法攻击 &nbsp游戏刷新恢复默认
        </div>

        <div class="ac-game-info-list">
            <p>● 鼠标左键移动 、右键搭配按键发动技能</p>
            <p>● Q：火球 W：冰球 F：闪现</p>
            <p>● 火球：缩小1/4、速度加快</p>
            <p>● 冰球：增大1/8、速度变慢</p>
            <p>● 技能CD：0.5s 、闪现CD：2s</p>

            <p>● 电脑玩家数量:
            <button class="button-add"><b>+</b></button>&nbsp
            <button class="button-reduce"><b>-</b></button>
            </p>

            <p>● 游戏难度等级:
            <button class="button-add-level"><b>+</b></button>&nbsp
            <button class="button-reduce-level"><b>-</b></button>
            </p>

        </div>

        <br>
        <div class="ac-game-info-back">
            <button>返回</button>
        </div>

    </div>

</div>

`);

        this.root.$ac_game.append(this.$info);//加入主html
        this.$add = this.$info.find(".button-add");
        this.$reduce = this.$info.find(".button-reduce");
        this.$back = this.$info.find(".ac-game-info-back button");
        this.$tip = this.$info.find(".ac-game-info-tip");
        this.$add_level = this.$info.find(".button-add-level");
        this.$reduce_level = this.$info.find(".button-reduce-level");

        this.start();
    }

    //监听系统
    add_listening_events() {
        let outer = this;

        this.$add.click(function () {
            outer.add();
            outer.get_tip();
        });
        this.$reduce.click(function () {
            outer.reduce();
            outer.get_tip();
        });

        this.$add_level.click(function () {
            outer.add_level();
            outer.get_tip();
        });
        this.$reduce_level.click(function () {
            outer.reduce_level();
            outer.get_tip();
        });

        this.$back.click(function () {
            outer.back();
        });

    }

    //返回
    back() {
        this.hide();
        this.root.menu.show();
    }

    add() {
        this.root.playground.num += 1;
    }

    reduce() {
        if(this.root.playground.num > 0)
        {
            this.root.playground.num -= 1;
        }
    }

    add_level() {
        if(this.root.playground.AI_level >= 200)
        {
            this.root.playground.AI_level -= 100.0;
            this.root.playground.level += 1;
        }
    }

    reduce_level() {
        if(this.root.playground.AI_level <= 1000)
        {
            this.root.playground.AI_level += 100.0;
            this.root.playground.level -= 1;
        }
    }

    get_tip() {
        var str_tip = "注：当前电脑玩家数量：" + this.root.playground.num.toString() + "人  " + "战斗力：" + this.root.playground.level.toString() + "0%";
        this.$tip.html(str_tip);
    }

    hide() {
        this.$info.hide();
    }

    show() {
        this.$info.show();
    }

    start() {
        this.hide();
        this.add_listening_events();
    }
}

class Player extends AcGameObject
{
    constructor(playground, x, y, radius, color, speed, character, username, photo)
    {
        super();

        this.playground = playground;
        this.ctx = this.playground.game_map.ctx; // 操作的画笔

        this.x = x;  // 起始位置坐标
        this.y = y;
        this.radius = radius; // 半径
        this.o_radius = radius; // 初始半径
        this.color = color; // 颜色

        this.character = character; // 玩家类型
        this.username = username;
        this.photo = ''; // 玩家头像

        this.speed = speed; // 速度
        this.is_alive = true; // 是否存活

        this.eps = 0.1; // 精度

        this.vx=0;//x方向上的速度
        this.vy=0;
        this.move_length=0;//与目标点的距离

        this.cur_skill=null;//火球
        this.ice_skill=null;//冰球
        this.blink_skill=null;//闪现

        this.cold_time= 5;//电脑玩家技能冷却时间


        //碰撞参数：speed_demage和friction_damage决定碰撞距离和时间
        //碰撞参数：eps * 100决定眩晕时间 不要去改参数了！！！

        // 设置玩家头像
        if (this.character != "robot")
        {
            this.img = new Image();
            this.img.src = this.photo;
        }

        if(this.character == "me")
        {
            this.skill_coldtime=4;//技能cd 开始4秒不能发技能 技能函数那里设置cd为0.5
            this.blink_coldtime=0;
        }


    }

    render()
    {
        if (this.character != "robot")
        {
            //玩家头像
            // this.ctx.save();
            // this.ctx.beginPath();
            // this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            // this.lineWidth = this.eps * 10;
            // this.ctx.stroke();
            // this.ctx.clip();
            // this.ctx.drawImage(this.img, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
            // this.ctx.restore();

            // 先定义为白色
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            this.ctx.fillStyle = '#fff';
            this.ctx.fill();

        }
        else
        {
            //电脑玩家画圆
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0,Math.PI*2, false);
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
        }

    }



    //监听系统 各函数同时监听
    add_listening_events()
    {
        //养成习惯 在函数中把this赋给outer
        let outer=this;

        //API:取消右键菜单
        this.playground.game_map.$canvas.on("contextmenu", function(){
            return false;
        });

        //API:鼠标监听 e.which：3右键 1左键 2滚轮
        this.playground.game_map.$canvas.mousedown(function(e){

            //画布(0,0)坐标为(rect.left,rect.top)
            const rect = outer.ctx.canvas.getBoundingClientRect();


            //右键移动
            if( e.which === 1 )
            {
                outer.move_to(e.clientX-rect.left, e.clientY-rect.top);
            }

            //左键放技能
            if( e.which === 3 )
            {
                if(outer.cur_skill === "fireball")
                {
                    outer.shoot_fireball(e.clientX-rect.left,e.clientY-rect.top);
                }

                outer.cur_skill=null;//用完清空技能

                if(outer.ice_skill === "iceball")
                {
                    outer.shoot_iceball(e.clientX-rect.left,e.clientY-rect.top);
                }

                outer.ice_skill=null;//用完清空技能

                if(outer.blink_skill === "blink")
                {
                    outer.blink(e.clientX-rect.left,e.clientY-rect.top);
                }

                outer.blink_skill=null;//用完清空技能

            }

        });

        //API:键盘监听 e.which：81Q 87W 70F
        $(window).keydown(function(e){

            if(!outer.is_alive) return false;

            //火球、冰球技能冷却
            if(outer.skill_coldtime > outer.eps) return false;

            //键盘决定技能
            if(e.which === 81)
            {
                outer.cur_skill="fireball";
                return false;
            }
            if(e.which === 87)
            {
                outer.ice_skill="iceball";
                return false;
            }
            if(e.which === 70)
            {
                //闪现技能冷却
                if(outer.blink_coldtime > outer.eps) return false;
                outer.blink_skill="blink";
                return false;
            }

        });

    }

//**********移动函数+更新移动函数**********

    //移动参数函数  当前玩家在监听系统会用到
    move_to(tx, ty)
    {
        this.move_length = this.get_dist(this.x, this.y, tx, ty);

        let dx = tx - this.x, dy = ty - this.y;
        let angle = Math.atan2(dy, dx); //atan2()计算角度

        this.vx = Math.cos(angle);
        this.vy = Math.sin(angle); // vy是这个速度的y上的速度
    }

    //玩家更新移动  碰撞优先级最高
    update_move()
    {
        //被技能碰撞时的移动  碰撞速度小于eps*10时恢复正常
        if (this.speed_damage && this.speed_damage > this.eps * 100)
        {
            this.vx = this.vy = 0;//不能自己动
            this.move_length = 0;

            this.x += this.x_damage * this.speed_damage * this.timedelta / 1000;
            this.y += this.y_damage * this.speed_damage * this.timedelta / 1000;
            this.speed_damage *= this.friction_damage;//速度逐渐变慢
        }

        //正常移动
        if (this.move_length < this.eps)
        {
            this.move_length = 0;
            this.vx = this.vy = 0;
        }
        else
        {
            let moved = Math.min(this.move_length, this.speed * this.timedelta / 1000); // 每个时间微分里该走的距离

            this.x += this.vx * moved;
            this.y += this.vy * moved;

            this.move_length -= moved;
        }
    }

    //电脑玩家到终点后更新移动
    update_AI_move()
    {
        if (this.move_length < this.eps)
        {
            let tx = Math.random() * this.playground.width;
            let ty = Math.random() * this.playground.height;

            this.move_to(tx, ty);
        }
    }

//**********移动函数+更新移动函数**********


//**********技能函数**********

    //发射火球
    shoot_fireball(tx, ty)
    {
        let x = this.x, y = this.y;
        let radius = this.playground.height * 0.01; // 半径
        let color = "orange"; // 颜色
        let damage = this.playground.height * 0.01; // 伤害值 身体缩小

        let angle = Math.atan2(ty - this.y, tx - this.x); // 角度
        let vx = Math.cos(angle), vy = Math.sin(angle); // 方向
        let speed = this.playground.height * 0.5; // 速度
        let move_dist = this.playground.height * 0.6; // 射程

        this.skill_coldtime = 0.5;

        new FireBall(this.playground, this, x, y, radius, color, damage, vx, vy, speed, move_dist);
    }

    //发射冰球
    shoot_iceball(tx, ty)
    {
        let x = this.x, y = this.y;
        let radius = this.playground.height * 0.01; // 半径
        let color = "#178adc"; // 颜色
        let damage = this.playground.height * 0.01; // 伤害值

        let angle = Math.atan2(ty - this.y, tx - this.x); // 角度
        let vx = Math.cos(angle), vy = Math.sin(angle); // 方向
        let speed = this.playground.height * 0.5; // 速度
        let move_dist = this.playground.height * 0.6; // 射程

        this.skill_coldtime = 0.5;

        new IceBall(this.playground, this, x, y, radius, color, damage, vx, vy, speed, move_dist);
    }

    blink(tx,ty)
    {
        let d = this.get_dist( this.x, this.y, tx, ty);
        d = Math.max(d,0.8);
        let angle = Math.atan2( ty-this.y, tx-this.x);

        //直接瞬移
        this.x += d*Math.cos(angle);
        this.y += d*Math.sin(angle);
        this.blink_coldtime = 2;
    }


    //电脑玩家发射攻击
    AI_shoot_ball()
    {
        if (Math.random() < 1 / this.playground.AI_level)
        {
            let player = this.playground.players[0];
            let flag = Math.floor(Math.random() * 3) + 1;
            if(flag == 1)
            {
                this.shoot_iceball(player.x, player.y);
            }
            else
            {
                this.shoot_fireball(player.x, player.y);
            }
        }
    }

    //电脑玩家冷静期更新
    AI_cold_time()
    {
        if (this.cold_time > 0) // 如果处于冷静期，就不能放技能
        {
            this.cold_time -= this.timedelta / 1000; // 冷静期流逝
            return false;
        }
        return true; // 过了冷静期，可以放技能了，返回true
    }


    //碰撞时释放粒子
    explode_particle()
    {
        for (let i = 0; i < 5 + Math.random() * 5; ++ i)
        {
            let x = this.x, y = this.y;
            let radius = this.radius / 3;
            let angle = Math.PI * 2 * Math.random(); // 随机方向
            let vx = Math.cos(angle), vy = Math.sin(angle);
            let color = this.color;
            let speed = this.speed * 10;

            new Particle(this.playground, x, y, radius, color, vx, vy, speed);
        }
    }


//**********技能函数**********


//**********碰撞函数**********
//obj：火球或其他技能  this：玩家
//玩家受碰撞后在FireBall里的hit()中执行一下两个函数
//is_attacked()、is_attacked_concrete()修改玩家受碰撞的参数
//玩家受碰撞的动态在update_move()里面

    is_attacked_fire(obj)
    {
        let angle = Math.atan2(this.y - obj.y, this.x - obj.x);
        let damage = obj.damage;
        this.explode_particle(); // 爆发粒子

        this.speed *= 1.2;
        this.radius -= damage; // 这里半径就是血量

        this.friction_damage = 0.92; // 击退速度变慢的加速度

        if (this.is_died()) return false; // 是否销毁

        this.x_damage = Math.cos(angle);
        this.y_damage = Math.sin(angle);
        this.speed_damage = damage * 150; // 击退时的速度
    }

    is_attacked_ice(obj)
    {
        let angle = Math.atan2(this.y - obj.y, this.x - obj.x);
        let damage = obj.damage;
        this.explode_particle(); // 爆发粒子

        this.friction_damage = 0.92; // 击退速度变慢的加速度

        if (this.is_died()) return false; // 是否销毁

        this.x_damage = Math.cos(angle);
        this.y_damage = Math.sin(angle);
        this.speed_damage = damage * 150; // 击退时的速度

        let num = 3;
        if(this.radius<this.o_radius)
        {
            this.radius += damage / num; // 这里半径就是血量
        }

        this.speed *= 0.9;
    }


    is_died()
    {
        if (this.radius < 10 ) //半径小于此数则销毁
        {
            this.destroy();
            return true;
        }
        return false;
    }

//**********碰撞函数**********


//**********更新函数**********
//区分当前玩家和电脑玩家+在AcGameObject中实现了每一帧都调用

    start()
    {
        this.playground.player_count ++ ;
        if (this.playground.player_count >= 2)
        {
            this.playground.state = "fighting";
        }

        if( this.character == "me" )
        {
            this.add_listening_events();
        }
        if( this.character == "robot" )
        {
            let ty = Math.random() * this.playground.height;
            let tx = Math.random() * this.playground.width;

            this.move_to(tx,ty);
        }

    }

    update()
    {
        this.update_win();
        this.update_AI();//电脑玩家执行 当前玩家跳过

        if(this.character == "me")
        {
            this.update_coldtime();
        }

        this.update_move();
        this.render();
    }

    update_AI()
    {
        if (this.character != "robot") return false;
        this.update_AI_move();

        if (!this.AI_cold_time()) return false;
        this.AI_shoot_ball(); //发射技能
    }

    update_coldtime()
    {
        this.skill_coldtime -= this.timedelta / 1000; // 冷静期流逝
        this.skill_coldtime = Math.max(this.skill_coldtime, 0);

        this.blink_coldtime -= this.timedelta / 1000; // 冷静期流逝
        this.blink_coldtime = Math.max(this.blink_coldtime, 0);
    }

    update_win()
    {
        // 竞赛状态，且只有一名玩家，且改名玩家就是我，则胜利
        if (this.playground.state === "fighting" && this.character === "me" && this.playground.players.length === 1)
        {
            this.playground.state = "over";
            this.playground.score_board.win();
        }
    }


//**********更新函数**********


//**********辅助函数**********
    get_dist(x1, y1, x2, y2)
    {
        let dx = x1 - x2, dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }

    on_destroy() // 死之前执行
    {
        this.is_alive = false;
        for (let i = 0; i < this.playground.players.length; ++ i)
        {
            let player = this.playground.players[i];
            if (this === player)
            {
                this.playground.players.splice(i, 1);
            }
        }

        // 我死亡，且游戏处于竞赛状态，则失败
        if (this.character === "me" && this.playground.state === "fighting")
        {
            this.playground.state = "over";
            this.playground.score_board.lose();
        }

    }

//**********辅助函数**********

}//class
class ScoreBoard extends AcGameObject {
    constructor(playground) {
        super();
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;

        this.state = null;  // win-胜利；lose-失败

        this.win_img = new Image();
        this.win_img.src = "https://cdn.acwing.com/media/article/image/2022/08/18/164641_2c15d7061e-5c7600a50a26e.png";

        this.lose_img = new Image();
        this.lose_img.src = "https://cdn.acwing.com/media/article/image/2022/08/18/164641_2c15d7061e-5c7600a50a26e.png";

        this.text = "请等待两秒后按任意键继续";
    }
    start()
    {
        //this.win();
        //this.lose();
    }

    add_listening_events()
    {    //点击后，返回菜单页面
        let outer = this;
        let $canvas = this.playground.game_map.$canvas;

        $canvas.on('click', function() {
            outer.playground.hide();
            outer.playground.root.menu.show();
        });
    }

    win()
    {
        this.state = "win";
        let outer = this;
        setTimeout(function() {
            outer.add_listening_events();
        }, 2000);   //2秒后监听点击事件
    }

    lose()
    {
        this.state = "lose";
        let outer = this;
        setTimeout(function() {
            outer.add_listening_events();
        }, 2000);   //2秒后监听点击事件
    }

    late_update()
    {
        this.render();  //渲染在图层最上方
    }
    render() {

        let len = this.playground.height * 0.5;

        if (this.state === "win")
        {
            this.ctx.drawImage(this.win_img, this.playground.width / 2 - len / 2, this.playground.height / 2 - len / 2, len, len);
        }
        else if (this.state === "lose")
        {
            this.ctx.drawImage(this.lose_img, this.playground.width / 2 - len / 2, this.playground.height / 2 - len / 2, len, len);
        }

        if (this.state === "win" || this.state === "lose")
        {
            this.ctx.font = "20px serif";
            this.ctx.fillStyle = "white";
            this.ctx.textAlign = "center";
            this.ctx.fillText(this.text, this.playground.width / 2, 20);
        }

    }
}
class FireBall extends AcGameObject
{
    constructor(playground, player, x, y, radius, color, damage, vx, vy, speed, move_dist)
    {
        super();
        this.playground = playground;
        this.player = player;
        this.ctx = this.playground.game_map.ctx;

        this.x = x;
        this.y = y;
        this.radius = radius; // 半径
        this.color = color;

        this.damage = damage; // 伤害值

        this.eps=0.1;
        this.vx = vx; // 移动方向
        this.vy = vy; // 移动方向
        this.speed = speed; // 速度
        this.move_dist = move_dist; // 射程

    }

    render()
    {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

//**********碰撞函数**********
    is_collision(obj1,obj2)//是否相交
    {
        return this.get_dist(obj1.x, obj1.y, obj2.x, obj2.y) < obj1.radius + obj2.radius;
    }

    get_dist(x1,y1,x2,y2)
    {
        let dx=x1-x2, dy=y1-y2;
        return Math.sqrt(dx*dx+dy*dy);
    }


    is_satisfy_collision(obj) // 真的碰撞的条件
    {
        if (this === obj) return false; // 火球自身不会被攻击
        if (this.player === obj) return false; // 发射源不会被攻

        return this.is_collision(this, obj); // 距离是否满足
    }

    hit(obj) // 火球与物体碰撞函数 this：火球 obj：物体
    {
        obj.is_attacked_fire(this); //执行物体受伤函数

        this.is_attacked(obj); //执行火球受伤函数
    }

    is_attacked(obj) // 火球受伤直接消失
    {
        this.destroy();
    }

    is_attacked_ice(obj)
    {
        return false;
    }

    is_attacked_fire(obj)
    {
        return false;
    }

    //is_attacked_concrete(angle, damage) // 具体被伤害
    //{
        //this.destroy(); // 直接消失
    //}


    update_attack()
    {
        for (let i = 0; i < AC_GAME_OBJECTS.length; ++ i)
        {
            let obj = AC_GAME_OBJECTS[i];
            if (this.is_satisfy_collision(obj))
            {
                this.hit(obj); //火球与物体碰撞
                break;
            }
        }
    }

//**********碰撞函数**********


    start()
    {

    }

    update()
    {
        //碰撞优先级更高
        this.update_attack();

        this.update_move();
        this.render();
    }

    update_move()
    {
        if (this.move_dist < this.eps) // 如果走完射程了就消失
        {
            this.destroy();
            return false;
        }

        let moved = Math.min(this.move_dist, this.speed * this.timedelta / 1000);
        this.x += this.vx * moved;
        this.y += this.vy * moved;
        this.move_dist -= moved;
    }
}
class IceBall extends AcGameObject
{
    constructor(playground, player, x, y, radius, color, damage, vx, vy, speed, move_dist)
    {
        super();
        this.playground = playground;
        this.player = player;
        this.ctx = this.playground.game_map.ctx;

        this.x = x;
        this.y = y;
        this.radius = radius; // 半径
        this.color = color;

        this.damage = damage; // 伤害值

        this.eps=0.1;
        this.vx = vx; // 移动方向
        this.vy = vy; // 移动方向
        this.speed = speed; // 速度
        this.move_dist = move_dist; // 射程

    }

    render()
    {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

//**********碰撞函数**********
    is_collision(obj1,obj2)//是否相交
    {
        return this.get_dist(obj1.x, obj1.y, obj2.x, obj2.y) < obj1.radius + obj2.radius;
    }

    get_dist(x1,y1,x2,y2)
    {
        let dx=x1-x2, dy=y1-y2;
        return Math.sqrt(dx*dx+dy*dy);
    }


    is_satisfy_collision(obj) // 真的碰撞的条件
    {
        if (this === obj) return false; // 冰球自身不会被攻击
        if (this.player === obj) return false; // 发射源不会被攻

        return this.is_collision(this, obj); // 距离是否满足
    }

    hit(obj) // 冰球与物体碰撞函数 this：冰球 obj：物体
    {
        obj.is_attacked_ice(this); //执行物体受伤函数

        this.is_attacked(obj); //执行冰球受伤函数
    }

    is_attacked(obj) // 冰球碰撞后直接消失
    {
        this.destroy();
    }

    is_attacked_fire(obj)
    {
        return false;
    }
    is_attacked_ice(obj)
    {
        return false;
    }


    //is_attacked_concrete(angle, damage) // 具体被伤害
    //{
        //this.destroy(); // 直接消失
    //}


    update_attack()
    {
        for (let i = 0; i < AC_GAME_OBJECTS.length; ++ i)
        {
            let obj = AC_GAME_OBJECTS[i];
            if (this.is_satisfy_collision(obj))
            {
                this.hit(obj); //冰球与物体碰撞
                break;
            }
        }
    }

//**********碰撞函数**********


    start()
    {

    }

    update()
    {
        //碰撞优先级更高
        this.update_attack();

        this.update_move();
        this.render();
    }

    update_move()
    {
        if (this.move_dist < this.eps) // 如果走完射程了就消失
        {
            this.destroy();
            return false;
        }

        let moved = Math.min(this.move_dist, this.speed * this.timedelta / 1000);
        this.x += this.vx * moved;
        this.y += this.vy * moved;
        this.move_dist -= moved;
    }
}
class AcGamePlayground{
    constructor(root)
    {
        this.root=root;

        this.$playground = $(`<div class="ac-game-playground" ></div>`);

        this.root.$ac_game.append(this.$playground);

        this.num = 5; //电脑玩家数量
        this.level = 4; //电脑玩家战力
        this.AI_level = 750.0; //该值越大电脑玩家发技能的概率越小

        this.start();
    }


    //监听系统
    add_listening_events()
    {
        let outer = this;
    }


    show(mode)
    {
        this.$playground.show(); // 显示这个$playground对象

        this.width = this.$playground.width();
        this.height = this.$playground.height();

        this.state = "waiting";     //waiting -> fighting -> over
        this.player_count = 0;


        //创建地图
        this.game_map=new GameMap(this);

        //创建结束标识
        this.score_board = new ScoreBoard(this);

        //创建玩家数组
        this.players=[];
        //创建当前玩家
        this.players.push(new Player(this, this.width / 2, this.height / 2, this.height * 0.05, "white", this.height * 0.15, "me", this.root.settings.username, this.root.settings.photo));

        //创建电脑玩家
        for( let i = 0 ; i < this.num ; i++ )
        {
            let width=Math.random() * this.width;
            let height=Math.random() * this.height;
            this.players.push(new Player(this, width, height, this.height*0.05, this.get_random_color(), this.height*0.15,"robot"));
        }

    }

    hide()
    {
        //清空所有游戏元素
        while (this.players && this.players.length > 0)
        {
            this.players[0].destroy();
        }

        if (this.game_map) {
            this.game_map.destroy();
            this.game_map = null;
        }
        if (this.score_board) {
            this.score_board.destroy();
            this.score_board = null;
        }

        this.$playground.empty();   //清空所有html标签
        this.$playground.hide();
    }

    start()
    {
        this.hide();
    }

    //生成随机颜色
    get_random_color()
    {
        let HEX=['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
        let color='#';

        for( let i=0; i<6; i++ )
        {
            color += HEX[Math.floor(Math.random()*16)];
        }

        return color;
    }

}
class Settings
{
    constructor(root)
    {
        this.root = root; //AcGame
        this.username = ""; // 用户名
        this.photo = ""; // 头像

        this.platform = "WEB"; // web端
        if (this.root.OS) this.platform = "ACAPP"; // AcWing端

        //前端
        this.$settings = $(`

<div class="ac-game-settings">

    <!--登录页面-->
    <div class="ac-game-settings-login">

        <div class="ac-game-settings-title"> <!--标题-->
            登录
        <div class="ac-game-settings-error-message"> <!--错误信息-->
        </div>
        </div>

        <div class="ac-game-settings-username"> <!--用户名输入框-->
            <div class="ac-game-settings-item">
                <input type="text" placeholder="Username">
            </div>
        </div>

        <div class="ac-game-settings-password"> <!--密码输入框-->
            <div class="ac-game-settings-item">
                <input type="password" placeholder="Password">
            </div>
        </div>

        <div class="ac-game-settings-submit"> <!--按钮-->
            <div class="ac-game-settings-item">
                <button>Login</button>
            </div>
        </div>

        <div class="ac-game-register-option"> <!--注册选项-->
            注册
        </div>

        <br><br><br>
        <div class="ac-game-settings-acwing">
                AcWing一键登录
        </div>

    </div>

    <!--注册页面-->
    <div class="ac-game-settings-register">

        <div class="ac-game-settings-title"> <!--标题-->
            注册
        <div class="ac-game-settings-error-message-register"> <!--错误信息-->
        </div>
        </div>


        <div class="ac-game-settings-username"> <!--用户名输入框-->
            <div class="ac-game-settings-item">
                <input type="text" placeholder="Username">
            </div>
        </div>

        <div class="ac-game-settings-password ac-game-settings-password-first"> <!--密码输入框-->
            <div class="ac-game-settings-item">
                <input type="password" placeholder="Password">
            </div>
        </div>

        <div class="ac-game-settings-password ac-game-settings-password-second"> <!--确认密码-->
            <div class="ac-game-settings-item">
                <input type="password" placeholder="Password Again">
            </div>
        </div>

        <div class="ac-game-settings-submit"> <!--按钮-->
            <div class="ac-game-settings-item">
                <button>Register</button>
            </div>
        </div>

        <div class="ac-game-settings-option"> <!--登录选项-->
            登录
        </div>

        <br><br>
        <div class="ac-game-settings-acwing">
                AcWing一键登录
        </div>

    </div>

</div>

`);
        this.$register = this.$settings.find(".ac-game-settings-register"); // 注册界面
        this.$login = this.$settings.find(".ac-game-settings-login"); // 登录界面
        this.$login_username = this.$login.find(".ac-game-settings-username input"); // 用户名输入框
        this.$login_password = this.$login.find(".ac-game-settings-password input"); // 密码输入框
        this.$login_submit = this.$login.find(".ac-game-settings-submit button"); // 提交按钮
        this.$login_error_message = this.$login.find(".ac-game-settings-error-message"); // 错误信息
        this.$login_register = this.$login.find(".ac-game-register-option"); // 注册选项

        this.$register_username = this.$register.find(".ac-game-settings-username input");
        this.$register_password = this.$register.find(".ac-game-settings-password-first input");
        this.$register_password_confirm = this.$register.find(".ac-game-settings-password-second input"); // 确认密码输入框
        this.$register_submit = this.$register.find(".ac-game-settings-submit button");
        this.$register_error_message = this.$register.find(".ac-game-settings-error-message-register");
        this.$register_login = this.$register.find(".ac-game-settings-option"); // 登陆选项

        this.$acwing_login = this.$settings.find(".ac-game-settings-acwing");




        this.$register.hide();
        this.$login.hide();

        this.root.$ac_game.append(this.$settings);//加入主html

        this.start();
    }

    add_listening_events()
    {
        let outer = this;
        this.add_listening_events_register();
        this.add_listening_events_login();

        this.$acwing_login.click(function(){
            outer.acwing_login();
        });
    }

    add_listening_events_register()//注册页面监听
    {
        let outer = this;

        this.$register_login.click(function(){ // 在注册页面点击登录选项就打开登录界面
            outer.login();
        });
        this.$register_submit.click(function(){ //点击注册按钮
            outer.register_on_remote();
        });
    }

    add_listening_events_login()//登录页面监听
    {
        let outer = this;

        this.$login_register.click(function(){ // 在登录页面点击注册选项就打开注册界面
            outer.register();
        });
        this.$login_submit.click(function(){ //点击登录按钮
            outer.login_on_remote();
        });
    }

    acwing_login()
    {
        $.ajax({
            url: "https://app2783.acapp.acwing.com.cn/settings/acwing/web/apply_code/",
            type: "GET",
            success: function(resp){
                if (resp.result === "success")
                {
                    //将页面跳转到apply_code_url
                    window.location.replace(resp.apply_code_url);
                }
            }
        });
    }

    register_on_remote()//前端注册
    {
        let outer = this;
        let username = this.$register_username.val();
        let password = this.$register_password.val();
        let password_confirm = this.$register_password_confirm.val();

        this.$register_error_message.empty();

        $.ajax({
            url: "https://app2783.acapp.acwing.com.cn/settings/register/",
            type: "GET",
            data: {
                username: username,
                password: password,
                password_confirm: password_confirm,
            },
            success: function(resp){
                console.log(resp);
                if (resp.result === "success")
                {
                    location.reload(); // 刷新网页
                }
                else
                {
                    outer.$register_error_message.html(resp.result);
                }
            }
        });
    }


    login_on_remote()//前端登录
    {
        let outer = this;

        let username = this.$login_username.val(); // 获取输入框中的用户名
        let password = this.$login_password.val(); // 获取输入框中的密码

        this.$login_error_message.empty(); // 清楚错误信息

        //向后端发送request 并发送date 得到resp回应
        $.ajax({
            url: "https://app2783.acapp.acwing.com.cn/settings/login", // 访问url
            type: "GET",
            data: {
                username: username, // 传输数据
                password: password,
            },
            success: function(resp){
                console.log(resp); // 测试输出
                if (resp.result === "success")
                {
                    location.reload(); // 如果成功了就刷新
                }
                else
                {
                    outer.$login_error_message.html(resp.result); // 如果失败了就显示错误信息
                }
            }

        });
    }


    logout_on_remote()//前端登出
    {
        if (this.platform === "ACAPP") return false; // 如果在ACAPP退出就直接退出

        $.ajax({
            url: "https://app2783.acapp.acwing.com.cn/settings/logout",
            type: "GET",
            success: function(resp){
                console.log(resp); // 测试输出
                if (resp.result === "success")
                {
                    location.reload(); // 如果成功了就直接刷新
                }
            }
        });
    }


    register() // 打开注册页面
    {
        this.$login.hide();
        this.$register.show();
    }

    login() // 打开登录页面
    {
        this.$register.hide();
        this.$login.show();
    }

    getinfo() // 获取信息
    {
        let outer = this;

        $.ajax({ // 发送一个请求
            url: "https://app2783.acapp.acwing.com.cn/settings/getinfo/",
            type: "GET",
            data: {
                platform: outer.platform, //端口
            },

            // resp是发送请求之后返回的响应
            success: function(resp){
                console.log(resp);//测试

                if (resp.result === "success")
                {
                    outer.username = resp.username; // 获取这个用户名
                    outer.photo = resp.photo; // 获取这个头像


                    outer.hide(); // 隐藏这个登录页面
                    outer.root.menu.show(); // 并显示游戏菜单
                }
                else
                {
                    outer.root.menu.hide();
                    outer.login(); // 如果没有登录就打开这个登录页面
                }
            }
        })
    }

    hide()
    {
        this.$settings.hide();
    }

    show()
    {
        this.$settings.show();
    }

    start()
    {
        this.getinfo();
        this.add_listening_events();
    }
}
export class AcGame {
    constructor(id) {
        this.id = id;
        this.$ac_game = $('#' + id);

        this.settings = new Settings(this);

        this.info = new Info(this);

        this.menu = new AcGameMenu(this);

        this.playground = new AcGamePlayground(this);

        this.start();
    }

    start() {
    }
}
