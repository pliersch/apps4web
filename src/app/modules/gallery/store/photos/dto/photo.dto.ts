import { PhotoMetaDataDto } from "@gallery/store/photos/dto/photo-meta-data.dto";
import { Photo } from "../photo.model";

export interface PhotoDto {
  readonly photos: Photo[];
  readonly meta: PhotoMetaDataDto;
}
