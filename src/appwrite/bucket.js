import conf from "../conf/conf";
import { Client, Storage, ID } from "appwrite";

export class StorageService {
  client = new Client();
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    // this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite :: createFile :: error", error);
    }
  }

  // async getFile(fileId) {
  //   try {
  //     return await this.bucket.getFile(conf.appwriteBucketId, fileId);
  //   } catch (error) {
  //     console.log("Appwrite :: getFile :: error", error);
  //   }
  // }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite :: getFilePreview :: error", error);
    }
  }
}

const storageService = new StorageService();

export default storageService;
