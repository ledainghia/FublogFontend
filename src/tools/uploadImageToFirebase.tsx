import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { storage } from "../config/firebase";
import { useToastSuccessStore } from "../config/ZustandStorage";
const { addToastSuccess } = useToastSuccessStore();
export const uploadImageToFirebase = async (image: File) => {
  if (image && image.type.startsWith("image/")) {
    if (image?.size && image?.size > 10000000) {
      console.log(image?.size);
    } else {
      console.log(image.type);
      const storageRef = ref(storage, `/files/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(progress);
          // add progress for toast of upload image using toastify
        },
        (err) => {
          console.log(err);
        },
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            addToastSuccess("Upload image success");
            console.log(url);
            return url;
          });
        }
      );
    }
  } else {
    // toast.error("You cannot upload another file different image file", {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    // });
  }
};
