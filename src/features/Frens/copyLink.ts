// import { toast } from "react-hot-toast";

export const copyToClipboard = (textToCopy:string) => {  
      
    navigator.clipboard.writeText(textToCopy)  
        .then(() => {  
        //   toast.success('Успешно скопированна')
        })  
        .catch(err => {  
        //   toast.error(err)
        });  
  };  