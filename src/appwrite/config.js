import {
  Client,
  ID,
  Databases,
  Query,
  Storage,
  Permission,
  Role
} from "appwrite";

import conf from "../conf/confi"; // Import config containing Appwrite keys

// Service class for Appwrite operations (DB + Storage)
export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // ✅ Create a new blog post
  async createPost({ title, slug, content, featuredimage, status, userid }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug, // Used as the Document ID
        {
          title,
          content,
          featuredimage,
          status,
          userid
        }
      );
    } catch (error) {
      console.log("Appwrite Service: createPost error:", error);
    }
  }

  // ✅ Update a post
  async updatePost(slug, { title, content, featuredimage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredimage,
          status
        }
      );
    } catch (error) {
      console.log("Appwrite Service: updatePost error:", error);
    }
  }

  // ✅ Delete a post by slug
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite Service: deletePost error:", error);
      return false;
    }
  }

  // ✅ Get a post by slug
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite Service: getPost error:", error);
      return false;
    }
  }

  // ✅ Get multiple posts (by default: active)
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite Service: getPosts error:", error);
      return false;
    }
  }

  // ✅ Upload image to Appwrite bucket
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
        [Permission.read(Role.any())] // ✅ Make file public
      );
    } catch (error) {
      console.log("Appwrite Service: uploadFile error:", error);
      return false;
    }
  }

  // ✅ Delete file from Appwrite bucket
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite Service: deleteFile error:", error);
      return false;
    }
  }

  // ✅ Get public preview URL for file
  getFilePreview(fileId) {
    try {
      const previewURL = this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
      );
      console.log("✅ Debug: getFilePreview returning:", previewURL);
      return previewURL; // ✅ Return string URL directly
    } catch (error) {
      console.log("Appwrite Service: getFilePreview error:", error);
      return null;
    }
  }
}

// ✅ Export a single instance to use everywhere
const service = new Service();
export default service;
