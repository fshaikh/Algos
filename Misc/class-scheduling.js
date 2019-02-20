/**
 * Andy studies at the University of California is very studious. He wants to take as many subjects as possible without any class overlap. The University doesn’t impose any restriction of the number of classes taken during the semester.
He really doesn’t care about what subject he takes; he likes them all! However, he wants to maximize the number of subjects he can take.
Input Format
The first line of input consists of an integer t. This is the number of days. 
For each day, the first line contains an integer n which gives the number of subjects offered on that day. 
Then next n lines follow containing the subject name (which is a string) followed by start and end time for that subject in 24 hour format: hh:mm
Maths 10:00 11:00
Note: The timings are given in 24-hour format and the subject names do not have spaces between them.
Output Format
The output should contain t lines and each line has a number representing the maximum number of classes Andy can chose.
Constraints
	• 1 <= t <= 5000
	• 2 <= n <= 100
	• start time of a class < end time of class
Sample Input
2
4
Maths 16:00 18:00
ComputerScience 12:00 13:00
Physics 12:30 14:00
Chemistry 14:00 16:30
5
Geography 14:00 16:00
History 12:00 14:30
Arts 14:00 16:30
Literature 12:30 13:30
German 13:30 15:00
Sample Output
2
2
Explanation
For the 1st day, ComputerScience starts the earliest and ends the earliest, so we take it first. After the we cannot take Physics because it starts before 
ComputerScience is over. So we will take the next class, that is, Chemistry. But after Chemistry we cannot take Maths as Maths class starts before Chemistry class ends. 
So we can schedule a maximum of 2 classes for the first day.
Similarly we schedule for the second day.

 */
const moment = require('moment');
 class Class {
     constructor(subject, start, end){
         this.Subject = subject;
         this.Start = moment(start,'HH:mm')
         this.End = moment(end,'HH:mm')
     }
 }

 const sortByEndTime = (subject1, subject2) => subject1.End > subject2.End;

 const getMaxClassesCount = (classes) => {
     let maxSubjects = [];
    // Sort the classes by the end time
    classes = classes.sort(sortByEndTime);
    let i = 0;
    // always select the first subject which ends first
    for(let j=i;j<classes.length;j++){
        if(classes[j].Start >= classes[i].End){
            maxSubjects.push(classes[j]);
            // we now start from this class. A greedy approach
            i = j;
        }
    }
    maxSubjects.unshift(classes[0])
    return maxSubjects;
 };

//  Geography 14:00 16:00
//  History 12:00 14:30
//  Arts 14:00 16:30
//  Literature 12:30 13:30
//  German 13:30 15:00
//  console.log(getMaxClassesCount([
//      new Class('Maths','16:00','18:00'),
//      new Class('ComputerScience','12:00','13:00'),
//      new Class('Physics','12:30','14:00'),
//      new Class('Chemistry','14:00','16:30'),
//  ]));

 console.log(getMaxClassesCount([
    new Class('Geography','14:00','16:00'),
    new Class('History','12:00','14:30'),
    new Class('Arts','14:00','16:30'),
    new Class('Literature','12:30','13:30'),
    new Class('German','13:30','15:00'),
]));