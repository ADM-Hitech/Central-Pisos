export interface ISettingsApp {
    layout: {
        navigation: 'right' | 'left' | 'top' | 'none'
        navigationFolded: boolean,
        toolbar: 'above' | 'below' | 'none'
        footer: 'above' | 'below' | 'none'
        mode: 'boxed' | 'fullwidth'
    };
    colorClasses: {
        toolbar: string,
        navbar: string,
        footer: string
    };
    customScrollbars: boolean;
    routerAnimation: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideRight' | 'slideLeft' | 'none';
}
