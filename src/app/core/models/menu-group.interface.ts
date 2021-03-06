import { MenuIntemInterface } from './menu-intem.interface';
import { MenuCollapseInterface } from './menu-collapse.interface';

export interface MenuGroupInterface {
    id: string;
    title: string;
    badge?: {
        quantity: number,
        bg: string,
        fg: string
    };
    translate?: string;
    type: 'group';
    icon?: string; // references icon material
    iconCustom?: boolean;
    children: (MenuCollapseInterface | MenuIntemInterface)[];
}
