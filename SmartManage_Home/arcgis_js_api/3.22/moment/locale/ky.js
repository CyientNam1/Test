//>>built
(function(c,a){"object"===typeof exports&&"undefined"!==typeof module&&"function"===typeof require?a(require("../moment")):"function"===typeof define&&define.amd?define("moment/locale/ky",["../moment"],a):a(c.moment)})(this,function(c){var a={0:"-\u0447\u04af",1:"-\u0447\u0438",2:"-\u0447\u0438",3:"-\u0447\u04af",4:"-\u0447\u04af",5:"-\u0447\u0438",6:"-\u0447\u044b",7:"-\u0447\u0438",8:"-\u0447\u0438",9:"-\u0447\u0443",10:"-\u0447\u0443",20:"-\u0447\u044b",30:"-\u0447\u0443",40:"-\u0447\u044b",50:"-\u0447\u04af",
60:"-\u0447\u044b",70:"-\u0447\u0438",80:"-\u0447\u0438",90:"-\u0447\u0443",100:"-\u0447\u04af"};return c.defineLocale("ky",{months:"\u044f\u043d\u0432\u0430\u0440\u044c \u0444\u0435\u0432\u0440\u0430\u043b\u044c \u043c\u0430\u0440\u0442 \u0430\u043f\u0440\u0435\u043b\u044c \u043c\u0430\u0439 \u0438\u044e\u043d\u044c \u0438\u044e\u043b\u044c \u0430\u0432\u0433\u0443\u0441\u0442 \u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044c \u043e\u043a\u0442\u044f\u0431\u0440\u044c \u043d\u043e\u044f\u0431\u0440\u044c \u0434\u0435\u043a\u0430\u0431\u0440\u044c".split(" "),
monthsShort:"\u044f\u043d\u0432 \u0444\u0435\u0432 \u043c\u0430\u0440\u0442 \u0430\u043f\u0440 \u043c\u0430\u0439 \u0438\u044e\u043d\u044c \u0438\u044e\u043b\u044c \u0430\u0432\u0433 \u0441\u0435\u043d \u043e\u043a\u0442 \u043d\u043e\u044f \u0434\u0435\u043a".split(" "),weekdays:"\u0416\u0435\u043a\u0448\u0435\u043c\u0431\u0438 \u0414\u04af\u0439\u0448\u04e9\u043c\u0431\u04af \u0428\u0435\u0439\u0448\u0435\u043c\u0431\u0438 \u0428\u0430\u0440\u0448\u0435\u043c\u0431\u0438 \u0411\u0435\u0439\u0448\u0435\u043c\u0431\u0438 \u0416\u0443\u043c\u0430 \u0418\u0448\u0435\u043c\u0431\u0438".split(" "),
weekdaysShort:"\u0416\u0435\u043a \u0414\u04af\u0439 \u0428\u0435\u0439 \u0428\u0430\u0440 \u0411\u0435\u0439 \u0416\u0443\u043c \u0418\u0448\u0435".split(" "),weekdaysMin:"\u0416\u043a \u0414\u0439 \u0428\u0439 \u0428\u0440 \u0411\u0439 \u0416\u043c \u0418\u0448".split(" "),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[\u0411\u04af\u0433\u04af\u043d \u0441\u0430\u0430\u0442] LT",nextDay:"[\u042d\u0440\u0442\u0435\u04a3 \u0441\u0430\u0430\u0442] LT",
nextWeek:"dddd [\u0441\u0430\u0430\u0442] LT",lastDay:"[\u041a\u0435\u0447\u0435 \u0441\u0430\u0430\u0442] LT",lastWeek:"[\u04e8\u0442\u043a\u0435\u043d \u0430\u043f\u0442\u0430\u043d\u044b\u043d] dddd [\u043a\u04af\u043d\u04af] [\u0441\u0430\u0430\u0442] LT",sameElse:"L"},relativeTime:{future:"%s \u0438\u0447\u0438\u043d\u0434\u0435",past:"%s \u043c\u0443\u0440\u0443\u043d",s:"\u0431\u0438\u0440\u043d\u0435\u0447\u0435 \u0441\u0435\u043a\u0443\u043d\u0434",m:"\u0431\u0438\u0440 \u043c\u04af\u043d\u04e9\u0442",
mm:"%d \u043c\u04af\u043d\u04e9\u0442",h:"\u0431\u0438\u0440 \u0441\u0430\u0430\u0442",hh:"%d \u0441\u0430\u0430\u0442",d:"\u0431\u0438\u0440 \u043a\u04af\u043d",dd:"%d \u043a\u04af\u043d",M:"\u0431\u0438\u0440 \u0430\u0439",MM:"%d \u0430\u0439",y:"\u0431\u0438\u0440 \u0436\u044b\u043b",yy:"%d \u0436\u044b\u043b"},dayOfMonthOrdinalParse:/\d{1,2}-(\u0447\u0438|\u0447\u044b|\u0447\u04af|\u0447\u0443)/,ordinal:function(b){return b+(a[b]||a[b%10]||a[100<=b?100:null])},week:{dow:1,doy:7}})});