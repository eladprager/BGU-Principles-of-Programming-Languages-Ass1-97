/* Question 3 */

import * as R from 'ramda'

interface Ok<T> {
    tag: "Ok";
    value: T;
}

interface Failure {
    tag: "Failure";
    message: String;
}

export type Result<T> = Ok<T> | Failure;

export const makeOk : <T>(val : T) => Result<T> = 
    (val) => {
        return {
            tag : "Ok",
            value : val
        }
    }

export const makeFailure : <T>(msg : String) => Result<T> =
    (msg) => {
        return {
            tag : "Failure",
            message : msg
        }
    }

export const isOk = <T>(rslt : Result<T>): rslt is Ok<T> => rslt.tag === "Ok";
export const isFailure = <T>(rslt : Result<T>): rslt is Failure => rslt.tag === "Failure";
   

export const bind : <T, U>(rslt : Result<T>, func : (x : T) => Result<U>) => Result<U> =
    (rslt,func) => {
        return isOk(rslt) ? func(rslt.value) : makeFailure(rslt.message);
    }


/* Question 5 */
interface User {
    name: string;
    email: string;
    handle: string;
}

const validateName = (user: User): Result<User> =>
    user.name.length === 0 ? makeFailure("Name cannot be empty") :
    user.name === "Bananas" ? makeFailure("Bananas is not a name") :
    makeOk(user);

const validateEmail = (user: User): Result<User> =>
    user.email.length === 0 ? makeFailure("Email cannot be empty") :
    user.email.endsWith("bananas.com") ? makeFailure("Domain bananas.com is not allowed") :
    makeOk(user);

const validateHandle = (user: User): Result<User> =>
    user.handle.length === 0 ? makeFailure("Handle cannot be empty") :
    user.handle.startsWith("@") ? makeFailure("This isn't Twitter") :
    makeOk(user);

    export const naiveValidateUser = (user:User) : Result<User> =>
    isFailure(validateName(user)) ? validateName(user) :
    isFailure(validateEmail(user)) ? validateEmail(user) :
    isFailure(validateHandle(user)) ? validateHandle(user) :
    makeOk(user);

export const monadicValidateUser = (user:User) : Result<User> =>
    bind(bind(validateName(user),validateEmail),validateHandle)