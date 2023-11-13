import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../services/blog.service';
import { ImageDto } from 'src/app/shared/models/imageModel';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.scss'],
})
export class NewBlogComponent implements OnInit {
  imageFile: any = null;

  imageUrl = '/assets/images/no-image.jpg';
  progress = 0;
  blogForm: FormGroup;
  fieldRequired: string = 'This field is required';
  formData: FormData;

  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.blogForm = this.fb.group({
      Title: [null, Validators.required],
      Description: [null, Validators.required],
      Body: [null, Validators.required],
    });
  }
  onClick() {
    const fileInput = this.fileUpload.nativeElement;
    fileInput.click();
  }

  readFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.formData = new FormData();
      const file = event.target.files[0];
      this.formData.append('ImageFile', event.target.files[0]);
      this.formData.append('ImageFileExtension', file.name.split('.')[1]);
      this.fileUpload.nativeElement.value = '';
      const reader = new FileReader();
      reader.onload = (e) =>
        (this.imageUrl =
          reader.result?.toString() ?? '/assets/images/no-image.jpg');

      reader.readAsDataURL(file);
      this.imageFile = event.target.files[0];
    }
  }
  checkValidation(input: string) {
    const validation =
      this.blogForm.get(input)?.invalid &&
      (this.blogForm.get(input)?.dirty || this.blogForm.get(input)?.touched);
    return validation;
  }
  PostBlog() {
    if (this.blogForm.invalid) return;
    this.blogService.addBlog(this.blogForm.value).subscribe((result) => {
      if (result.Success) {
        this.updateHeaderImage(result.Body.Id);
      }
    });
  }

  updateHeaderImage(id: number) {
    this.formData.append('BlogId', id + '');
    this.blogService
      .updateBlogHeaderImage(this.formData)
      .subscribe((result) => {
        if (result.Success) this.router.navigate(['/blogs']);
      });
  }
}
