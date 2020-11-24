import { Component, OnInit } from '@angular/core';
import { UploadFilesService } from '../services/upload-files.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  selectedFiles: any;
  progressInfos: any = [];
  message = '';

  fileInfos!: Observable<any>;

  constructor(private uploadService: UploadFilesService) { }

  ngOnInit(): void {
    // this.fileInfos = this.uploadService.getFiles();
  }

  selectFiles(event: any): void {
    let checkPDF = true;
    for (const file of event.target.files) {
      if (file.type !== 'application/pdf'){
        checkPDF = false;
        document.getElementById('multipleInput').value = "";
      }
    }
    this.progressInfos = [];
    if (checkPDF){
      this.selectedFiles = event.target.files;
    }
  }

  uploadFiles(): void {
    this.message = '';
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }

  upload(idx: any, file: any): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    this.uploadService.uploadFile(file);
  }

}
