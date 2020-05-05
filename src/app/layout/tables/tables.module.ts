import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';
import { PageHeaderModule } from './../../shared';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MessageComponent } from '../message/message.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
    imports: [CommonModule,
         TablesRoutingModule,
          PageHeaderModule,
           MatButtonModule,
            MatIconModule,
            MatInputModule,
             MatSnackBarModule,
            MatDialogModule,
            MatIconModule,
        MatProgressSpinnerModule],
    declarations: [TablesComponent, MessageComponent]
})
export class TablesModule {}
