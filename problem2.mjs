import { setTimeout as sleep} from 'timers/promises';
import * as fs from 'node:fs/promises';

/*
Problem 2

Given a list of integers nums and an integer target, 
write a function that solves the following problem; 
return indices of the two numbers such that they add up to target.
You may assume that each input would have exactly one solution, 
and you may not use the same element twice.
You can return the answer in any order.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]

Constraints:
2 <= nums.length <= 10^4
-10^9 <= nums[i] <= 10^9
-10^9 <= target <= 10^9
Only one valid answer exists.

*/


/* test cases */

// let nums = [3,2,4]
// let target =6;

// let nums = [3,3];
// let target = 6


let nums = [2,7,11,15];
let target = 9;

/* we get the number of permutations or combinations we can make of 2 items
 we dont want to repeat the index, so we can remove the set where 
 index(main) == index(pair)
 which is the length of the list, so we remove 1 iteration
*/
let len = nums.length;
let permutations = (nums.length) * (nums.length-1) // O(n*(n-1))

/*
knowing how many iterations we can calculate what indeces to test

for the main number,
by using Modulo operator % with the list length we can make a consequitive index
fall between 0..nums.length

for the pair number,
- we know its going to be "ahead" one number from the consequitive, to avoid the main==pair
- next we use the consequtive (i) and add the "ratio in which the consequtive fits in the nums.length"
by every iteration we add a floating-point number between 0..(nums.length  - (1/nums.length))
for a list with 0-based length 3, it goes like 0, 0.25, 0.5, 0.75, 1.0, 1.25, 1.50 .... 2.75
- next we take only the integer part, 0,0,0,0, 1,1,1,1, 2,2,2,2 using Math.floor()
- and finally add all these factors and use Modulo on it to fit to the list length
*/

// if(false){
// for(let i=0; i!= permutations; i++){
//   let main = (i % len);
//   let pair = (1 + i + Math.floor(i/len))%len;
//   // console.log(main, pair, (nums[main] + nums[pair]), [nums[main], nums[pair]]);
//    if(nums[main] + nums[pair] == target) console.log(main, pair)
// }
// }

if(process.stdin.isTTY) process.stdin.setRawMode(true)

function printmap(index){
  let search = target - nums[index];
  console.clear()

  let pair = bag.get(nums[index]);
  console.log(`
    target:  ${String(target).padStart(2,' ')}
  - nums[${index}]: ${String(nums[index]).padStart(2,' ')}
  = \x1B[36m${search}\x1B[39m
    nums:   ${nums.map(
      (x, i)=>`\x1B[34m${i}\x1B[39m`+(index==i 
        ? `\x1B[33m[${String(x).padStart(2,' ')}]\x1B[39m`
        : `${pair == i ? '\x1B[33m' : ''}[${String(x).padStart(2,' ')}]\x1B[39m`
      )
      ).join(' ')
    }`
  )
  console.log(`
  Map:
  [
    ${
      Array.from(bag).map(
        (x,i)=>
        `[${
            pair == x[1]
            ? `\x1B[33m${String(x[0]).padStart(2, ' ')}\x1B[39m`
            : search == x[0]
              ? `\x1B[36m${String(x[0]).padStart(2, ' ')}\x1B[39m`
              : String(x[0]).padStart(2, ' ')
          }: \x1B[34m${String(x[1]).padStart(2, ' ')}\x1B[39m]`
      ).join(' ')
    }
  ]

  nums[\x1B[34m${index}\x1B[39m] is ${nums[index]}
  Does map has the key '\x1B[33m${nums[index]}\x1B[39m' ?
  > ${
    bag.get(nums[index]) 
    ? `Yes, the pair is [nums[\x1B[34m${index}\x1B[39m], nums[\x1B[34m${bag.get(nums[index])}\x1B[39m]]` 
    : `No, setting key \x1B[36m${search}\x1B[39m with value \x1B[34m${index}\x1B[39m`
  }
  Pairing: ${nums[index]} + ${nums[pair]} = ${nums[index] + nums[pair]} 
  `)
}

let bag = new Map();
(async ()=>{
  printmap();
  for(let i=nums.length-1; i>=0; i--){
    const n = nums[i];
    const answer = bag.get(n);
    // console.log(n, answer)
    if(answer != undefined) {
      printmap(i)
      return console.log( [i, answer]);
    }
    bag.set(target - n, i);
    printmap(i)
    await sleep(3000);
  }
})()


// process.stdout.columns,
// process.stdout.rows;

// let v = new Array(8000).fill(0).map(x=>{
// 	return Math.random() * (100 - (-100)) + (-100);
// })
// let arr = new Array(v.length)

// // console.log(v.slice(0,10))
// let times = 350000;
// console.time('Math.floor ' + times)
// for(let n = 0; n != times; n++){
//   for(let i=arr.length-1; i>=0; i--){
//     arr[i] = Math.floor(v[i])
//   }
// }
// console.timeEnd('Math.floor ' + times)

// console.time('neg neg ' + times)
// for(let n = 0; n != times; n++){
//   for(let i=arr.length-1; i>=0; i--){
//     arr[i] = ~~(v[i])
//   }
// }
// console.timeEnd('neg neg ' + times)
