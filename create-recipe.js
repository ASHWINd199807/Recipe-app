// import { useState } from "react"
// import axios from "axios"
// import { useGetUserID } from "../hooks/useGetUserID"
// import { useNavigate } from "react-router-dom"
// import { useCookies } from "react-cookie"

// export const CreateRecipe = () =>{
//     const userID = useGetUserID()
//     const [cookies,_] = useCookies(["access_token"])

//     const [recipe,setRecipe] = useState({
//       name:"",
//       ingredients:[],
//       instructions:"",
//       imageUrl:"",
//       cookingTime:0,
//       userOwner:userID ,
//     })

//     const navigate = useNavigate()

//     const handleChange = (event) =>{
//         const {name , value} = event.target
//         setRecipe({...recipe,[name]:value})          // name & value extracted from event.target.name & event.target.value                        //setaraecipe that is equal to an object that is exactly like the recipe ws but the key(name) will have the new value thta will be hte value that we put
//     }

//     const handleIngredientChange = (event , idx) =>{
//         const {value} = event.target
//         const ingredients =recipe.ingredients
//         ingredients[idx]=value
//         setRecipe({...recipe , ingredients })  //ingredients:ingredients        // name & value extracted from event.target.name & event.target.value                        //setaraecipe that is equal to an object that is exactly like the recipe ws but the key(name) will have the new value thta will be hte value that we put
//     }
    
//     const addIngredient = () =>{
//         setRecipe({...recipe,ingredients:[...recipe.ingredients,""]}) // setRecipe to be equal to whatever the recipe was before , but now the ingredients field will have whatever the ingredients there were before plus , whatever is put in the ""
//     }

//     const onSubmit = async (event) =>{
//         event.preventDefault()
//         try{
//             await axios.post("http://localhost:2999/recipes",recipe,{// recipe is an object so can be passed .
//               headers:{authorization:cookies.access_token},                                
//         })
//             alert("Recipe Created")  
//             navigate("/")  
//         }catch(err){
//             console.error(err)
//         }
//     }
//     return (
//          <div className="create-recipe">
//          <h2>Create Recipe</h2>
//          <form onSubmit={onSubmit}>
//             <label htmlFor="name">Name</label>
//             <input type="text" id="name" name="name" onChange={handleChange}/>
//             <label htmlFor="ingredients">Ingredients</label>
//             {recipe.ingredients.map((ingredient ,idx)=>(
//                 <input 
//                   key={idx}
//                   type="text"
//                   name="ingredients"
//                   value={ingredient}
//                   onChange={(event)=>handleIngredientChange(event , idx)}
//                 />  
//             ))}
//             <button onClick={addIngredient} type="button">
//               Add Ingredient
//             </button>
//             <label htmlFor="instructions">Instructions</label>
//             <textarea  
//             id="instructions" 
//             name="instructions" 
//             onChange={handleChange}
//             ></textarea> 
//             <label htmlFor="imageUrl">Image URL</label>
//             <input 
//             type="text" 
//             id="imageUrl" 
//             name="imageUrl" 
//             onChange={handleChange} 
//             />
//             <label htmlFor="cookingTime">Cooking Time (minutes)</label>
//             <input 
//             type="number" 
//             id="cookingTime" 
//             name="cookingTime" 
//             onChange={handleChange} 
//             />
//             <button type="submit">Create Recipe</button>
//         </form>
//       </div>
//    )
// }


import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:2999/recipes",
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={recipe.name}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={recipe.description}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
          />
        ))}
        <button type="button" onClick={handleAddIngredient}>
          Add Ingredient
        </button>
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={recipe.imageUrl}
          onChange={handleChange}
        />
        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={recipe.cookingTime}
          onChange={handleChange}
        />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};

