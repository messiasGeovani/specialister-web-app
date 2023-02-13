import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchFiltersComponent } from './components/search-filters/search-filters.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchComponent } from './search.component';



@NgModule({
  declarations: [
    SearchBarComponent,
    SearchFiltersComponent,
    SearchResultsComponent,
    SearchComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SearchModule { }
