export function makeUniqueId(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    
    for (let counter = 0; counter < length; counter++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
}