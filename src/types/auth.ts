// third-party
// import firebase from 'firebase/compat/app';

// project imports
import { UserProfile } from 'types/user-profile';

export type AWSCognitoContextType = {
    isLoggedIn: boolean;
    isInitialized?: boolean;
    user?: UserProfile | null | undefined;
    logout: () => void;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, firstName: string, lastName: string) => Promise<unknown>;
    resetPassword: (email: string) => Promise<void>;
};

export interface InitialLoginContextProps {
    isLoggedIn: boolean;
    isInitialized?: boolean;
    user?: UserProfile | null | undefined;
}
