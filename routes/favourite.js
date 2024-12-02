const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

// Add book to favourites
router.put("/add-book-to-favourite", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers; // Corrected from req.header to req.headers

    // Check if 'bookid' and 'id' are present in headers
    if (!bookid || !id) {
      return res.status(400).json({ message: "Missing book ID or user ID in headers" });
    }

    const userData = await User.findById(id);

    // Check if user exists
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the book is already in the user's favourites
    const isBookFavourite = userData.favourites.includes(bookid); // Corrected method 'includes'
    if (isBookFavourite) {
      return res.status(200).json({ message: "Book is already in favourites" });
    }

    // Add the book to favourites
    await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
    return res.status(200).json({ message: "Book added to favourites" });

  } catch (error) {
    console.error("Error adding book to favourites:", error); // Log the error for debugging
    return res.status(500).json({ message: "An error occurred" });
  }
});


//delete book from favourites
router.put("/remove-book-from-favourite", authenticateToken , async(req,res)=>{
    try {
        const { bookid, id} = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if(isBookFavourite){
            await User.findByIdAndUpdate(id,{ $pull : {favourites : bookid}})
        }
        return res.status(200).json({message: " Book removed from favourites"})
    } catch (error) {
        return res.status(500).json({ message: "An error occurred" });

    }
});

//get  favourites book of particular user

router.get("/get-favourite-books", authenticateToken, async(req,res)=>{
  try {
    const {id} = req.headers;
    const userData= await User.findById(id).populate("favourites");
    const favouriteBooks = userData.favourites;
    return res.json({
      status:"Success",
      data: favouriteBooks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message:"An error occured"});
  }
});



module.exports = router;
