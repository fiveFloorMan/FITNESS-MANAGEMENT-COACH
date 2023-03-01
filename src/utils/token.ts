import jwt from 'jsonwebtoken';

// 簽發token
export const signToken = (payload: object, secret: string, expiresIn: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, { expiresIn }, (error, token) => {
            if (error) {
                reject(error);
            } else {
                resolve(token as string);
                console.log(token)
            }
        })
    })
}

// 驗證token
export const verifyToken = (token: string, secret: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (error, decoded) => {
            if (error) {
                reject(error);
            } else {
                return resolve(decoded);
            }
        });
    });
};