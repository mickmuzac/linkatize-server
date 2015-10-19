var aws = require("aws-lib");
var fs = require("fs");
var as = require("async");

var catergories = [
    'laptop',
    'quadcopter',
    'speakers',
    'road bike',
    'bmx bike',
    'couch',
    'headset',
    'monitor',
    'microwave',
    'apple mac',

    'action figure',
    'tv',
    'dslr',
    'tools',

    'xbox console',
    'ps4 console',

    'gaming chair',
    'home theater',

    'robot',
];
var masterList = [];

console.log("Hi there!", 9 + 3);

var conf = {
   SearchIndex: "All",
   Keywords   : "",
   //Manufacturer: "Apple",
   ResponseGroup:"Small,Images,Offers",
   MerchantId: "Amazon",
   MinimumPrice: "1500"
};

var prodAdv = aws.createProdAdvClient("AKIAJC2ITXFCGMM5XR7A", "GzR6zHNC6oIyc9btk36OygRhgCPYgGhfRHTifcz4", "pri00-20");

exports.getList = function(keyword, res){

    as.eachSeries(catergories, function(elem, cb){
        conf.Keywords = elem;
        callAmazon(cb);
    },
    function(){
        fs.writeFile("client/out.json", JSON.stringify(masterList), function(){
            console.log("Done building database!");
           if(res) res.end();
        });
    });

}

function callAmazon(cb){
    prodAdv.call("ItemSearch", conf, function(err, result) {
        var obj = simplifyObject(result);
        if(obj) masterList.push(obj);

        console.log("Received response...");
        setTimeout(cb, 300);
    });
}

function simplifyObject(obj){
    var out = {
        keywords: obj.Items.Request.ItemSearchRequest.Keywords,
        items: []
    };
    var startIndex = 0;

    iterate();
    return out;

    function iterate(){
        for(; startIndex < obj.Items.Item.length; startIndex++){
            try{
                var item = obj.Items.Item[startIndex];
                if(item.Offers.Offer.OfferListing.Price.Amount){
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
            }
            catch(e){
                startIndex++;
                console.log(e);
                iterate();
            }
        }
    }
}
