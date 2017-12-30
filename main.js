var jqxhr = $.get("https://api.coinmarketcap.com/v1/ticker/", function (data) {
    console.log("success");
})
    .done(function (data) {
        var newData = parseData(data);
        createDayList('group24h', sortBy24hChange(newData));
        createWeekList('group7d', sortBy7dChange(newData));
    })
    .fail(function (err) {
        console.error("[ERROR]", err);
    })
    .always(function () {
        console.log("complete");
    });

function parseData(data) {
    var newData = [];
    data.forEach(element => {
        var newElement = {
            name: element.name,
            symbol: element.symbol,
            price_btc: element.price_btc,
            price_usd: element.price_usd,
            percent_change_24h: parseFloat(element.percent_change_24h),
            percent_change_7d: parseFloat(element.percent_change_7d)
        }
        newData.push(newElement);
    });
    return newData;
}

function createDayList(containerId, data) {
    var container = $('#' + containerId);
    data.forEach(element => {
        // name
        var el = document.createElement("li");
        el.className = 'list-group-item';
        el.innerHTML = element.name + ' ' + '(' + element.symbol + ')';
        // primary percentage change
        var primaryPercentage = document.createElement('large');
        primaryPercentage.className = 'abs-right';
        primaryPercentage.innerHTML = element.percent_change_24h + '%';
        if (element.percent_change_24h <= 0) {
            $(primaryPercentage).addClass('text-danger');
        }
        else {
            $(primaryPercentage).addClass('text-success');
        }
        // secondary percentage change
        var info = document.createElement('small');
        info.innerHTML = '7d';
        info.className = 'text-secondary ml-4';
        var secondaryPercentage = document.createElement('small');
        secondaryPercentage.innerHTML = element.percent_change_7d + '%';
        secondaryPercentage.className = 'ml-2';
        if (element.percent_change_7d <= 0) {
            $(secondaryPercentage).addClass('text-danger');
        }
        else {
            $(secondaryPercentage).addClass('text-success');
        }
        primaryPercentage.append(info, secondaryPercentage);
        el.append(primaryPercentage);
        container.append(el);
    });
}

function createWeekList(containerId, data) {
    var container = $('#' + containerId);
    data.forEach(element => {
        // name
        var el = document.createElement("li");
        el.className = 'list-group-item';
        el.innerHTML = element.name + ' ' + '(' + element.symbol + ')';
        // primary percentage change
        var primaryPercentage = document.createElement('large');
        primaryPercentage.className = 'abs-right';
        primaryPercentage.innerHTML = element.percent_change_7d + '%';
        if (element.percent_change_7d <= 0) {
            $(primaryPercentage).addClass('text-danger');
        }
        else {
            $(primaryPercentage).addClass('text-success');
        }
        // secondary percentage change
        var info = document.createElement('small');
        info.innerHTML = '24h';
        info.className = 'text-secondary ml-4';
        var secondaryPercentage = document.createElement('small');
        secondaryPercentage.innerHTML = element.percent_change_24h + '%';
        secondaryPercentage.className = 'ml-2';
        if (element.percent_change_24h <= 0) {
            $(secondaryPercentage).addClass('text-danger');
        }
        else {
            $(secondaryPercentage).addClass('text-success');
        }
        primaryPercentage.append(info, secondaryPercentage);
        el.append(primaryPercentage);
        container.append(el);
    });
}

function sortBy24hChange(data) {
    sortedData = _.sortBy(data, 'percent_change_24h');
    return sortedData;
}

function sortBy7dChange(data) {
    sortedData = _.sortBy(data, 'percent_change_7d');
    return sortedData;
}
