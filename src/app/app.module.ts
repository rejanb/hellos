import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatSelectModule,
  MatButtonModule,
  MatSliderModule,
  MatSidenavModule,
  MatCardModule,
  MatInputModule,
} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditorModule } from '@progress/kendo-angular-editor';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatSliderModule,
    MatSidenavModule,
    MatCardModule,
    EditorModule,
    DragDropModule,
    PDFExportModule,
    MatInputModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
