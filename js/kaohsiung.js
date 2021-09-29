
// 所有資料


var alldata;
var xhr = new XMLHttpRequest();
xhr.open('get','https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json',true);
xhr.send(null);
xhr.onload = function(){
    if(xhr.status !== 200){return;};
    var jsonObj = JSON.parse(xhr.responseText);
    alldata = jsonObj.result.records;
    
    updataMenu();
}



var noRepeatDis;

function updataMenu() {
    // 先把所有的alldata.zone拿出來
    var allDataDis = [];
    for (var i = 0; i < alldata.length; i++) {
        allDataDis.push(alldata[i].Zone);
    }
    // console.log(allDataDis);
    noRepeatDis = Array.from(new Set(allDataDis));
    // 組成新陣列，且去除重複項目
    // console.log(noRepeatDis);

    var str = '';
    str = `<option value="請選擇行政區"  selected >請選擇行政區</option>`;
    for (var i = 0; i < noRepeatDis.length; i++) {
        str += `<option value="${noRepeatDis[i]}">${noRepeatDis[i]}</toption>`;
    }
    document.querySelector('.devices').innerHTML = str;

}





// 標題變動
// 選出devices下拉式選單區塊 和 title
var option = document.querySelector('.devices');
var title = document.querySelector('.title');

// 監聽 事件
option.addEventListener('change', updataTitle);


function updataTitle(e) {
    var select = e.target.value || e.target.textContent;
    // 點選的目標物的值
    var titleStr = '';
    // 先建立空值
    for (var i = 0; i < noRepeatDis.length; i++) {
        // 迴圈 i 小於 noRepeatDis陣列的項目數量
        if (select == noRepeatDis[i]) {
            // 如果點選該物件的值 = 陣列的索引值的該項目，要去做配對，不然會一直寫到最後一個
            titleStr = noRepeatDis[i];
            title.innerHTML = titleStr;
        } else if (select == '請選擇行政區') {
            title.textContent = '請選擇行政區';
        }
    }

    // 分頁欄 寫在標題變動的地方

    var selectAry = [];
    // 建立空陣列
    for (var i = 0; i < alldata.length; i++) {
        // i<alldata.length是因為要算出該區域有多少個景點
        if (select == alldata[i].Zone) {
            selectAry.push(alldata[i])
            // 空陣列放進alldata的該項物件（與select的區域對到的該區域景點）
        }
    }
    var page = document.querySelector('.btncontent');
    // 取得按鈕區塊
    var btnNum = Math.ceil(selectAry.length / 6);
    // 全域物件的Math.ceil() 向上取整數，例如 5.5會變成6
    // 然後將取出來的該區景點數量除以六（一頁放6個景點）
    var pageStr = '';
    for (var i = 0; i < btnNum; i++) {
        pageStr += `<span>${i + 1}</span>`;
        page.innerHTML = pageStr;
    }

}




// 內容區塊
// 建立事件 觸發 content改變
var content = document.querySelector('.content');
option.addEventListener('change', updataContent);

var popmenu_result = document.querySelector('.popmenu_result');
popmenu_result.addEventListener('click',updataContent);
function updataContent(e) {
    var select = e.target.value || e.target.textContent;
    // 點選下拉式選單的值
    var contentStr = '';
    for (var i = 0; i < alldata.length; i++) {
        // i<allData.length的原因是 這段是要顯示資料裡面所有的景點資料，
        // 所以不需要刪除掉重複的，不然一個區域只有一個景點了
        if (select == alldata[i].Zone) {
            // 如果選單的值和alldata的zone對得上
            contentStr += `<div class="box">
            <div class="pic" style="background-image:url(${alldata[i].Picture1})">
                <div class="placetitle">${alldata[i].Name}</div>
                <div class="zonetitle">${alldata[i].Zone}</div>
            </div>
            <ul>
                <li class="info">
                    <div class="info_icon">
                        <img src="images/icons_clock.png">
                    </div>
                    <p>${alldata[i].Opentime}</p>
                </li>
                <li class="info">
                    <div class="info_icon">
                        <img src="images/icons_pin.png">
                    </div>
                    <p>${alldata[i].Add}</p>
                </li>
                <li class="info_2">
                    <div class="phone_ticket">
                        <div class="info_icon">
                            <img src="images/icons_phone.png">
                        </div>
                        <p>${alldata[i].Tel}</p>
                    </div>
                    <div class="phone_ticket">
                        <div class="info_icon">
                            <img src="images/icons_tag.png">
                        </div>
                        <p>${alldata[i].Ticketinfo}</p>
                    </div>
                </li>
            </ul>
        </div>`;
        }

    }
    content.innerHTML = contentStr;
}




// 熱門行政區 點擊按鈕 跳出 該區景點
// input 他們的valeu值  output 該出熱門景點
// 如果點擊的值 和 adddata.zone對不上 失敗
// 只要值對的上 就執行

// 取得該元件的父元件
var colorbtn = document.querySelector('.popmenu_result');
colorbtn.addEventListener('click',updataContent,false);
colorbtn.addEventListener('click',updataTitle,false);










