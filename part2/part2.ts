import * as R from 'ramda'

/* Question 1 */
export const partition : <T>(predicate : ((x : T) => boolean), arr : T[]) => T[][] = 
    (predicate,arr) => {
        let arr1 = R.filter(predicate,arr);
        let arr2 = R.filter(y => predicate(y) === false,arr);
        return [arr1,arr2];
    }


/* Question 2 */
export const mapMat : <T>(func : ((x : T) => T), arr : T[][]) => T[][] = 
    (func,arr) => {
        return arr.map(x => x.map(func));
    }

/* Question 3 */
export const composeMany : <T>(arr : ((x : T) => T)[]) => ((y : T) => T) = 
    (arr) => {
        return arr.reduce((acc,curr) => R.compose(acc,curr), x => x);
    }

/* Question 4 */
interface Languages {
    english: string;
    japanese: string;
    chinese: string;
    french: string;
}

interface Stats {
    HP: number;
    Attack: number;
    Defense: number;
    "Sp. Attack": number;
    "Sp. Defense": number;
    Speed: number;
}

interface Pokemon {
    id: number;
    name: Languages;
    type: string[];
    base: Stats;
}

export const maxSpeed : (PokemonArr : Pokemon[]) => Pokemon[] = 
    (PokemonArr : Pokemon[]) => {
        let MaxSpeed : number = PokemonArr.reduce((acc,curr) => Math.max(acc,curr.base.Speed),0);
        return PokemonArr.filter(x => x.base.Speed === MaxSpeed);
    }

export const grassTypes : (PokemonArr : Pokemon[]) => String[] =
    (PokemonArr : Pokemon[]) => {
        let GrassPokemos : Pokemon[] = PokemonArr.filter(x => (x.type.indexOf("Grass") > -1));
        let notSorted : String[] = GrassPokemos.map(x => x.name.english);
        let output : String[] = notSorted.sort((a, b) => a < b ? -1 : 1);
      return output;
    }

export const uniqueTypes : (PokemonArr : Pokemon[]) => String[] = 
    (PokemonArr : Pokemon[]) => {
      let allTypes : String[] = PokemonArr.map(x => x.type).reduce((acc,curr) => acc.concat(curr),[]);
      let notSortedTypes : String[] = allTypes.filter((v, i, a) => a.indexOf(v) === i);
      let output : String[] = notSortedTypes.sort((a, b) => a < b ? -1 : 1);
    return output;
    }

