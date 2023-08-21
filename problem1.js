/*
Problem 1

Given a list nums of n integers where nums[i] is in the range [1, list length], 
write a function
that solves the following problem; 
return a list of all the integers in the range [1, list length]
that do not appear in nums.

Example 1:
Input: nums = [4,3,2,7,8,2,3,1]
Output: [5,6]
Example 2:
Input: nums = [1,1]
Output: [2]

Constraints:
● n == nums.length
● 1 <= n <= 10^5
● 1 <= nums[i] <= n
*/

/*
this solution iterates 3 times on the source list: 
- once to fill the consequitive numbers
- once to find the present numbers setting the corresponding index to null
- once to eliminate the empty, leaving only the absent numbers
*/

/* test cases */

let nums = [4,3,2,7,8,2,3,1];
// let nums = [1, 1];
// let nums = [4];
// let nums = [];
// let nums = [
//   44, 52, 83, 12, 18, 88, 24, 99, 89, 38, 65, 93, 77, 28, 37, 96, 54, 36, 26, 
//   42, 15, 86, 34, 23, 76, 78, 73, 50, 92, 14,  1, 17, 91, 53, 71, 58, 56, 61, 
//   22, 25, 74,  5, 33,  9, 31, 16, 66, 75, 13, 57, 11,  4,  8, 90, 19,  3, 70, 
//   97, 64, 98, 79, 95, 20, 94,  7, 87, 63, 82, 35, 67, 80, 39, 43, 51, 27, 47, 
//   49, 85, 21, 46, 62, 55, 45, 59,  6, 29, 60,  2, 68, 69, 40, 84, 81, 32, 72,
//   // 100, 41, 10, 48, 30
//   49, 85, 21, 46, 62,49, 85, 21, 46, 62,49, 85, 21, 46, 62,
// ];

let len = nums.length;
let temp = new Array(len).fill(0).map((x,index)=>index+1); // O(n)

//O(n)
for(let index = len-1; index>=0; index--){
  let number = (nums[nums[index]]||index)-1;
  delete temp[number];
}

//O(n)
let result = temp.filter(n=>n)


console.log(result);