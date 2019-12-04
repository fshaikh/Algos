/**
 * 
You are on a flight and wanna watch two movies during this flight.
You are given List<Integer> movieDurations which includes all the movie durations.
You are also given the duration of the flight which is d in minutes.
Now, you need to pick two movies and the total duration of the two movies is less than or equal to (d - 30min).

Find the pair of movies with the longest total duration and return they indexes.
If multiple found, return the pair with the longest movie.

Example 1:

Input: movieDurations = [90, 85, 75, 60, 120, 150, 125], d = 250
Output: [0, 6]
Explanation: movieDurations[0] + movieDurations[6] = 90 + 125 = 215 is the maximum number within 220 (250min - 30min)
 */

 function getMovies(movieDurations){
     if(movieDurations == null || movieDurations.length == 0){
         return [];
     }
     if(movieDurations.length === 1){
         return [0];
     }

    // map -> key = index, value = value
    // sort the array
    // iterate array from both ends. Stop when start <= end
    //    if sum <= d - 30
    //      if sum > current max, store current max and [start,end] indices
    //      increment start by 1
    //    else
    //      decrement end by 1
    // if there are no found, return first index if its lesser than the duration - 30
    // else find the indexes of the pair in original array. How to handle duplicate 
 }