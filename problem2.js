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
let nums = [2,7,11,15, -1, -20];
let target = 9;

// let nums = [3,2,4]
// let target =6;

// let nums = [3,3];
// let target = 6

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

for(let i=0; i!= permutations; i++){
  let main = (i % len);
  let pair = (1 + i + Math.floor(i/len))%len;
  // console.log(main, pair, (nums[main] + nums[pair]), [nums[main], nums[pair]]);
   if(nums[main] + nums[pair] == target) return console.log(main, pair)
}
