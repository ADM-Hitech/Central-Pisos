import { MenuGroupInterface } from './menu-group.interface';
import { MenuCollapseInterface } from './menu-collapse.interface';
import { MenuIntemInterface } from './menu-intem.interface';
import { CategoryModel } from './category.model';

export class AppNavigationModel {

    public model: (MenuGroupInterface | MenuCollapseInterface | MenuIntemInterface)[];

    constructor(categories: Array<CategoryModel>) {
        this.model = [
            {
                id: 'menu',
                title: 'MENÚ',
                type: 'group',
                icon: '',
                children: [
                    {
                        id: 'products',
                        title: 'PRODUCTOS',
                        type: 'collapse',
                        iconCustom: false,
                        children: categories.map((category) => ({
                            id: category.id.toString(),
                            title: category.name,
                            type: 'item',
                            url: `/productos/categoria/${category.id}`
                        }))
                    },
                    {
                        id   : 'we',
                        title: 'NOSOTROS',
                        type : 'item',
                        url  : 'nosotros'
                    },
                    {
                        id   : 'branchs',
                        title: 'SUCURSALES',
                        type : 'item',
                        url  : 'sucursales'
                    },
                    {
                        id   : 'contact',
                        title: 'CONTACTO',
                        type : 'item',
                        url  : 'contacto'
                    }
                ]
            }
        ];
    }
}
