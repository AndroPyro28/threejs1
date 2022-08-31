import { arr } from "./data/arr";

const findDuplicate = () => {
    const map = new Map();

    for(let i = 0; i < arr.length; i++ ) {
     
        if(map.get(arr[i])) return arr[i];
        
        map.set(arr[i], true);
    }

    return -1;
}

export default findDuplicate;