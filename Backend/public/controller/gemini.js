// import { 
//     getFunctions,
//     httpsCallable,
//     connectFunctionsEmulator, 
//  } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-functions.js";
// import {app} from './firebase_core.js';

// const functions = getFunctions(app);

// connectFunctionsEmulator(functions, 'localhost', 5001);

// const cloudFnGetImageDescription = httpsCallable(functions, 'cloudFnGetImageDescription');

// export async function getImageDescription(imageURL){
//     try{
//     const response  = await cloudFnGetImageDescription(imageURL);
//     console.log(response.data);
//     return response.data;
//     }
//     catch(e){
//         console.error('Error generating text by gemini',e);
//         throw e;
//     }
// }

// const { onCall, HttpsError } = require("firebase-functions/v2/https");

// const API_KEY = 'AIzaSyB9nSzRc-Zh_Dx4SksBK2eJLSmYr3ryYuI';

// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const genAI = new GoogleGenerativeAI(API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// exports.cloudFnGetResponse = onCall(cloudFnGetResponse);

// async function cloudFnGetResponse(request) {
//     if (!request.auth) {
//         throw new HttpsError('unauthenticated', 'You must be authenticated to use this function');
//     }

//     const userPrompt = request.data;
//     if (!userPrompt || typeof userPrompt !== 'string') {
//         console.error('No valid text prompt provided');
//         throw new HttpsError('invalid-argument', 'You must provide a text prompt');
//     }

//     try {
//         const result = await model.generateContent(userPrompt);
//         return result.response.text();
//     } catch (e) {
//         console.error('Error generating response from Gemini', e);
//         throw new HttpsError('internal', 'Error generating response from Gemini');
//     }
// }
