export default function convertParam(param: string): number | string {
    // Check if the param can be converted to a valid number
    const num = parseInt(param, 10);
    
    // If it's not a number, isNaN will return true
    if (!isNaN(num)) {
        return num;
    } else {
        return param;
    }
}

// Usage example
//const param = req.params.id; // Assuming req.params.id is a string
//const result = convertParam(param);
