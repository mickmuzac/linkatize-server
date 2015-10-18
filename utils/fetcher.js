var aws = require("aws-lib");
var fs = require("fs");

console.log("Hi there!", 9 + 3)

var conf = {
   SearchIndex: "All",
   Keywords   : "",
   //Manufacturer: "Apple",
   ResponseGroup:"Small,Images,Offers",
   MerchantId: "Amazon"
};

var prodAdv = aws.createProdAdvClient("AKIAJC2ITXFCGMM5XR7A", "GzR6zHNC6oIyc9btk36OygRhgCPYgGhfRHTifcz4", "pri00-20");

exports.getList = function(keyword, res){
    conf.Keywords = keyword;

    prodAdv.call("ItemSearch", conf, function(err, result) {
     console.log(JSON.stringify(result));
     fs.writeFile("client/out.json", JSON.stringify(simplifyObject(result), null, 4), function(){
        if(res) res.end();
     });
    });
}

function simplifyObject(obj){
    try{
        var out = {
            keywords: obj.Items.Request.ItemSearchRequest.Keywords,
            items: []
        };

        for(var i = 0; i < obj.Items.Item.length; i++){
            var item = obj.Items.Item[i];
            console.log(JSON.stringify(item.Offers.Offer, null, 4));
            out.items.push({
                url: item.DetailPageURL,
                small: item.SmallImage.URL,
                medium: item.MediumImage.URL,
                large: item.LargeImage.URL,
                title: item.ItemAttributes.Title,
                by: item.ItemAttributes.Manufacturer,
                group: item.ItemAttributes.ProductGroup,
                price: item.Offers.Offer.OfferListing.Price.Amount
            });
        }

        return out;
    }
    catch(e){
        console.log(e);
        return null;
    }
}
