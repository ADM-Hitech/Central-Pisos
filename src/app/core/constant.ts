import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class Constant {
    get api() {
        return environment.api;
    }
}
