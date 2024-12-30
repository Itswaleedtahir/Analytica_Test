const Item = require("../model/item")

module.exports = {
    createItem: async(req,res)=>{
        const {name , description} = req.body
        try {
            if (!name || !description) {
                return res.status(400).json({ msg: "Please provide item data", success: false });
              }
            const item = new Item({
                name: req.body.name,
                description: req.body.description
              });
                const newItem = await item.save();
                return res.status(200).json({ msg: "Item Created Successfully", success: true , item:newItem});
              
        } catch (error) {
            console.error("error", error);
            return res.status(500).json({ msg: "Failed to Create Item", error: error.message, success: false });
        }
    },
    getItems: async (req, res) => {
        try {
            const items = await Item.find({});
            return res.status(200).json({ msg: "Items fetched successfully", success: true, data: items });
        } catch (error) {
            console.error("error", error);
            return res.status(500).json({ msg: "Failed to fetch items", error: error.message, success: false });
        }
    },
    
    deleteItem: async (req, res) => {
        try {
            const {id} = req.params
            const item = await Item.findByIdAndDelete(id);
            if (!item) {
                return res.status(404).json({ msg: "Item not found", success: false });
            }
            return res.status(200).json({ msg: "Item deleted successfully", success: true });
        } catch (error) {
            console.error("error", error);
            return res.status(500).json({ msg: "Failed to delete item", error: error.message, success: false });
        }
    },
}