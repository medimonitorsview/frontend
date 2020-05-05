import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsElementRoutingModule } from './bs-element-routing.module';
import { BsElementComponent } from './bs-element.component';
import { PageHeaderModule } from './../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button'
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [CommonModule,
            BsElementRoutingModule,
            PageHeaderModule,
            NgbModule,
            MatCardModule,
            MatMenuModule,
            MatIconModule,
            MatProgressSpinnerModule,
            MatProgressBarModule,
            MatButtonModule,
            MatInputModule,
            FormsModule],
    declarations: [BsElementComponent]
})
export class BsElementModule {}
