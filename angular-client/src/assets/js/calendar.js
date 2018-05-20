function calendar()
{
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getYear();
        if(year<=200)
        {
                year += 1900;
        }
        months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September', 'October', 'November', 'December');
        days_in_month = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
        if(year%4 == 0 && year!=1900)
        {
                days_in_month[1]=29;
        }
        total = days_in_month[month];
        var date_today = day+' '+months[month]+' '+year;
        beg_j = date;
        beg_j.setDate(1);
        if(beg_j.getDate()==2)
        {
                beg_j=setDate(0);
        }
        beg_j = beg_j.getDay();
        var result="";
        result = result.concat('<table class="cal_calendar" onload="document.getElementById(\'cal_body\').style.opacity = \'0.2\';"><tbody id="cal_body"><tr><th colspan="7">'+date_today+'</th></tr>');
        result = result.concat('<tr class="cal_d_weeks"><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr><tr>');
        week = 0;
        for(i=1;i<=beg_j;i++)
        {
                result = result.concat('<td class="cal_days_bef_aft">'+(days_in_month[month-1]-beg_j+i)+'</td>');
                week++;
        }
        for(i=1;i<=total;i++)
        {
                if(week==0)
                {
                        result = result.concat('<tr>');
                }
                if(day==i)
                {
                        result = result.concat('<td class="cal_today">'+i+'</td>');
                }
                else
                {
                        result = result.concat('<td>'+i+'</td>');
                }
                week++;
                if(week==7)
                {
                        result = result.concat('</tr>');
                        week=0;
                }
        }
        for(i=1;week!=0;i++)
        {
                result = result.concat('<td class="cal_days_bef_aft">'+i+'</td>');
                week++;
                if(week==7)
                {
                        result = result.concat('</tr>');
                        week=0;
                }
        }
        result = result.concat('</tbody></table>');
        document.getElementById("calender").innerHTML = result;
        var element = document.getElementById('cal_body');
        element.style.opacity = "0.7";
        return true;
}