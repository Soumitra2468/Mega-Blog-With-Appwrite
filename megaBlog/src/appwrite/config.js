import conf from '../conf.js';
import { Client, ID, Databases, Storage, Query } from 'appwrite';

export class Service{
   client = new Client()
   Database;
   Bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId); // Your project ID
        this.Database = new Databases(this.client)
        this.Bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            const response = await this.Database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
            return response;
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    }

    async updatePost({postId, title, slug, content, featuredImage, status}) {
        try {
            const response = await this.Database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postId,
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status
                }
            );
            return response;
        } catch (error) {
            console.error('Error updating post:', error);
            throw error;
        }
    }
    async deletePost(postId) {
        try {
            const response = await this.Database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postId
            );
            return response;
        } catch (error) {
            console.error('Error deleting post:', error);
            throw error;
        }
    }

    async getPost(postId) {
        try {
            const response = await this.Database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postId
            );
            return response;
        } catch (error) {
            console.error('Error fetching post:', error);
            throw error;
        }
    }
    async getPosts() {
        try {
            const response = await this.Database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal('status', 'published')]
            );
            return response.documents;
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    }

    //file uploding and deleting functions

    async uploadFile(file) {
        try {
            const response = await this.Bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            return response;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }
    async deleteFile(fileId) {
        try {
            const response = await this.Bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return response;
        } catch (error) {
            console.error('Error deleting file:', error);
            throw error;
        }
    }

    getFilePreview(fileId) {
        try {
            const response = this.Bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            );
            return response;
        } catch (error) {
            console.error('Error getting file preview:', error);
            throw error;
        }
    }
}

const service = new Service()
export default service