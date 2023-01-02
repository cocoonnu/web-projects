const selectors = {
    boardContainer : document.querySelector('.board-container'),
    board : document.querySelector('.board'),
    moves : document.querySelector('.moves'),
    timer : document.querySelector('.timer'),
    win : document.querySelector('.win'),
    start : document.querySelector('.start'),
};

const state = {
    gameStarted : false,
    flippedCards : 0, // 翻开数量
    totalFlips : 0, // 匹配+翻开数量
    totalTime : 0, // 总翻开次数
    loop : null, // 定时器

    // 卡片翻开添加：flipped
    // 卡片匹配添加：matched
};

// 打乱数组
function shuffle(array) {
    const cloneArray = [...array];

    // 倒过来洗效率更高！
    for (let i=cloneArray.length-1; i>0; i--)
    {
        let original = cloneArray[i];
        let randomIndex = Math.floor(Math.random() * (i + 1));
        // 两张牌交换
        cloneArray[i] = cloneArray[randomIndex];
        cloneArray[randomIndex] = original;
    }

    return cloneArray;
}

// 从数组中选items个
function pickRandom(array,items) {
    const cloneArray = [...array];
    const randomPicks = [];

    for (let i=0; i<items; i++)
    {
        let randomIndex = Math.floor(Math.random() * cloneArray.length);
        randomPicks.push(cloneArray[randomIndex]);
        
        // 将cloneArray[randomIndex]这一项删除
        cloneArray.splice(randomIndex,1);
    }

    return randomPicks;
}

// 初始化游戏
function generateGame() {
    // 网格数
    const dimension = selectors.board.getAttribute('data-dimension');
    if (dimension %2 != 0) {
        throw console.error('The dimension of the board must be an even number.');
    }

    // emojis
    const emojis = ['🥔', '🍒', '🥑', '🌽', '🥕', '🍇', '🍉', '🍌', '🥭', '🍍'];

    // 从emojis中选num个
    const num = dimension * dimension / 2;
    const picks = pickRandom(emojis,num);

    // 打乱成双的picks组成items数组
    const items = shuffle([...picks,...picks]);

    // 创建cards
    const cards = `
        <div class="board" style="grid-template-columns: repeat(${dimension},auto);">
        ${
            items.map(item => item= `
                <div class="card">
                    <div class="card-front"></div>
                    <div class="card-back">${item}</div>
                </div>            
            `).join('')
        }
        </div>        
    `;

    // items.map(item => ...)：返回一个数组
    // items.map(item => ...).join(' ')：返回一个字符串

    // 将cards转化为dom元素 命名为parser
    const parser = new DOMParser().parseFromString(cards,'text/html');

    // 将selectors.board替换成parser.querySelector('.board')
    selectors.board.replaceWith(parser.querySelector('.board'));

}

// 开始游戏（开启定时器）
function startGame() {
    state.startGamed = true;
    selectors.start.classList.add('disabled');

    // 设置定时器
    state.loop = setInterval(function() {
        state.totalTime++;
        selectors.moves.innerHTML = `${state.totalFlips} moves`;
        selectors.timer.innerHTML = `Timer : ${state.totalTime} s`;
    },1000)
}

// 卡片自动翻回去
function flipBackCards() {
    document.querySelectorAll('.card:not(.matched)').forEach(function(card) {
        card.classList.remove('flipped');
    })

    // 翻开卡片数清零
    state.flippedCards = 0;
}

// 翻开卡片
function flipCard(card) {
    state.flippedCards++;
    state.totalFlips++;

    // 启动定时器
    if (!state.startGamed) startGame();

    // 控制同时翻牌数量最大为2
    if (state.flippedCards <= 2)
    {
        card.classList.add('flipped');
    }

    // 查看翻开的卡片是否匹配
    if (state.flippedCards == 2)
    {
        // 获取两张翻开的卡片
        let twocards = document.querySelectorAll('.flipped:not(.matched)');

        if (twocards[0].innerText == twocards[1].innerText)
        {
            twocards[0].classList.add('matched');
            twocards[1].classList.add('matched');
            // 翻开卡片数清零
            state.flippedCards = 0;
        } else
        {
            // 匹配失败则1s后执行flipBackcards
            setTimeout(flipBackCards,1000);
        }
    }

    // 如果所有卡片已翻开 游戏结束
    if (document.querySelectorAll('.card:not(.flipped)').length == 0)
    {
        setTimeout(function() {
            clearInterval(state.loop);
            selectors.boardContainer.classList.add('flipped');
            selectors.win.innerHTML = `
                <span class="win-text">
                    <h2>You Win!</h2>
                    <p>with <span class="highlight">${state.totalFlips}</span> moves</p>
                    <p>under <span class="highlight">${state.totalTime}</span> seconds</p>
                </span>
            `
        },1000)
    }
}

// 添加监听事件
function attachEventListeners() {
    document.addEventListener('click',function(e) {
        let eventTarget = e.target;
        let eventParent = e.target.parentElement;

        // 如果卡片没有被翻开 则翻开卡片
        if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped'))
        {
            flipCard(eventParent);

            // 如果翻开一张卡片后 3s之内没有翻开第二张则自动翻回去 存在bug
            // let oneFlipBack = setTimeout(function() {
            //     if (document.querySelectorAll('.flipped:not(.matched)').length < 2) {
            //         if (!eventParent.className.includes('matched')) {
            //             eventParent.classList.remove('flipped');
            //             state.flippedCards = 0;
            //         }
            //     } 
            // },5000)

        }

        // 点击开始游戏
        if (eventTarget.className == 'start' && !eventTarget.className.includes('disable'))
        {
            startGame();
        }
    })   
}

// 初始化游戏
generateGame();
// 添加监听事件
attachEventListeners();
