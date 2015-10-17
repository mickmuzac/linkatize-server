console.log("Hi there!", 9 + 3)




var aws = require("aws-lib");
var fs = require("fs");

var conf = {
    SearchIndex: "Electronics",
    Keywords: "phone",
    Manufacturer: "Apple",
    ResponseGroup:"Small",
    MerchantId: "Amazon"
};


prodAdv = aws.createProdAdvClient("AKIAJC2ITXFCGMM5XR7A", "GzR6zHNC6oIyc9btk36OygRhgCPYgGhfRHTifcz4", "pri00-20");

prodAdv.call("ItemSearch", conf, function(err, result) {
  console.log(JSON.stringify(result));
  fs.writeFile("out.json", JSON.stringify(result), function(){});
})
