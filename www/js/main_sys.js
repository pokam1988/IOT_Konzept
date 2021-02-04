var ctx = document.getElementById("myChart").getContext('2d');

var original = Chart.defaults.global.legend.onClick;
Chart.defaults.global.legend.onClick = function(e, legendItem) {
    update_caption(legendItem);
    original.call(this, e, legendItem);
};

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Janvier", "Fevrier", "Mars", "Avril", "Mai"],
        datasets: [{
            label: 'HAUS 1',
            backgroundColor: "rgba(153,255,51,1)",
            data: [43, 19, 3, 17, 28 ],
        }, {
            label: 'HAUS 2',
            backgroundColor: "rgba(255,153,0,1)",
            data: [25, 29, 5, 5, 20],
        }, {
            label: 'HAUS 3',
            backgroundColor: "rgba(255,153,88,4)",
            data: [30, 29, 5, 5, 20],
        }]
    }
});

var labels = {
    "apples": true,
    "oranges": true
};

var caption = document.getElementById("caption");

var update_caption = function(legend) {
    labels[legend.text] = legend.hidden;

    var selected = Object.keys(labels).filter(function(key) {
        return labels[key];
    });

    var text = selected.length ? selected.join(" & ") : "nothing";

    caption.innerHTML = "The chart is displaying " + text;
};






