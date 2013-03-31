

(function() {

    var weekNames           = '日,月,火,水,木,金,土'.split(',');
    var weekColors          = '#f66,#000,#000,#000,#000,#000,#0ff'.split(',');
    var dayBackgroundColors = '#fcf,#fff,#fff,#fff,#fff,#fff,#6ff'.split(',');
    var monthCount          = '31,28,31,30,31,30,31,31,30,31,30,31'.split(',');
    var monthCountLeap      = '31,29,31,30,31,30,31,31,30,31,30,31'.split(',');
    var holiday = [
        
    ];
    var Holiday

    /*
・背景色
- body：#ccc
- カレンダー基本：#fff
- 日曜日セル：#fcf
- 土曜日セル：#6ff
- 国民の祝日セル：#f66

・文字色
- カレンダー基本：#000
- 「日」：#f66
- 「土」：#0ff
- 前月・次月の日付：#999
- 国民の祝日の日付：#fff
    */

    tm.define("tm.plugin.Calendar", {
        superClass: "tm.dom.Element",

        init: function(y) {
            this.superInit(document.createElement("div"));
            this._createData(y);
            this._setup(y);
        },

        _setup: function(y) {
            for (var i=1; i<=12; ++i) {
                this.append(this._createMonth(y, i));
            }
        },

        _createMonth: function(y, m) {
            var table = tm.dom.Element(document.createElement("table"));
            table.attr.set("border", '');
            table.style.set("borderCollapse", "collapse");

            var caption = table.create("caption")
            caption.html = "{y}年{m}月".format({y:y,m:m});

            var tr = table.create("tr");
            for (var i=0; i<7; ++i) {
                var th = tr.create("th");
                th.html = weekNames[i];
                th.color = weekColors[i];
                th.backgroundColor = "#aaa";
            }

            for (var i=0; i<5; ++i) {
                var tr = table.create("tr");
                for (var j=0; j<7; ++j) {
                    var th = tr.create("td");
                    var index = i*7+j;
                    th.html = "00";
                    th.html = this._dataList[m-1][index];
                    th.backgroundColor = dayBackgroundColors[j];
                }
            }

            return table;
        },

        _createData: function(y) {
            var isLeap = ((y%4==0 && y%100!=0) || (y%400 == 0));
            var mc = (isLeap) ? monthCountLeap : monthCount;
            var dataList = [];

            // prev
            for (var j=0; j<12; ++j) {
                var w = this._weekOfDay(y, j+1, 1);
                var data = [];
                var index = 0;
                var prevMax = (j==0) ? 31 : mc[j-1];

                for (var i=0; i<w; ++i, ++index) {
                    data[index] = "*";
                    data[index] = prevMax - (w-i)+1;
                }

                // now
                for (var i=0,len=mc[j]; i<len; ++i, ++index) {
                    data[index] = i+1;
                }

                // next
                for (var i=1;index<35; ++i, ++index) {
                    data[index] = i;
                }
                dataList.push(data);
            }

            this._dataList = dataList;
        },

        _weekOfDay: function(y, m, d) {
            if (m==1 || m==2) {
                --y;
                m += 12;
            }
            var w = (y+(y/4).floor()-(y/100).floor()+(y/400).floor()+((13*m+8)/5)+1).floor() % 7;

            return w;
        }
    });

})();

















