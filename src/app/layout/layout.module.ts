import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './compoonents/layout/layout/header/header.component';
import { LayoutComponent } from './compoonents/layout/layout/layout/layout.component';
import { FooterComponent } from './compoonents/layout/layout/footer/footer.component';




@NgModule({
  declarations: [
    HeaderComponent,
    LayoutComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,

  ]
})
export class LayoutModule { }
