import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule, InputTextarea} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/primeng';
import {FieldsetModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';


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
    BrowserAnimationsModule,
    ButtonModule,
    InputTextareaModule,
    FieldsetModule,
    DropdownModule,
    InputTextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
