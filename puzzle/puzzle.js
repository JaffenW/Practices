/*
思想：其实以拼图来设想的话还是有点复杂，本人将其设想为一个停车场，移动的拼图就是可以移动的汽车
九个方格分别对应九个停车区，每个停车区分别有对应的编号1-9，此处对应为一个数组park（10），其中park[0]不用
数组内存放0-8的数字，其中0表示为空，1-8分别对应八辆小汽车

*/

// park[0]不用，后面的九个分别存放当前的数字
var park = new Array(10);
park = [0,1,2,3,4,5,6,7,8,0];
//用于存放每个模块所能走的方向
var direct = new Array([0],[2,4],[1,3,5],[2,6],[1,5,7],[2,4,6,8],[3,5,9],[4,8],[5,7,9],[6,8]);

var lis = document.getElementsByTagName("li");
var alltime = document.getElementById("alltime");
var start = document.getElementById("start");
var reset = document.getElementById("reset");
var currentLocation = 9;//用来保存当前空白的位置
var isEnd = false;//用来判断游戏是否结束
var isStart = false;//用来控制游戏是开始还是暂停
var time;//这是一个计数器
var count = 0;//用来显示计数时间

//绘制拼图
function paint(){
    for(var i = 1;i<park.length;i++){
        if(park[i] == 0){
            lis[i-1].innerHTML = "";
            lis[i-1].style.backgroundColor = "wheat";
        }else{
            lis[i-1].innerHTML = park[i];
            lis[i-1].style.backgroundColor = "#aaffcc";
        }
        
        
    }
};

//拼图点击后的响应事件
function move(parkid){//i是对应的地址
    if(isStart){
        var di = direct[parkid];//该地址对应的方向集
    for(var j = 0;j<di.length;j++){
        //di[j]是地址，判断对应的方向值是不是为0，是0则移动
        if(park[di[j]]==0){
            park[di[j]] = park[parkid];//换值
            park[parkid] = 0;
            paint();
        }
    }
    isWin();
    }   
}

//生成随机顺序的数字数组，为了确保游戏能结束，拼图的初始为正常顺序，然后随机移动拼图形成一个乱序的拼图
function randomPark(){
    var times = Math.floor(Math.random()*10+10);//拼图移动的次数,此处设置至少移动十次
    
    for(var i = 0; i<times ; i++){
        //随机获取移动的下一个方向地址        
        var index = Math.floor(Math.random()*(direct[currentLocation].length));//注意产生随机数的格式是Math.random()，向下取整的格式是Math.floor（num）
        var nextLocation = direct[currentLocation][index];

        //将其存储的值互换
        park[currentLocation] = park[nextLocation];
        park[nextLocation] = 0 ;


        currentLocation = nextLocation;
        console.log(park);
    }
}

//判断是否结束
function isWin(){
    isEnd = true;
    for(var i=1;i<park.length-1;i++){
        if(park[i] !=i){
            isEnd = false;
            break;
        }
    }
    if(isEnd){
        alert("congratulations，you win");
        isStart = false;
        count = 0;
        window.clearInterval(time);
    }
}

//设置计时器
function setTimer(){
    time = self.setInterval(() => {
        count++;
       alltime.innerText = count+"s";
    }, 1000);
}

//设置开始按钮的点击事件
function startCount(){
    if(!isStart){
        isStart = true;
        setTimer();
        start.innerText = "暂停";
    }else{
        window.clearInterval(time);
        start.innerText = "开始";
        isStart = false;
    }
    
}

//设置重置的点击事件
function reSet(){
    randomPark();
    paint();
    isStart = false;
    count = 0;

    window.clearInterval(time);
}
randomPark();
paint();