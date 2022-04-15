import { MenuIntemInterface } from './menu-intem.interface';

export interface MenuCollapseInterface {
    id: string;
    title: string;
    translate?: string;
    type: 'collapse';
    icon?: string; // references icon material
    iconCustom?: boolean;
    children: (MenuIntemInterface | MenuCollapseInterface)[];
}
