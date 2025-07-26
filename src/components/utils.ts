import { Rarity } from "../types/game";

export const getRarityColor = (rarity: Rarity): string => {
    switch (rarity) {
        case Rarity.COMMON:
            return '#808080';
        case Rarity.RARE:
            return '#0080ff';
        case Rarity.EPIC:
            return '#8000ff';
        case Rarity.LEGENDARY:
            return '#ff8000';
        default:
            return '#808080';
    }
};