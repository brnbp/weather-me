
(function() { 

    const currentHour = new Date().getHours()

    showLoader(true)

    $('#title h2 span').text(getPartOfDay(currentHour))

    $.getJSON('http://ipinfo.io', function (body) {
        const city = body.city || 'Sao Paulo'
        
        if (!city) {
            return
        }

        const url = 'http://api.openweathermap.org/data/2.5/weather?appid=a3ed1549cd8e7a34bd6148a5d1e56a5e&q='+ encodeURIComponent(city) +'&units=metric';
      
        $.getJSON(url, function (body) {
          showLoader(false)
          $('#title h2').append(' in ' + city + ':')
          $('#weather').text("It's " + Math.floor(body.main.temp) + "c and " + body.weather[0].description)
        })
    })

})()

function getPartOfDay(hour) {
    if (hour > 12 && hour < 18) {
        return 'afternoon'
    } else if( hour > 18 || hour < 6) {
        return 'night'
    }

    return 'morning';
}


function showLoader(flag)
{
    $('#loading').attr('hidden', !flag);
}