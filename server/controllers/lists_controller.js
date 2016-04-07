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

		var list = new List(req.body);

		//Set author
		list.user = req.user._id;

		list.save(function(err,doc){
			if(err){
				res.status(400).send({success:false});
			} else {
				res.send({success:true,list:doc});
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
		var query = { user: req.user._id };
		
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
	 *	"item_done" : "56fc70d0c21f54fc49c86696",
	 *	"done" : false
	 * }
	 */
	update : function(req,res){
		var query = { 
			user: req.user._id, 
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
				$set : { 'items.$.done' : !!req.body.done }
			};
		}

		List.findOneAndUpdate(query,update,{new:true},function(err,out){
			if(err){
				res.status(400).send({success:false});
			} else {
				var response = {success:true};
				if(req.body.new_items){
					// Return items
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
			user: req.user._id, 
			_id : req.params.id 
		};

		List.findOneAndRemove(query,function(err,doc){
			if(err){
				res.status(400).send({success:false});
			} else {
				res.send({success:true});
			}
		});
	},


	/**
	 *
	 * GET
	 * Find a specific shared list
	 *
	 */	
	find: function(req,res){
		List.findOne(
			{ 
				_id: { $in : [req.params.id]},
				user: req.user._id
			},
			function(err,doc){
				if(err){
					res.status(400).send({success:false});
				} else if(!doc){
					res.status(404).send({success:false});
				} else {
					res.send({success:true,list:doc});
				}
			});
	},


	/**
	 *
	 * GET
	 * Find a specific shared list
	 *
	 */	
	shared: function(req,res){
		List.findOne(
			{ 
				_id: { $in : [req.params.id]},
				shared : true
			},
			function(err,doc){
				if(err){
					res.status(400).send({success:false});
				} else if(!doc){
					res.status(404).send({success:false});
				} else {
					res.send({success:true,list:doc});
				}
			});
	}

};