import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../shared/service/user.service";
import {User} from "../../model/auth/user.model";
import {TokenStorageService} from "../../shared/service/token-storage.service";
import {EditDisplayNameRequest} from "../../model/auth/edit-display-name-request.model";

@Component({
  selector: 'app-edit-display-name',
  templateUrl: './edit-display-name.component.html',
  styleUrls: ['./edit-display-name.component.css']
})
export class EditDisplayNameComponent implements OnInit {
  user: User;

  constructor(private readonly dialogRef: MatDialogRef<EditDisplayNameComponent>,
              private readonly service: UserService,
              private readonly tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }

  onClickCancel(): void {
    this.dialogRef.close();
  }

  onClickEdit(): void {
    const body: EditDisplayNameRequest = {
      displayName: this.user.displayName
    };

    this.service.editDisplayName(body)
      .subscribe(result => {
        if (result.ok) {
          this.tokenStorage.saveUser(result.rtnObj as User);
          this.dialogRef.close();
        }
      });
  }

}
