// import { type Dispatch, type SetStateAction } from "react";

// export default function Blog(
//     {message,label,headings,setHeading}:
//     {message:string,label:string,headings: string[], 
//     setHeading: Dispatch<SetStateAction<string[]>>
// }) {

//   // Update a specific input value
//   const handleChange = (index: number, value: string) => {
//     const newHeading = [...headings];
//     newHeading[index] = value;
//     setHeading(newHeading);
//   };

//   // Add a new input field
//   const addLink = () => {
//     setHeading([...headings, ""]);
//   };

//   // Remove an input field
//   const removeLink = (index: number) => {
//     const newLinks = links.filter((_, i) => i !== index);
//     setLinks(newLinks);
//   };

//   return (
//     <div className="flex flex-col">
//     <label className="pb-2 text-3xl font-bold text-white">{label}</label>
//       {links.map((link, index) => (
//         <div key={index} className="flex flex-col pt-2">
//           <input
//             className="h-12 max-w-96 rounded-lg bg-blue-100 p-2 text-[#4d877ede] text-xl shadow-2xl shadow-black"
//             type="text"
//             placeholder={message}
//             value={link}
//             onChange={(e) => handleChange(index, e.target.value)}
//           />
//           <div className="pt-2 flex flex-row gap-40">
//             {links.length > 1 && (
//                 <button
//                     className=" bg-red-950 rounded-lg w-28 text-xl"
//                     type="button" onClick={() => removeLink(index)}>
//                 Remove
//                 </button>
//             )}
//                 <button className=" bg-blue-950 rounded-lg w-28 text-xl"
//                             type="button" onClick={addLink}>
//                     + add more 
//                 </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
