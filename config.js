var config = {}

//cosmos db conection configuration
config.endpoint = "https://lagashcosmosdb.documents.azure.com:443/";
config.primaryKey = "wwx0C0FwtHtlxaXf63XtxGOnaAtCdkf3HSQ4MKaZaz1FvFn9en6VTq5elcv8eTBFNADAB8aGra9e0ygUhnAetw==";

//cosmos db database configuration
config.database = {
   "id": "LagashDatabase"
};

//cosmos db container configuration
config.container = {
  "id": "LagashContainer"
};

//datos para guardar en cosmos db
config.items = {
   "WeAre":{
   	"id":"We1",
   	"Detail":"A company dedicated to designing and developing digital products and platforms, enabling new ways to think about challenges and innovating with our customers.",
   	"Passion":"Our passion is to connect technologies and platforms to create meaningful experiences, improve processes and transform traditional businesses into digital ones."
   },
   "WeDo":{
   	"id":"We2",
   	"Detail":"Digitization changes the way organizations carry out operations and especially how they interact with their customers",
   	"More":[{
   		"1":"At Lagash, we conceive the creation of digital products as a feedback loop between two activities: THE DISCOVERY and THE DELIVERY. This is what we call The Digital Factory.",
		"2":"Not only is Digital Factory our strategy, but also the universe in which we create great software. This is the concrete form that our vision adopts when transforming the world.",
		"3":"Digital Factory means applying methodologies that allow us to deliver in an ongoing way. Thus, supporting continuous research and delivery activities through Digital Product Squads than can provide Technological Development and User Experience to the entire organization."
   	}]
   },
   "WeEnable":{
   	"id":"We3",
   	"Detail":"Our clients are key players in today’s competitive world. They think and act big, spare no effort to become leaders in their field, regarding digital transformation as a daily challenge.",
   	"More":"While our clients set the vision and define the summit of their market, we work as digital Sherpas who guide them on their way to the top, sharing every step of their digital journey."
   },
   "Contacts":{
   	"id":"Co4",
   	"Country":[{
   		"id":"Co5",
			"AR":{
	   		"City":"Buenos Aires",
	   		"Address":"Venezuela 4269 4°",
	   		"Phone Number" : "T: +54 (11) 4982 4185"
		   	},
		   	"id":"Co6",
		   	"CL":[{
		   		"Contact 1":{
		   			"City":"Concepción",
			   		"Address":"Cochrane N 635 Torre A oficina 702, Concepción",
			   		"Phone Number" : "null"
		   		},

				"Contact 2":{
		   			"City":"Santiago",
			   		"Address":"Los militares 5890 of 1703, Las condes ",
			   		"Phone Number" : "T: +56 (2) 2231 9428" 	
			   }
			}]
		}]
	}
};

//export the configuration
module.exports = config;