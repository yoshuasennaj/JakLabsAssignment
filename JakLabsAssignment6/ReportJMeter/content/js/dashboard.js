/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8891891891891892, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.725, 500, 1500, "/order-goride"], "isController": false}, {"data": [1.0, 500, 1500, "/payment-methods-gocar"], "isController": false}, {"data": [1.0, 500, 1500, "/order-gocar"], "isController": false}, {"data": [0.48, 500, 1500, "/discovery-topup"], "isController": false}, {"data": [0.6666666666666666, 500, 1500, "/topup-instant"], "isController": false}, {"data": [1.0, 500, 1500, "/set-pickup-location-gocar"], "isController": false}, {"data": [0.98, 500, 1500, "/discovery-gocar"], "isController": false}, {"data": [0.97, 500, 1500, "/discovery-promos"], "isController": false}, {"data": [1.0, 500, 1500, "/payment-methods-goride"], "isController": false}, {"data": [0.975, 500, 1500, "/voucher-goride"], "isController": false}, {"data": [0.97, 500, 1500, "/discovery-goride"], "isController": false}, {"data": [1.0, 500, 1500, "/set-pickup-location-goride"], "isController": false}, {"data": [1.0, 500, 1500, "/topup-other-methods"], "isController": false}, {"data": [1.0, 500, 1500, "/voucher-gocar"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 370, 0, 0.0, 505.19459459459426, 302, 2267, 338.0, 1130.0, 1152.35, 1553.310000000007, 3.6981878879349117, 69.19540089418685, 0.6464605780667473], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/order-goride", 20, 0, 0.0, 751.1000000000001, 310, 1455, 795.0, 1179.7, 1441.35, 1455.0, 0.20511768627249885, 3.8376838046766832, 0.035855533049587204], "isController": false}, {"data": ["/payment-methods-gocar", 15, 0, 0.0, 342.3333333333333, 319, 405, 335.0, 379.8, 405.0, 405.0, 0.1634325187130234, 3.057784120624094, 0.028568770360967954], "isController": false}, {"data": ["/order-gocar", 15, 0, 0.0, 338.26666666666665, 310, 393, 333.0, 370.8, 393.0, 393.0, 0.16340047277203457, 3.0575462423337942, 0.028563168580267757], "isController": false}, {"data": ["/discovery-topup", 50, 0, 0.0, 1176.2199999999998, 1083, 2267, 1131.0, 1201.0, 1574.5499999999984, 2267.0, 0.5048720149442116, 9.44662871712021, 0.08825399479981826], "isController": false}, {"data": ["/topup-instant", 15, 0, 0.0, 871.6, 317, 1278, 1102.0, 1208.4, 1278.0, 1278.0, 0.16332574775971515, 3.0559991248462017, 0.028550106297840834], "isController": false}, {"data": ["/set-pickup-location-gocar", 15, 0, 0.0, 340.0, 309, 405, 337.0, 387.0, 405.0, 405.0, 0.1634823929462797, 3.059079130927599, 0.028577488610726624], "isController": false}, {"data": ["/discovery-gocar", 50, 0, 0.0, 362.78000000000003, 310, 1095, 338.0, 391.4, 477.19999999999936, 1095.0, 0.5148429214246734, 9.632831726165346, 0.08999695599122708], "isController": false}, {"data": ["/discovery-promos", 50, 0, 0.0, 341.21999999999997, 308, 587, 329.0, 354.9, 506.94999999999993, 587.0, 0.5148800329523221, 9.633505979044383, 0.09000344326022038], "isController": false}, {"data": ["/payment-methods-goride", 20, 0, 0.0, 339.34999999999997, 310, 485, 330.0, 365.20000000000005, 479.0499999999999, 485.0, 0.20752915784667747, 3.8831563012337607, 0.036277069584526624], "isController": false}, {"data": ["/voucher-goride", 20, 0, 0.0, 352.2000000000001, 312, 602, 332.5, 411.70000000000005, 592.5499999999998, 602.0, 0.20739788246762, 3.8806493238829027, 0.03625412203291404], "isController": false}, {"data": ["/discovery-goride", 50, 0, 0.0, 379.70000000000005, 312, 1963, 332.0, 392.79999999999995, 587.0999999999988, 1963.0, 0.5147581151616856, 9.631747674580215, 0.08998213145892746], "isController": false}, {"data": ["/set-pickup-location-goride", 20, 0, 0.0, 332.0, 302, 363, 330.0, 355.5, 362.65, 363.0, 0.2074430568808862, 3.881261620052483, 0.036262018732108034], "isController": false}, {"data": ["/topup-other-methods", 15, 0, 0.0, 334.06666666666666, 314, 364, 329.0, 359.8, 364.0, 364.0, 0.16334709078831305, 3.056185784174934, 0.028553837159285195], "isController": false}, {"data": ["/voucher-gocar", 15, 0, 0.0, 335.93333333333334, 307, 392, 333.0, 374.0, 392.0, 392.0, 0.16350734147963242, 3.059109521986287, 0.028581849731302934], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 370, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
