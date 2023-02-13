import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectCategoriesComponent } from './components/select-categories/select-categories.component';
import { CategoriesComponent } from './categories.component';



@NgModule({
  declarations: [
    SelectCategoriesComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CategoriesModule { }
