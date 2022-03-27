// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const randomInArray = (array: any[]) => {
    return array[Math.floor(Math.random() * array.length)];
};
export const randomPropertyInObj = (obj: Record<string, unknown>) => {
    const keys = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
};
