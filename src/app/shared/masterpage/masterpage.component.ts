import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {TranslateService} from '@ngx-translate/core';

// import { ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-masterpage',
    templateUrl: './masterpage.component.html',
    styleUrls: ['./masterpage.component.scss']
    // encapsulation: ViewEncapsulation.None
})
export class MasterpageComponent implements OnInit {

    sidenavMode$: Observable<string> = of('over');
    sidenavOpen$: Observable<boolean> = of(false);

    navs: {
        icon: string;
        link: string;
        name: string;
        external?: boolean;
    }[];

    constructor(
        private breakpointObserver: BreakpointObserver,
        private translate: TranslateService
    ) {
    }

    ngOnInit() {
        this.sidenavMode$ = this.breakpointObserver.observe([
            Breakpoints.XSmall,
            Breakpoints.Small
        ]).pipe(
            map(result => result.matches ? 'over' : 'side')
        );
        this.sidenavOpen$ = this.breakpointObserver.observe([
            Breakpoints.XSmall,
            Breakpoints.Small
        ]).pipe(
            map(result => result.matches ? false : true)
        );

        this.navs = [
            {
                icon: 'dashboard',
                link: '/',
                name: this.translate.instant('Dashboard')
            },
            {
                icon: 'gavel',
                link: '/producers',
                name: this.translate.instant('Producers')
            },
            {
                icon: 'link',
                link: '/blocks',
                name: this.translate.instant('Blocks')
            },
            {
                icon: 'list_alt',
                link: '/transactions',
                name: this.translate.instant('Transactions')
            },
            {
                icon: 'settings',
                link: '/settings',
                name: this.translate.instant('Settings')
            },
            {
                icon: 'account_balance_wallet',
                external: true,
                link: environment.walletUrl,
                name: this.translate.instant('Wallet')
            }
        ];
    }
}
