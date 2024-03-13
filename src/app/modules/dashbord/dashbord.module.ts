import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashbordHomeComponent } from './page/dashbord-home/dashbord-home.component';
import { RouterModule } from '@angular/router';
import { DASHBORD_ROUTES } from './dashbord.routing';



import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { SidebarModule } from 'primeng/sidebar';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';




@NgModule({
  declarations: [
    DashbordHomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(DASHBORD_ROUTES),
    //PrimeNg
    SidebarModule,
    ButtonModule,
    ToolbarModule,
    CardModule,
    ToastModule,
  ],
  providers:[CookieService,MessageService]
})
export class DashbordModule { }
