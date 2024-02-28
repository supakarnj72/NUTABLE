export class CreateUserParam {
    username: string='';
    password: string='';
}

export class ChangePasswordParam {
    username?: string;
    password?: string;
    newPassword?: string;
    confirmPassword?: string;
}

export class UpdateUserParam {
    userId?: number;
    username: string='';
}

export class User {
    constructor(
        public username: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ) {}

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate ) {
            return null;
        }
        return this._token;
    }
}