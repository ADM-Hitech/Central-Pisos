import { MenuGroupInterface } from './menu-group.interface';
import { MenuCollapseInterface } from './menu-collapse.interface';
import { MenuIntemInterface } from './menu-intem.interface';

export class AppNavigationModel {

    public model: (MenuGroupInterface | MenuCollapseInterface | MenuIntemInterface)[];

    constructor(rol?: string, modules?: Array<any>) {
        this.model = [
            {
                id: 'menu',
                title: 'MENÚ',
                type: 'group',
                icon: '',
                children: [
                    {
                        id   : 'investment',
                        title: 'Inversiones',
                        type : 'item',
                        url  : 'investment',
                        icon: 'addchart'
                    },
                    {
                        id   : 'profile',
                        title: 'Mi Perfil',
                        type : 'item',
                        url  : 'my-profile',
                        icon: 'manage_accounts'
                    },
                    {
                        id   : 'technicalsupport',
                        title: 'Soporte Técnico',
                        type : 'item',
                        url  : 'technical-support',
                        icon: 'addchart'
                    },
                    {
                        id   : 'settings',
                        title: 'Ajustes',
                        type : 'item',
                        url  : 'settings',
                        icon: 'addchart'
                    }
                ]
            }
        ];
    }
}
