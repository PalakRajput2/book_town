const router = require("express").Router();
const User = require("../models/user");
const {authenticateToken} = require("./userAuth");

//add to cart 
router.put("/add-to-cart", authenticateToken , async(req,res)=>{
    try {
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);
        const isBookinCart = userData.cart.includes(bookid);
        if( isBookinCart){
            return res.json({
                status :"success",
                message:"Book is already in cart",
            })
        };
        await User.findByIdAndUpdate(id,{
            $push : { cart: bookid},
        });
        return res.json({
            status : "Success",
            message: " Book added to cart",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message : "An error occured"});
    }
});

router.put("/remove-from-cart/:bookid", authenticateToken, async (req, res) => {
    try {
      const { bookid } = req.params;
      const { id } = req.headers;
  
      const user = await User.findByIdAndUpdate(
        id,
        { $pull: { cart: bookid } },
        { new: true } // This option returns the updated document
      );
  
      if (user) {
        return res.status(200).json({
          status: "success", // Changed to lowercase to match frontend
          message: "Book removed from cart",
        });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error in remove-from-cart:", error);
      return res.status(500).json({ message: "An error occurred" });
    }
  });
  
//get cart of a particular user 
router.get("/get-user-cart",authenticateToken, async(req,res)=>{
    try {
      const {id} = req.headers;
      const userData = await User.findById(id).populate("cart");
      const cart = userData.cart.reverse();
      return res.json({
        status : "Success",
        data: cart,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message:"An error occured"});
    }
  });
module.exports = router;