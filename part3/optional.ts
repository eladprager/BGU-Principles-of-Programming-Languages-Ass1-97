/* Question 1 */

import { T } from "ramda";
import { Interface } from "readline";

interface Some<T> {
    tag: "Some";
    value: T;
}

interface None {
    tag: "None";
}

export type Optional<T> = Some<T> | None;


export const makeSome : <T>(val : T) => Optional<T> = 
    (val) => {
        return {
            tag : "Some",
            value : val
        };
    }
export const makeNone : <T>() => Optional<T> = 
    () => {
        return {
            tag : "None",
        }
    }
   

export const isSome = <T>(opt : Optional<T>):opt is Some<T> => opt.tag === "Some";
export const isNone = <T>(opt : Optional<T>):opt is None => opt.tag === "None";    

/* Question 2 */
 export const bind : <T, U>(opt : Optional<T>, func : (x : T) => Optional<U>) => Optional<U> = 
     (opt,func) => {
         return isSome(opt) ? func(opt.value) : makeNone();
     }