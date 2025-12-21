export const Colors = {
    WHITE: 'rgb(255, 255, 255)',
    BLUE: 'rgb(204, 229, 255)',
    PINK: 'rgb(248, 215, 218)',
    GRAY: 'rgb(68, 68, 68)',
    LIGHT_GRAY: 'rgb(136, 136, 136)',
    LIGHT_BLUE: 'rgb(128, 189, 255)',
    NAVY_BLUE: 'rgb(0, 123, 255)',
};

export type Color = (typeof Colors)[keyof typeof Colors];
