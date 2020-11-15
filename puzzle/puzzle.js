// arr1[0]不用，后面的九个分别存放当前的数字
var arr = new Array(10);
//用于存放每个模块所能走的方向
arr = [0,2,3,4,5,6,7,8,0,1];
var direct = new Array([0],[2,4],[1,3,5],[2,6],[1,5,7],[2,4,6,8],[3,5,9],[4,8],[5,7,9],[6,8]);

var lis = document.getElementsByTagName("li");


function hello(){
    for(var i = 1;i<arr.length;i++){
        if(arr[i] == 0){
            lis[i-1].innerHTML = "";
            lis[i-1].style.backgroundColor = "wheat";
        }else{
            lis[i-1].innerHTML = arr[i];
            lis[i-1].style.backgroundColor = "#aaffcc";
        }
        
        
    }
};

function move(i){//i是对应的地址
    //alert("测试专用");
    var di = direct[i];//该地址对应的方向集
    console.log("此时的方向为"+di);
    for(var j = 0;j<di.length;j++){
        //di[j]是地址，判断对应的方向值是不是为0，是0则移动
        if(arr[di[j]]==0){
            arr[di[j]] = arr[i];//换值
            arr[i] = 0;
            hello();
        }
    }

}
hello();