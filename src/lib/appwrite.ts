import config from "@/conf/congif";
import { Client, Account, ID, } from "appwrite";

type CreateUserAccount = {
    name: string;
    email: string;
    password: string;
};
type LoginUserAccount = {
    email: string;
    password: string;
};
const client = new Client().
setEndpoint(config.appWriteUrl)
.setProject(config.appWriteProjectId);
const account = new Account(client);

export class AppWriteService{
    // create a new record of user inside appwrite
async createUserAccount({name, email, password}: CreateUserAccount) {
        try {
            const userAccount = await account.create(ID.unique(), email, password, name);
            if(userAccount) {
                return this.LoginUserAccount({email, password});
            }
        } catch (error) {
            console.error("Error creating user account:", error);
            throw error;
        }
    }

    async LoginUserAccount({email, password}: LoginUserAccount) {
        try {
            const session = await account.createEmailPasswordSession(email, password);
            if(session) {
                return session;
            }
        } catch (error) {
            console.error("Error logging in user account:", error);
            throw error;
        }
    }
    async isLoggedIn():Promise<boolean> {
        try {
            const data = await this.getCurrentUser();
            return Boolean(data);
        } catch (error) {
            console.error("Error checking login status:", error);
            throw error;
            
        }

    }
    async getCurrentUser() {
        try {
            return account.get()
        } catch (error) {
            console.error("Error getting current user:", error);
            throw error;
            
        }
    }
    async LogoutUser() {
        try {
            return account.deleteSession("current");
            
        } catch (error) {
            console.log('Logout error : ',error)
            
        }
    }
}

const appWriteService = new AppWriteService();
export default appWriteService;