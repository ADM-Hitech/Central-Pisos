import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../../../core/constant';

@Injectable({
    providedIn: 'root'
})
export class BranchOfficesService {
    constructor(
        private http: HttpClient,
        private constant: Constant
    ) {}
}
