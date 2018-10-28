import {Component, OnInit, Output, Input, EventEmitter, ViewChild} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    @Output() onMenuToggle = new EventEmitter();
    @Input() navs = [];

    logoUrl = environment.logoUrl;
    appName = environment.appName;
    searchExpanded = false;

    ngOnInit(): void {
    }

}
