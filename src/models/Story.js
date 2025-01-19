export class Story {
    constructor(Id, ImageUrl, ImageUploadedTime , IsImageViewed,IsDeleted) {
        this.Id = Id;
        this.ImageUrl = ImageUrl;
        this.ImageUploadedTime = ImageUploadedTime;
        this.IsImageViewed = IsImageViewed;
        this.IsDeleted = IsDeleted;
    }
}
