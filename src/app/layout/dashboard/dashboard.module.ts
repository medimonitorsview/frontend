import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {
    TimelineComponent,
    NotificationComponent,
    ChatComponent
} from './components';
import { StatModule } from '../../shared';
import { MonitorItemComponent } from './components/monitor-item/monitor-item.component';
import { MonitorsGridComponent } from './components/monitors-grid/monitors-grid.component';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import { MonitorDialogComponent } from './components/monitor-dialog/monitor-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import { VideoDialogComponent } from './components/video-dialog/video-dialog.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms'


@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule,
        NgbAlertModule,
        DashboardRoutingModule,
        StatModule,
        MatGridListModule,
        MatDialogModule,
        HttpClientModule,
        FlexLayoutModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatProgressSpinnerModule,
        DragDropModule,
        MatCheckboxModule,
        FormsModule
    ],
    declarations: [
        DashboardComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent,
        MonitorItemComponent,
        MonitorsGridComponent,
        MonitorDialogComponent,
        VideoDialogComponent,
        
       
        
    ]
})
export class DashboardModule {}
