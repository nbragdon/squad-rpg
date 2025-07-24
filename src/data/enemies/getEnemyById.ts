import { EnemyCharacter } from '../../types/enemy';
import { COMMON_ENEMIES } from './common-enemies';

export function getEnemyById(id: string): EnemyCharacter | undefined {
    return COMMON_ENEMIES.find(e => e.id === id);
}
