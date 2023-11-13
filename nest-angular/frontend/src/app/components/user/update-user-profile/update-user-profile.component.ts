import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { File, User } from '../../../models';
import { UserService } from 'src/app/services/user.service';
import { WINDOW } from 'src/app/window-token';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.css'],
})
export class UpdateUserProfileComponent implements OnInit {
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
  file: File = {
    data: null,
    inProgress: false,
    progress: 0,
  };
  form: FormGroup;
  origin = this.window.location.origin;
  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private userSevice: UserService,
    @Inject(WINDOW) private window: Window
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [{ value: null, disabled: true }, [Validators.required]],
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      profileImage: [null],
    });

    this.authService
      .getUserId()
      .pipe(
        switchMap((id: number) =>
          this.userSevice.findOneUser(id).pipe(
            tap((user: User) => {
              this.form.patchValue({
                id: user.id,
                name: user.name,
                username: user.username,
                profileImage: user.profileImage,
              });
            })
          )
        )
      )
      .subscribe();
  }

  update() {
    this.userSevice.updateOne(this.form.getRawValue()).subscribe();
  }

  onClick() {
    const fileInput = this.fileUpload.nativeElement;
    fileInput.click();
    fileInput.onchange = () => {
      this.file = {
        data: fileInput.files[0],
        inProgress: false,
        progress: 0,
      };
      this.fileUpload.nativeElement.value = '';
      this.uploadFile();
    };
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.file.data);
    this.file.inProgress = true;

    this.userSevice
      .upaloadProfileImage(formData)
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.file.progress = Math.round(
                (event.loaded * 100) / event.total
              );
              break;
            case HttpEventType.Response:
              return event;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          this.file.inProgress = false;
          return of('Upload failed');
        })
      )
      .subscribe((event: any) => {
        if (typeof event === 'object') {
          this.form.patchValue({ profileImage: event.body.profileImage });
        }
      });
  }
}
