/**
 *
 * Sendlist
 * Lists CRUD Cotroller
 *
 */
var List = require('../models/list');

module.exports = {


	/**
	 * 
	 * POST
	 * Create a list
	 * 
	 */
	create: function(req,res){

		if(!req.body.items || !req.body.items.length){
			return res.status(400).send({message:'No items provided'});
		}

		var list = new List(req.body);

		// list.user = req.user._id;

		list.save(function(err,doc){
			if(err){
				console.error(err);
				res.status(400).send({success:false});
			} else {
				res.send({success:true});
			}
		});
	},


	/**
	 * 
	 * GET
	 * Read your lists
	 * 
	 */
	feed: function(req,res){
		// var query = { user: { $in: [req.user._id] } };
		var query = {};
		
		if(req.query.before && req.query.before != 'null'){
			query.created = { $lt : req.query.before };
		}

		List.find(query)
			.limit(10)
			.sort({ created: -1 })
			.exec(function(err,docs){
				if(err){
					res.status(400).send({success:false});
				} else {
					res.send({success:true,data:docs});
				}
			});
	},


	/**
	 *
	 * PUT
	 * Update a list
	 *
	 *
	 * Add an item:
	 * PUT /lists
	 * {
	 *	"new_items" : [{"text":"new entry"}]
	 * }
	 *
	 *
	 * Remove an item:
	 * PUT /lists
	 * {
	 *	"item_remove" : "56fc70d0c21f54fc49c86696" *
	 * }
	 *
	 *
	 * Update an item:
	 * PUT /lists
	 * {
	 *	"item_update" : "56fc70d0c21f54fc49c86696",
	 *  "text" : "New text of the entry"
	 * }
	 *
	 *
	 * Set an item done:
	 * PUT /lists
	 * {
	 *	"item_done" : "56fc70d0c21f54fc49c86696"
	 * }
	 */
	update : function(req,res){
		var query = { 
			// user: { $in: [req.user._id] }, 
			_id : req.params.id 
		};

		var update = {};

		if(req.body.new_items){
			// Add items
			update = {
				$pushAll : { items : req.body.new_items }
			};
		} else if(req.body.item_remove){
			// Remove items
			update = {
				$pull : { items : { _id : req.body.item_remove} }
			};
		} else if(req.body.item_update){
			// Update an item's text
			query['items._id'] = req.body.item_update;
			update = {
				$set : { 'items.$.text' : req.body.text }
			};
		} else if(req.body.item_done){
			// Set an item as done
			query['items._id'] = req.body.item_done;
			update = {
				$set : { 'items.$.done' : true }
			};
		}

		console.log('Find one and update:',update);

		List.findOneAndUpdate(query,update,{new:true},function(err,out){
			if(err){
				console.error(err);
				res.status(400).send({success:false});
			} else {
				var response = {success:true};
				if(req.body.new_items){
					// Return created items
					response.items = out.items;
				}
				res.send(response);
			}
		});

	},


	/**
	 *
	 * DELETE
	 * Delete a list
	 *
	 */
	delete : function(req,res){
		var query = { 
			// user: { $in: [req.user._id] }, 
			_id : req.params.id 
		};

		List.findOneAndRemove(query,function(err,doc){
			if(err){
				res.status(400).send({success:false});
			} else {
				res.send({success:true});
			}
		});
	}

};