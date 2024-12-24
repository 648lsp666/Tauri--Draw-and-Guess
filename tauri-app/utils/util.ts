export const getRandomRadius = () => {
    const random1 = Math.floor(Math.random() * 255);
    const random2 = Math.floor(Math.random() * 255);
    return `${random1}px ${random2}px`;
};
