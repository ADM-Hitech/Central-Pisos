import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class Constant {
    get api() {
        return environment.api;
    }

    get customerKey() {
        return environment.customerKey;
    }

    get customerSecret() {
        return environment.customerSecret;
    }

    get branches() {
        return [
            {
                id: 1,
                address: 'Azores 712 Col. Santa Cruz Atoyac entre División del Norte y República, Delegación Benito Juárez C.P. 03310',
                state: 'CDMX',
                isPrincipal: false,
                telephones: ['55 56884865', '55 56888494', '55 5688076', '55 56884908'],
                latitud: 19.3652782,
                longitud: -99.1578436
            },
            {
                id: 2,
                address: 'Av. Paseo Central No. 12 Colonia San Cayetano C.P 76807 San Juan del Río Querétaro.',
                state: 'Querétaro',
                isPrincipal: false,
                telephones: ['01 (427) 272 4650', '01 (427) 272 6324'],
                latitud: 20.3846327,
                longitud: -99.9869281
            },
            {
                id: 3,
                address: 'Carretera Tequesquitengo-Galeana s/n Colonia Galeana Centro, CP 62785, Zacatepec, Morelos.',
                state: 'MORELOS',
                isPrincipal: true,
                telephones: ['734 345 9922'],
                latitud: 18.6288358,
                longitud: -99.2164291
            },
            {
                id: 4,
                address: 'Carretera Alpuyeca-Jojutla no.50 colonia Lázaro Cárdenas, C.P. 62780, Zacatepec, Morelos',
                state: 'MORELOS',
                isPrincipal: false,
                telephones: ['734 341 2959'],
                latitud: 20.3846327,
                longitud: -99.9869281
            },
            {
                id: 5,
                address: 'Carretera federal México-Cuautla no.51 colonia Santa Bárbara, Atlatlahuacan-Morelos C.P.62840',
                state: 'MORELOS',
                isPrincipal: false,
                telephones: ['735 262 0171', '735 392 2483'],
                latitud: 18.8684341,
                longitud: -98.9187035
            }
        ];
    }
}
