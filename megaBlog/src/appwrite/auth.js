import conf from '../conf.js';
import { Client, Account, ID } from 'appwrite';

export class AuthService{
      client = new Client()
      account;

      constructor() {
        this.client
          .setEndpoint(conf.appwriteUrl) // Your API Endpoint
          .setProject(conf.appwriteProjectId);
          this.account = new Account(this.client) // Your project ID
      }
      async createAccount({email, password, name}) {
        try {
          const response = await this.account.create(ID.unique(), email, password, name);
          if (response) {
            return this.login({email, password});
          } else {
            console.log('Account creation failed:', response);
            throw new Error('Account creation failed');  
          }
        } catch (error) {
          console.error('Error creating account:', error);
          throw error;
        }
      }
        async login({email, password}) {
            try {
            const response = await this.account.createSession(email, password);
            if (response) {
                return response
            } else {
                console.log('Login failed:', response);
                throw new Error('Login failed');  
            }
            } catch (error) {
            console.error('Error logging in:', error);
            throw error;
            }
        }

        async getCurrentUser(){
            try {
                const user = await this.account.get();
                return user;
            } catch (error) {
                console.error('Error getting current user:', error);
                throw error;
            }
            return null;
        }

        async logout(){
            try {
                const response = await this.account.deleteSessions();
                return response;
            } catch (error) {
                console.error('Error logging out:', error);
                throw error;
            }
        }
        async deleteAccount(){
            try {
                const response = await this.account.delete();
                return response;
            } catch (error) {
                console.error('Error deleting account:', error);
                throw error;
            }
        }

}

const authService = new AuthService()
export default authService