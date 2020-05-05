import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MonitorsService } from 'src/app/services/monitors.service';
import { HttpHeaders, HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Version } from 'src/environments/environment';
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isActive: boolean;
    collapsed: boolean;
    showMenu: string;
    pushRightClass: string;
    
    version
    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(private translate: TranslateService, public router: Router, public monService: MonitorsService, private http : HttpClient) {
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
        this.version = Version
    }

    ngOnInit() {
        this.isActive = false;
        this.collapsed = false;
        this.showMenu = '';
        this.pushRightClass = 'push-right';
    }


    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

    public printPDF()
    {
        let headers = new HttpHeaders(
            {
                'Accept': 'application/pdf',
                "Access-Control-Allow-Origin": "*",
                
            })
        // headers = headers.set('Accept', 'application/pdf');
  
        const qr_pdf = this.monService.getIp()+"/cv/v1/qr/cvmonitor"
        // this.http.get(qr_pdf, { headers: headers, responseType: 'blob' }).subscribe(
            this.http.get(qr_pdf, { headers: headers, responseType:'arraybuffer' }).subscribe(
            (response :any) => { // download file
                const blob = new Blob([response], {type: 'application/pdf'});
                const blobUrl = URL.createObjectURL(blob);
                const iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.src = blobUrl;
                document.body.appendChild(iframe);
                iframe.contentWindow.print();
          },
          err => alert("ERROR - Cannot get QR-CODE PDF from: \n"+qr_pdf))
        }
}
