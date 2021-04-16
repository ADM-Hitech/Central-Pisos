export interface MenuIntemInterface {
    id: string;
    title: string;
    badge?: {
        quantity: number,
        bg: string,
        fg: string
    };
    translate?: string;
    type: 'item';
    icon?: string; // references icon material
    iconCustom?: boolean;
    url?: string;
    function?: any;
    exactMatch?: boolean;
}
