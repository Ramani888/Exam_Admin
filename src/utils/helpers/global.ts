import { getDownloadURL, ref, uploadBytesResumable, uploadBytes, deleteObject } from "@firebase/storage";
import { storage } from "./firbase";

export const convertToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        resolve(reader.result);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsDataURL(file);
    });
};

export const isPathIncluded = (pathToCheck: string, subNavArray: any, path: string) => {
  if (subNavArray) {
    for (const item of subNavArray) {
      if (item?.path === pathToCheck) {
        return true;
      }
    }
    return false;
  } else {
    if (pathToCheck === path) {
      return true;
    } else {
      return false;
    }
  }
}

export const isUrlString = (str: any) =>{
  // A simple check if it starts with 'http' could be enough for most cases
  return typeof str === 'string' && str.startsWith('http');
}

export const removeKeyFromObject = (obj: any, keyToRemove: any) => {
  const newObj = { ...obj };
  delete newObj[keyToRemove];
  return newObj;
}

export const removeKeyFromFormData = (formData: any, keyToRemove: any) => {
  const newFormData = new FormData();
  for (const [key, value] of formData.entries()) {
    if (key !== keyToRemove) {
      newFormData.append(key, value);
    }
  }
  return newFormData;
}

export const formatNumber = (number: number) => {
  // Convert the number to a string and insert commas every three digits from the right
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const generateId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// export const uploadImage = async (images: any) => {
//   // Check if the provided images array is valid and not empty
//   if (!images || images.length === 0) {
//     throw new Error('No images provided');
//   }

//   // This array will hold the promises for each image upload
//   const uploadPromises = images.map((image: any) => {
//     const uniqueFileName = `${image.name}-${Date.now()}`; // Ensure unique file names
//     const storageRef = ref(storage, `images/${uniqueFileName}`);

//     const metaData = {
//       contentType: image.type,
//     };

//     // Create a promise for uploading each image
//     return uploadBytesResumable(storageRef, image, metaData)
//       .then((snapshot) => getDownloadURL(snapshot.ref)) // Get the download URL once upload is complete
//       .then((downloadUrl) => ({
//         _id: generateId(),
//         path: downloadUrl,
//       })) // Return an object with a unique ID and the download URL
//       .catch((error) => {
//         console.error(`Failed to upload ${image.name}:`, error);
//         return null; // Return null if an error occurs to avoid breaking the Promise.all
//       });
//   });

//   // Wait for all uploads to complete, filtering out any null values in case of errors
//   const result = await Promise.all(uploadPromises);

//   return result.filter((item) => item !== null); // Return the array of upload results without nulls
// };

// export const uploadVideo = async (video: any) => {
//   if (!video) {
//     throw new Error('No video provided'); // Ensure that a valid video file is provided
//   }

//   // Generate a unique file name for Firebase Storage
//   const uniqueFileName = `${video.name}-${Date.now()}`; // Add a timestamp to ensure uniqueness
//   const storageRef = ref(storage, `videos/${uniqueFileName}`); // Create storage reference

//   const metaData = {
//     contentType: video.type, // Set the appropriate content type
//   };

//   // Upload the video to Firebase Storage
//   const snapshot = await uploadBytesResumable(storageRef, video, metaData);

//   // Get the download URL of the uploaded video
//   const downloadUrl = await getDownloadURL(snapshot.ref);

//   // Return only the download URL
//   return downloadUrl;
// };

export const uploadSingleImage = async (image: any) => {
  if (!image) {
    throw new Error('No image provided'); // Ensure that a valid video file is provided
  }

  // Generate a unique file name for Firebase Storage
  const uniqueFileName = `${image.name}-${Date.now()}`; // Add a timestamp to ensure uniqueness
  const storageRef = ref(storage, `candidate/${uniqueFileName}`);

  const metaData = {
    contentType: image.type, // Set the appropriate content type
  };

  // Upload the video to Firebase Storage
  const snapshot = await uploadBytesResumable(storageRef, image, metaData);

  // Get the download URL of the uploaded video
  const downloadUrl = await getDownloadURL(snapshot.ref);

  // Return only the download URL
  return downloadUrl;
};

export const uploadBase64SingleImage = async (base64StringData: string, fileName: string, contentType: string) => {
  // Step 1: Decode base64 to binary
  const base64String = base64StringData.replace(/^data:image\/(png|jpeg);base64,/, "");

  const byteCharacters = atob(base64String);
  // const byteCharacters = decodeBase64String(base64String);

  if (byteCharacters) {
    // Step 2: Convert binary to Blob
    const byteNumbers = new Array(byteCharacters?.length);
    for (let i = 0; i < byteCharacters?.length; i++) {
      byteNumbers[i] = byteCharacters?.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: contentType });

    // Step 3: Generate a unique file name for Firebase Storage (if needed)
    const uniqueFileName = `${fileName}-${Date.now()}`; // Adjust as needed
    
    // Step 4: Upload the Blob to Firebase Storage
    const storageRef = ref(storage, `candidate/${uniqueFileName}`); // Adjust the storage path as needed
    const metaData = { contentType };

    try {
      const snapshot = await uploadBytesResumable(storageRef, blob, metaData);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return downloadUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
};

export const deleteSingleImage = async (path: string) => {
  try {
    const fileRef = ref(storage, path);
    await deleteObject(fileRef);
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

export const generatePassword = (length = 12) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) {
    password += charset[array[i] % charset.length];
  }
  return password;
};

export const addMinutes = (time: string, minutesToAdd: number): string => {
  // Split time into hours and minutes
  const [hours, minutes] = time.split(':').map(Number);

  // Create a Date object with the given time
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);

  // Add the minutes
  date.setMinutes(date.getMinutes() + minutesToAdd);

  // Format the new time as HH:MM
  const newHours = date.getHours().toString().padStart(2, '0');
  const newMinutes = date.getMinutes().toString().padStart(2, '0');
  return `${newHours}:${newMinutes}`;
};

export const addMinutesToDateOnly = (date: string, minutesToAdd: number): string => {
  // Create a Date object from the given date string
  const dateObj = new Date(date);

  // Set the time to midnight (00:00) to ensure only the date is considered
  dateObj.setHours(0, 0, 0, 0);

  // Add the minutes
  dateObj.setMinutes(dateObj.getMinutes() + minutesToAdd);

  // Format the new date as YYYY-MM-DD
  const newDate = dateObj.toISOString().split('T')[0];

  return newDate;
};



