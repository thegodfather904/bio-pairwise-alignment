import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatTabsModule,
MatSelectModule, MatOptionModule, MatSnackBarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AlignmentComponent } from './alignment/alignment.component';
import { UserInputComponent } from './alignment/user-input/user-input.component';
import { VisualizerComponent } from './alignment/visualizer/visualizer.component';
import { SequenceBarComponent } from './alignment/sequence-bar/sequence-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AlignmentComponent,
    UserInputComponent,
    VisualizerComponent,
    SequenceBarComponent
  ],
  entryComponents: [SequenceBarComponent],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatSelectModule,
    MatOptionModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
