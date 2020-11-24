import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {
  FOLDER: any;

  constructor() { }
  uploadFile(file: any) {
    const contentType = file.type;
    const bucket = new S3(
          {
              accessKeyId: 'AKIAZ5I5KEMREY4XFVLU',
              secretAccessKey: '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',
              region: 'EU (London) eu-west-2',
          }
      );
    const params = {
          Bucket: 'aptoid',
          Key: file.name,
          Body: file,
          ACL: 'public-read',
          ContentType: contentType
      };
    bucket.upload(params, (err: any, data: any) => {
          if (err) {
              console.log('There was an error uploading your file: ', err);
              return false;
          }
          console.log('Successfully uploaded file.', data);
          return true;
      });
  }
}
