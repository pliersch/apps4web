export interface Photo {
  id: string;
  fileName: string;
  tags: string[];
  createDateTime: Date;
  baseUrl: string;
  isSelected: boolean;

  getPhotoUrl(): string;

  getPreviewUrl(): string;

  getThumbUrl(): string;
}

export class PhotoImpl implements Photo {

  private readonly API_URL: string = 'http://localhost:3000/images/gallery/';

  baseUrl: string;
  createDateTime: Date;
  fileName: string;
  id: string;
  isSelected: boolean;
  tags: string[];

  constructor(obj: Photo) {
    this.baseUrl = obj.baseUrl;
    this.createDateTime = obj.createDateTime;
    this.fileName = obj.fileName;
    this.id = obj.id;
    this.isSelected = obj.isSelected;
    this.tags = obj.tags;
  }

  getPhotoUrl(): string {
    return this.API_URL + 'full/' + this.fileName + '.jpg';
  }

  getPreviewUrl(): string {
    return this.API_URL + 'thumbs/' + this.fileName + '-600.webp';
  }

  getThumbUrl(): string {
    return this.API_URL + 'thumbs/' + this.fileName + '-300.webp';
  }

}

// export function comparePhotos(p1: Photo, p2: Photo): number {
//   const creationTime1 = new Date(p1.createDateTime).getTime();
//   const creationTime2 = new Date(p2.createDateTime).getTime();
//   const compare = creationTime1 - creationTime2;
//   if (compare > 0) {
//     return 1;
//   } else if (compare < 0) {
//     return -1;
//   } else {
//     return 0;
//   }
// }
