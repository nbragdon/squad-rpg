import { Skill } from '../../types/game';

// Starcaller/Cosmic themed skills
export const cosmicRay: Skill = {
    id: 'cosmic_ray',
    name: 'Cosmic Ray',
    description: 'Deal cosmic damage to a single enemy and reduce their magic defense.',
    damage: 130,
    cooldown: 2,
    range: 3,
    manaCost: 18,
    isUltimate: false,
    statusEffect: { type: 'magic_def_down', duration: 2, value: -20 }
};

export const stardustShield: Skill = {
    id: 'stardust_shield',
    name: 'Stardust Shield',
    description: 'Grant a shield to all allies that absorbs cosmic damage.',
    cooldown: 4,
    range: 999,
    manaCost: 22,
    isUltimate: false,
    statusEffect: { type: 'cosmic_shield', duration: 2, value: 60 }
};
