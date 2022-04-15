import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Constant } from 'src/app/core/constant';
import { BranchOfficeModel } from 'src/app/core/models/branch-office.model';
import { appAnimations } from '../../../../core/animations';

@Component({
    selector: 'app-content-branch-offices',
    templateUrl: './content-branch-offices.component.html',
    styleUrls: ['./content-branch-offices.component.scss'],
    animations: appAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ContentBranchOfficessComponent {

    public address = 'Azores 712 Col. Santa Cruz Atoyac entre División del Norte y República, Delegación Benito Juárez C.P. 03310';
    public telephones = ['55 56884865', '55 56888494', '55 5688076', '55 56884908'];
    public lat = 19.3652782;
    public lng = -99.1578436;
    public zoom = 14;
    public listBranchOffices: Array<BranchOfficeModel>;
    public constant: Constant = new Constant();

    constructor() {
        this.listBranchOffices = this.constant.branches;
    }

    public changeIndexBranch(id: number) {
        const active = this.listBranchOffices.find(b => b.id == id);

        if (!!active) {
            this.changeCoordenadas(active.longitud, active.latitud);
        }
    }

    public changeCoordenadas(long: number, lat: number): void {
        this.lat = lat;
        this.lng = long;
    }
}
