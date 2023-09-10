// import React, { useEffect, useState } from "react";
// import { useGetUserID } from "../hooks/useGetUserID";
// import axios from "axios";

// export const SavedRecipes = () => {
//   const [savedRecipes, setSavedRecipes] = useState([]);
//   const userID = useGetUserID();

//   useEffect(() => {
//     const fetchSavedRecipes = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:2999/recipes/savedRecipes/${userID}`
//         );
//         setSavedRecipes(response.data.savedRecipes);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchSavedRecipes();
//   }, []);
//   return (
//     <div>
//       <h1>Saved Recipes</h1>
//       <ul>
//         {savedRecipes.map((recipe) => (
//           <li key={recipe._id}>
//             <div>
//               <h2>{recipe.name}</h2>
//             </div>
//             <p>{recipe.description}</p>
//             <img src={recipe.imageUrl} alt={recipe.name} />
//             <p>Cooking Time: {recipe.cookingTime} minutes</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// // import { useEffect , useState } from "react"
// // import axios from "axios"
// // import { useGetUserID } from "../hooks/useGetUserID"

// // export const SavedRecipes = () =>{
// //     const [savedRecipes,setSavedRecipes] = useState([])
// //     const userID = useGetUserID()
   
// //     useEffect(()=>{
// //         const fetchSavedRecipe =async () =>{
// //             try{
// //                 const response=await axios.get(
// //                     `http://localhost:2999/recipes/savedRecipes/${userID}`     // passed through PARAM as can't send data thhrough get request with req.body             
// //                     )                               // recipe is an object so can be passed .
// //                 setSavedRecipes(response.data.savedRecipes)
// //                }catch(err){
// //                     console.error(err)
// //                 }
// //             }

// //         fetchSavedRecipe()
// //     },[])

// //     return (
// //       <div>
// //       <h1>Saved Recipes</h1>
// //       <ul>
// //         {SavedRecipes.map((recipe)=>(
// //             <li key ={recipe._id}>
// //                 <div>
// //                     <h2>{recipe.name}</h2>
// //                     <button 
// //                     onClick={()=>saveRecipe(recipe._id)}
// //                     disabled={isRecipeSaved(recipe._id)}
// //                     >
// //                     {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
// //                     </button>
// //                 </div>
// //                 <div className="instructions">
// //                     <p>{recipe.instructions}</p>
// //                 </div>
// //                 <img src={recipe.imgUrl} alt={recipe.name}/>
// //                 <p>Cooking Time:{recipe.cookingTime} (minutes)</p>
// //             </li>
// //         ))}
// //       </ul>
// //       </div>
// //     )
// // }

import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();
  const [url , setUrl]=useState(null)
  const [leftMargin , setLeftMargin]=useState(5)
  const [rightMargin , setRightMargin]=useState(5)
  const[zoom,setZoom]=useState(400)

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      alert("Hello , useEffect !")
      try {
        const response = await axios.get(
          `http://localhost:2999/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
        setUrl(response.data.url)
        alert(savedRecipes,"url") // remember to send the margins , zoom otions with the image url
        setZoom(0)
        setLeftMargin(0)
        setRightMargin(0)

      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);

  // in src you can src={variable} , src="link"
  let urldefault="https://cdn3.vectorstock.com/i/1000x1000/20/92/user-man-icon-vector-25482092.jpg"
  return (
    <div>
      <div>
      <div style={{border:"2px solid blue" , width:"600px" , height:"400px"}} >
      <div style={{border:"2px solid red" , width:"500px" , height:"350px"}} >
      <img style={{height:`${zoom}px` , width:`${zoom}px` ,marginLeft:`${leftMargin}px` ,marginRight:`${rightMargin}px`, display:"inline"}} src={url?url:urldefault} alt={"hello"} />
      </div></div>
      <h1 style={{height:"200px" , width:"200px" , display:"inline"}} >Saved Recipes</h1>
      </div>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <p>{recipe.description}</p>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
      <button onClick={()=>{setLeftMargin(leftMargin+5)}}>Left</button>
      <button onClick={()=>{setRightMargin(rightMargin+5)}}>Right</button>
      <button onClick={()=>{setZoom(zoom+10)}}>+</button>
      <button onClick={()=>{setZoom(zoom-10)}}>-</button>
      
    </div>
  );
};