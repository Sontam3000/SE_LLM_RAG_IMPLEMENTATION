// import { talkToLLM } from "./LLAMA.js";
// import { LoadContext } from './firebase_controller.js';

//   let context='';
// export async function loadContext (course) {
//   context = await LoadContext(course);
// }
// export async function Chat(message) {


//   try {
//     if (context != '') {
//       const message2 = "accoding to " + context + " answer " + message;
//       const response = await talkToLLM(message2);
//       return response.content;

//     }

//     const response = await talkToLLM(message);
//     return response.content;

//   } catch (err) {
//     console.error("Failed to call LLaMA:", err);
//   }

// }



import { Payload } from '../model/Payload.js';
import { LoadContext } from './firebase_controller.js';

  let context='';

export async function loadContext (course) {
  if(course != ''){
    context = await LoadContext(course);
  }
  else{ context = '';}
  }


export async function Chat(message) {
    if (context != '') {
    const p = await Payload.init();
    console.log(p.getPayload());
    return context + ' got ' + message;
  }
  const p = await Payload.init();
  console.log(p.getPayload());
  return ' got ' + message;

}