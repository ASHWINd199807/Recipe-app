import  express  from "express";
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import {verifyToken} from "./users.js"

const router =express.Router()

router.get("/",async(req,res)=>{                          // to get all the recipes inside the homapage
  try {
    const response = await RecipeModel.find({})
    res.json(response)
  } catch (err){
    res.json(err)
  }
})

router.post("/" ,verifyToken, async(req,res)=>{                          // to get all the recipes inside the homapage
    const recipe = new RecipeModel(req.body)               // creating Document in DB
    try {
      const response = await recipe.save()
      res.json(response)
    } catch (err){
      res.json(err)
    }
  })

router.put("/", async(req,res)=>{                                                 // 
    try {                                                                         // WHATEVER IS SENT FROM axios will be in req.body , in req.param , req.query we can also send data and access it by req.param , req.query          
      const recipe = await RecipeModel.findById(req.body.recipeID)                                   // will user userId to find which user has saved/want to change the saved recipe field  which recipe and use recipeId to insert into that array.
      const user = await UserModel.findById(req.body.userID)    
      user.savedRecipes.push(recipe)                    // adding to the end of the saved recipes , push() funcion adds to the last position to the array.
      await user.save()                                  // sacing the changes to our collection
      res.json( { savedRecipes : user.savedRecipes } )// object key:value , possible as we still have the user 
    } catch (err){
      res.json(err)
    }
  })

router.get("/savedRecipes/ids/:userID",async(req,res)=>{ // contains the ids of the savedRecipes of the user  , when given the useID , it returns the list of the ids of the savedrecipes of teh user
    try{
        const user = await UserModel.findById(req.params.userID)
        res.json({savedRecipes:user?.savedRecipes , url:"https://img.freepik.com/free-photo/vertical-shot-traditional-indian-paneer-butter-masala-cheese-cottage-curry-black-surface_181624-32001.jpg?w=2000"})// user might not exist so a question mark is
    } catch(err){
        res.json(err)
    }
})
   
router.get("/savedRecipes/:userID",async(req,res)=>{                                     // JUst the saved recipes by the userID  contains the ids of the savedRecipes of the user  , when given the useID , it returns the list of the ids of the savedrecipes of teh user
  try{
      const user = await UserModel.findById(req.params.userID)                   // getting the user
      const savedRecipes = await RecipeModel.find({                             // finding the recipes that have their id in recipes list 
        _id: {$in:user.savedRecipes},                                             // recipes whose _id is inside the userID array
      })
      res.json({savedRecipes , url:"https://vegecravings.com/wp-content/uploads/2018/06/Paneer-Tikka-Masala-Recipe-Step-By-Step-Instructions.jpg.webp"})                                 // user might not exist so a question mark is
  } catch(err){
      res.json(err)
  }
})

export { router as recipesRouter }


   


// import express from "express";
// import mongoose from "mongoose";
// import { RecipeModel } from "../models/Recipes.js";
// import { UserModel } from "../models/Users.js";
// import { verifyToken } from "./users.js";

// const router = express.Router();

// router.get("/", async (req, res) => {
//   try {
//     const result = await RecipesModel.find({});
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Create a new recipe
// router.post("/", verifyToken, async (req, res) => {
//   const recipe = new RecipesModel({
//     _id: new mongoose.Types.ObjectId(),
//     name: req.body.name,
//     image: req.body.image,
//     ingredients: req.body.ingredients,
//     instructions: req.body.instructions,
//     imageUrl: req.body.imageUrl,
//     cookingTime: req.body.cookingTime,
//     userOwner: req.body.userOwner,
//   });
//   console.log(recipe);

//   try {
//     const result = await recipe.save();
//     res.status(201).json({
//       createdRecipe: {
//         name: result.name,
//         image: result.image,
//         ingredients: result.ingredients,
//         instructions: result.instructions,
//         _id: result._id,
//       },
//     });
//   } catch (err) {
//     // console.log(err);
//     res.status(500).json(err);
//   }
// });

// // Get a recipe by ID
// router.get("/:recipeId", async (req, res) => {
//   try {
//     const result = await RecipesModel.findById(req.params.recipeId);
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Save a Recipe
// router.put("/", async (req, res) => {
//   const recipe = await RecipesModel.findById(req.body.recipeID);
//   const user = await UserModel.findById(req.body.userID);
//   try {
//     user.savedRecipes.push(recipe);
//     await user.save();
//     res.status(201).json({ savedRecipes: user.savedRecipes });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Get id of saved recipes
// router.get("/savedRecipes/ids/:userId", async (req, res) => {
//   try {
//     const user = await UserModel.findById(req.params.userId);
//     res.status(201).json({ savedRecipes: user?.savedRecipes });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// // Get saved recipes
// router.get("/savedRecipes/:userId", async (req, res) => {
//   try {
//     const user = await UserModel.findById(req.params.userId);
//     const savedRecipes = await RecipesModel.find({
//       _id: { $in: user.savedRecipes },
//     });

//     console.log(savedRecipes);
//     res.status(201).json({ savedRecipes });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// export { router as recipesRouter };
