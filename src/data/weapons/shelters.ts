import type { Weapon } from '@/types/weapon.types';

export const SHELTERS: Weapon[] = [
  {
    id: 'parashelter',
    name: 'パラシェルター',
    category: 'shelter',
    iconUrl: '/images/weapons/parashelter.png',
  },
  {
    id: 'campingshelter',
    name: 'キャンピングシェルター',
    category: 'shelter',
    iconUrl: '/images/weapons/campingshelter.png',
  },
  {
    id: 'spy-gadget',
    name: 'スパイガジェット',
    category: 'shelter',
    iconUrl: '/images/weapons/spy-gadget.png',
  },
  {
    id: 'recycled-brella-24',
    name: '24式張替傘',
    category: 'shelter',
    iconUrl: '/images/weapons/recycled-brella-24.png',
  },
];
