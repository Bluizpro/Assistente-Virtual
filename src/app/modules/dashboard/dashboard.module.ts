import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule
  ],
})
export class DashboardModule { }
