//importing the cosmos db
const CosmosClient = require('@azure/cosmos').CosmosClient;
//importing the config file
const config = require('./config');

//getting the azure cosmos db endpoint from the config file
const endpoint = config.endpoint;

//getting the azure cosmos db key from the config file
const masterKey = config.primaryKey;

//creating the azure cosmos db conecction
const client = new CosmosClient({endpoint: endpoint, auth:{masterKey: masterKey}});

//creating a status to show if the server exists
const HttpStatusCodes = {NOTFOUND: 404};

//getting the database information
const databaseId = config.database.id;
const containerId= config.container.id;

//creating the database
async function createDatabase(){
	try{
		const {database} = await client.databases.createIfNotExists({id:databaseId});
		console.log(`Created database: ${database.id}\n`);
	}catch(error){
		console.log(error);
	}
}

//creating function to create a container in cosmos db to save the items
async function createContainer(){
	try{
		const { container } = await client.database(databaseId).containers.createIfNotExists({id: containerId});
	    console.log(`Created container: ${config.container.id}\n`);
    }catch(error){
		console.log(error);
	}
}


// BEGIN CRUD
//if the item to insert not exists, a new item is inserted
async function createLagashItem(itemBody){
	try{
		const {item} = await client.database(databaseId).container(containerId).item(itemBody.id).read();
		console.log(`Item with Lagash id ${itemBody.id} already exists\n`);
	}catch(error){
		if(error.code===HttpStatusCodes.NOTFOUND){
			const {item} = await client.database(databaseId).container(containerId).items.create(itemBody);
			console.log(`Created Lagash item with id: ${itemBody.id}\n`);
		}else{
			console.log(error);
			throw error;
		}
	}
}

//creating function to retrieve the data in cosmos db container
async function getContainerData(){
	console.log(`we will to query the container: ${config.container.id}`);
	//creating the query to get all childrens in lagash container
	try{
			const queryData ={
			query: "SELECT VALUE r.More FROM root r WHERE r.id =@id",
			parameters: [
				{
					name: "@id",
					value: "We3"
				}
			]
		};
		//executing the query
		const {result: results} = await client.database(databaseId).container(containerId).items.query(queryData).toArray();
		for(var queryResult of results){
			let resultString = JSON.stringify(queryResult);
			console.log(`\tThe result is: ${resultString}\n`);
		}
	}catch(error){
		console.log(error);
	}	
}

//creating function to update an item in cosmos db container
async function UpdateData(itemBody){
	console.log(`Item that is been updated is: ${itemBody.id}\n`);
	try{
		itemBody.More = "Good job!";
		const {item} = await client.database(databaseId).container(containerId).item(itemBody.id).replace(itemBody);
	}catch(error){
		console.log(error);
	}
}

//creating function to delete an item from cosmos db container
async function DeleteItem(itemBody){
	try{
		await client.database(databaseId).container(containerId).item(itemBody.id).delete(itemBody);
		console.log(`Deleted item was: ${itemBody.id}\n`);
	}catch(error){
		console.log(error);
	}
}

//creating function to delete the data base
async function DeleteDatabase(){
	try{
		await client.database(databaseId).delete();
	}catch(error){
		console.log(error);
	}
}

// END CRUD

//creating exit function
function exit(message){
	console.log(message);
	console.log('Press any key to exit from application');
	process.stdin.setRawMode(true);
	process.stdin.resume();
	process.stdin.on('data',process.exit.bind(process,0));
}

//executing the functions
createDatabase()
.then(()=> createContainer())
.then(()=> createLagashItem(config.items.Contacts))
.then(()=> createLagashItem(config.items.WeEnable))
.then(()=> getContainerData())
.then(()=> UpdateData(config.items.WeEnable))
.then(()=> getContainerData())
.then(()=> DeleteItem(config.items.Contacts))
.then(()=> DeleteDatabase())
.then(()=> {exit(`Good Job!`);})
.catch((error) => {exit(error);});




