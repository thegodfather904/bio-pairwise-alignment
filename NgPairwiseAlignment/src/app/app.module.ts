import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AlignmentComponent } from './alignment/alignment.component';
import { UserInputComponent } from './alignment/user-input/user-input.component';
import { VisualizerComponent } from './alignment/visualizer/visualizer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AlignmentComponent,
    UserInputComponent,
    VisualizerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
