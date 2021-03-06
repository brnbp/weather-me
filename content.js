
(function() {
    
    const currentHour = new Date().getHours()
    
    showLoader(true)

    $('#title h2 span').text(getPartOfDay(currentHour))

    $.getJSON('http://ipinfo.io', function (body) {
        const city = body.city || 'Sao Paulo'
        
        if (!city) {
            return
        }

        const weatherApiKey = 'a3ed1549cd8e7a34bd6148a5d1e56a5e'

        const url = 'http://api.openweathermap.org/data/2.5/weather?appid=' + weatherApiKey + '&q='+ encodeURIComponent(city) +'&units=metric';
      
        $.getJSON(url, function (body) {
          showLoader(false)
          $('#title h2').append(city + ':')

          $('#weather')
            .text("It's " + Math.floor(body.main.temp) + "c and " + body.weather[0].description)
            .append('<img src="http://openweathermap.org/img/w/' + body.weather[0].icon + '.png">')
        })
    })

})()

function getPartOfDay(hour) {
    if (hour >= 12 && hour <= 18) {
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
