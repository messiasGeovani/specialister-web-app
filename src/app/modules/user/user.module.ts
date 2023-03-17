import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule],
  providers: [UserService],
})
export class UserModule {}
