import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../model/auth/user.model';
import {MatDialog} from "@angular/material/dialog";
import {EditDisplayNameComponent} from "../edit-display-name/edit-display-name.component";
import {TokenStorageService} from "../../shared/service/token-storage.service";

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.css']
})
export class ProfileMenuComponent implements OnInit {
  @Input() user: User;
  @Output() editUser = new EventEmitter<User>();

  constructor(private readonly dialog: MatDialog,
              private readonly tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }

  onClickEdit(): void {
    const dialogRef = this.dialog.open(EditDisplayNameComponent, {
      width: '250px',
      panelClass: 'voting-dialog-container'
    });

    dialogRef.afterClosed()
      .subscribe(() => {
        this.user = this.tokenStorage.getUser();
        this.editUser.emit(this.user);
      });

    dialogRef.componentInstance.user = this.user;

  }
}
