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
            price_btc: parseFloat(element.price_btc),
            price_usd: parseFloat(element.price_usd),
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
        var tr = document.createElement("tr");
        // name
        var name = document.createElement("td");
        name.innerHTML = element.name + ' ' + '(' + element.symbol + ')';
        // BTC price
        var btcPrice = document.createElement("td");
        btcPrice.innerHTML = element.price_btc;
        // primary percentage change
        var primaryPercentage = document.createElement('td');
        primaryPercentage.innerHTML = element.percent_change_24h + '%';
        if (element.percent_change_24h <= 0) {
            $(primaryPercentage).addClass('text-danger');
        }
        else {
            $(primaryPercentage).addClass('text-success');
        }
        // secondary percentage change
        var secondaryPercentage = document.createElement('td');
        secondaryPercentage.innerHTML = element.percent_change_7d + '%';
        if (element.percent_change_7d <= 0) {
            $(secondaryPercentage).addClass('text-danger');
        }
        else {
            $(secondaryPercentage).addClass('text-success');
        }
        tr.append(name, btcPrice, primaryPercentage, secondaryPercentage);
        container.append(tr);
    });
}

function createWeekList(containerId, data) {
    var container = $('#' + containerId);
    data.forEach(element => {
        var tr = document.createElement("tr");
        // name
        var name = document.createElement("td");
        name.innerHTML = element.name + ' ' + '(' + element.symbol + ')';
        // BTC price
        var btcPrice = document.createElement("td");
        btcPrice.innerHTML = element.price_btc;
        // primary percentage change
        var primaryPercentage = document.createElement('td');
        primaryPercentage.innerHTML = element.percent_change_7d + '%';
        if (element.percent_change_7d <= 0) {
            $(primaryPercentage).addClass('text-danger');
        }
        else {
            $(primaryPercentage).addClass('text-success');
        }
        // secondary percentage change
        var secondaryPercentage = document.createElement('td');
        secondaryPercentage.innerHTML = element.percent_change_24h + '%';
        if (element.percent_change_24h <= 0) {
            $(secondaryPercentage).addClass('text-danger');
        }
        else {
            $(secondaryPercentage).addClass('text-success');
        }
        tr.append(name, btcPrice, primaryPercentage, secondaryPercentage);
        container.append(tr);
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
