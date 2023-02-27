import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './layout/nav/nav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { GoogleIconComponent } from './components/icons';
import { LinkedinIconComponent } from './components/icons';
import { FacebookIconComponent } from './components/icons';

@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    GoogleIconComponent,
    LinkedinIconComponent,
    FacebookIconComponent,
  ],
  imports: [CommonModule],
  exports: [
    NavComponent,
    FooterComponent,
    GoogleIconComponent,
    LinkedinIconComponent,
    FacebookIconComponent
  ],
})
export class SharedModule {}
