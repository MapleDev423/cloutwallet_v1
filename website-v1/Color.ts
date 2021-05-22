export type gradient = [string, string, string, string];

const gradients: gradient[] = [
    ["FF007E", "F432A7", "EA64CF", "E094F6"], // Pink
    ["00fF73", "32F47C", "64EA93", "94F6C2"], // Aqua Green
    ["009BFF", "32ABF4", "64D5EA", "94DBF6"], // Blue
    ["FFE200", "F4D832", "EAD964", "F6DE94"], // Yellow
    ["FF1900", "F44832", "EA7664", "F6A194"], // Red
];

export const getRandomGradient = (ignore?: gradient): gradient => {
    const consideredGradients =
        ! ignore
        ? gradients
        : gradients.filter(gradient => gradient !== ignore);
    return consideredGradients[Math.floor(Math.random() * consideredGradients.length)];
}
