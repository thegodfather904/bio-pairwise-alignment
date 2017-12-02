import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/primeng';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AlignmentComponent } from './alignment/alignment.component';
import { UserInputComponent } from './alignment/user-input/user-input.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AlignmentComponent,
    UserInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
