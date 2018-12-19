var mongoose = require('mongoose');
var User= require('../models/user');
var Challenge = require('../models/problems')
const bcrypt = require('bcryptjs');
var userData = [
    {
        username: 'nouman',
        firstname: 'Nouman',
        lastname: 'Ahmed',
        email: 'nahmed.bese16seecs@seecs.edu.pk',
        points: 0,
        EasyPoints: 0,
        MediumPoints: 0,
        HardPoints: 0,
        password: 'nouman',
        country: {name: 'Pakistan', imgurl: 'http://www.sciencekids.co.nz/images/pictures/flags96/Pakistan.jpg'}
    },
    {
        username: 'zara',
        firstname: 'Zahra',
        lastname: 'Hussain',
        email: 'khussain.bese16seecs@seecs.edu.pk',
        points: 0,
        EasyPoints: 0,
        MediumPoints: 0,
        HardPoints: 0,
        password: 'zara',
        country: {name: 'America', imgurl: 'http://www.sciencekids.co.nz/images/pictures/flags96/United_States.jpg'}
    },
    {
        username: 'talha',
        firstname: 'Talha',
        lastname: 'Abbas',
        email: 'mabbas.bese16seecs@seecs.edu.pk',
        points: 0,
        EasyPoints: 0,
        MediumPoints: 0,
        HardPoints: 0,
        password: 'talha',
        country: {name: 'America', imgurl: 'http://www.sciencekids.co.nz/images/pictures/flags96/United_States.jpg'}
    },
    {
        username: 'nosherwan',
        firstname: 'Nosherwan',
        lastname: 'Akram',
        email: 'nakram.bese16seecs@seecs.edu.pk',
        points: 0,
        EasyPoints: 0,
        MediumPoints: 0,
        HardPoints: 0,
        password: 'nosherwan',
        country: {name: 'India', imgurl: 'http://www.sciencekids.co.nz/images/pictures/flags96/India.jpg'},
    },
    {
        username: 'hibba',
        firstname: 'Hibba',
        lastname: 'Fatima',
        email: 'hfatima.bese16seecs@seecs.edu.pk',
        points: 0,
        EasyPoints: 0,
        MediumPoints: 0,
        HardPoints: 0,
        password: 'hibba',
        country: {name: 'Pakistan', imgurl: 'http://www.sciencekids.co.nz/images/pictures/flags96/Pakistan.jpg'}
    },
    {
        username: 'sadia',
        firstname: 'Sadia',
        lastname: 'Naseer',
        email: 'snaseer.bese16seecs@seecs.edu.pk',
        points: 0,
        EasyPoints: 0,
        MediumPoints: 0,
        HardPoints: 0,
        password: 'sadia',
        country: {name: 'India', imgurl: 'http://www.sciencekids.co.nz/images/pictures/flags96/India.jpg'}
    },
    {
        username: 'hulma',
        firstname: 'Hulma',
        lastname: 'Naseer',
        email: 'hnaseer.bese16seecs@seecs.edu.pk',
        points: 0,
        EasyPoints: 0,
        MediumPoints: 0,
        HardPoints: 0,
        password: 'hulma',
        country: {name: 'Pakistan', imgurl: 'http://www.sciencekids.co.nz/images/pictures/flags96/Pakistan.jpg'}
    }
];

var challengeData = [
    {
        title : "Say 'Hello, World' with Python", 
        description : "<p><strong style='color:#f2bb13'>Program Description:</strong></p><p>Simply print 'Hello, World' to the console</p>", 
        testcases : [ "", "" ],
        output : [ "Hello, World", "Hello, World" ], 
        points : 3,
        category: 'Easy'
    },
    {
        title : "Simple Sum", 
        description : "<p><strong style='color:#f2bb13'>Program Description:</strong></p><p>Write a program that calculates the sum of two integers.</p><p>Input two integers and print the sum of those integers on the screen.</p>", 
        testcases : [ "1\n2", "2\n3" ],
        output : [ "3\n", "5\n" ], 
        points : 3,
        category: 'Easy'
    },
    {
        title : "Simple Difference", 
        description : "<p><strong style='color:#f2bb13'>Program Description:</strong></p><p>Write a program that calculates the difference of two integers.</p><p>Input two integers and print the difference of those integers on the screen.</p>", 
        testcases : [ "1\n2", "2\n3" ],
        output : [ "-1\n", "-1\n" ], 
        points : 3,
        category: 'Easy'
    },
    {
        title : "Simple Division", 
        description : "<p><strong style='color:#f2bb13'>Program Description:</strong></p><p>Input two integers and print two lines. The first line should contain integer division, <em> a </em> // <em> b </em>. The second line should contain float division, <em> a </em> / <em> b </em>.</p><p>You don't need to perform any rounding or formatting operations.</p>", 
        testcases : [ "3\n2", "5\n2" ],
        output : [ "1\n1.5\n", "2\n2.5\n" ], 
        points : 3,
        category: 'Easy'
    },
    {
        title : "Simple Product", 
        description : "<p><strong style='color:#f2bb13'>Program Description:</strong></p><p>Write a program that calculates the product of two integers.</p><p>Input two integers and print the product of those integers on the screen.</p>", 
        testcases : [ "1\n2", "2\n3" ],
        output : [ "2\n", "6\n" ], 
        points : 3,
        category: 'Easy'
    },
    {
        title : "Simple Exponent", 
        description : "<p><strong style='color:#f2bb13'>Program Description:</strong></p><p>Write a program that calculates the exponent of one integer with respect to the other.</p><p>Input two integers and print the exponent of first integer to the power of second integer on the screen.</p>", 
        testcases : [ "2\n10", "4\n3" ],
        output : [ "1024\n", "64\n" ], 
        points : 3,
        category: 'Easy'
    },
    {
        title : "Simple Modulus", 
        description : "<p><strong style='color:#f2bb13'>Program Description:</strong></p><p>Write a program that calculates the modules of one integer when divided by another one.</p><p>Input two integers and print the the remainder when first integer is divided by the second one on the screen.</p>", 
        testcases : [ "11\n2", "109\n11" ],
        output : [ "1\n", "10\n" ], 
        points : 3,
        category: 'Easy'
    },
    {
        title : "If, else", 
        description : "<p><strong style='color:#f2bb13'>Program Description:</strong></p><p>Input an integer, <em> n </em>, perform the following conditional actions:</p><ol><li>If <em> n </em> is odd, print Weird</li><li>If <em> n </em> is even and in the inclusive range of 2 to 5, print Not Weird</li><li>If <em> n </em> is even and in the inclusive range of 6 to 20, print Weird</li><li>If <em> n </em> is even and greater than 20, print Not Weird</li></ol>", 
        testcases : [ "3\n", "24\n" ],
        output : [ "Weird\n", "Not Weird\n" ], 
        points : 5,
        category: 'Medium'
    },
    {
        title : "Loops", 
        description : "<p><strong style='color:#f2bb13'>Program Description:</strong></p><p>Input an integer <em> N </em>. For all non-negative integers <em> i </em> &lt; <em> N </em>, print <em> i<sup>2</sup> </em</p>", 
        testcases : [ "5", "3" ],
        output : [ "0\n1\n4\n9\n16\n", "0\n1\n4\n" ], 
        points : 5,
        category: 'Medium'
    },
    {
        title : "sWAP cASE", 
        description : "<p><strong style='color:#f2bb13'>Program Description:</strong></p><p>Your task is to input a string and swap cases. In other words, convert all lowercase letters to uppercase letters and vice versa.</p>", 
        testcases : [ "'Www.HackerRank.com'\n", "'Pythonist'\n" ],
        output : [ "wWW.hACKERrANK.COM\n", "pYTHONIST\n" ], 
        points : 5,
        category: 'Medium'
    },
    {
        title : "Simple Array Sum", 
        description : "<p><strong style='color:#f2bb13'>Program Description:</strong></p><p>Write a program that calculates the sum of integers in an array.</p><p>Write a program that first takes as input the length of an array. Then, take inputs from the user equal to the length of the array. Lastly, calculate the sum of the array and print it on the screen.</p>", 
        testcases : [ "2\n2\n3", "2\n3\n3" ],
        output : [ "5\n", "6\n" ], 
        points : 5,
        category: 'Medium'
    },
    {
        title : "Plus Minus", 
        description : "<p><strong style='color:#f2bb13'>Program Description:</strong></p><p>Write a program that calculates the fraction of plus, minus and zeros in an array.</p><p>Given an array of integers, calculate the fractions of its elements that are positive, negative, and are zeros. Print the decimal value of each fraction on a new line.</p><p>That is, first take input the length of the array and take that many inputs from the user using a loop. After that, calculate the fraction of plus, minus and zeros in that array. Print them in separate lines.", 
        testcases : [ "5\n1\n1\n0\n-1\n-1", "6\n-4\n3\n-9\n0\n4\n1 " ],
        output : [ "0.400000\n0.400000\n0.200000\n",  "0.500000\n0.333333\n0.166667" ], 
        points : 5,
        category: 'Medium'
    },
    {
        title : "Time Conversion", 
        description : "<p><strong style='color:#f2bb13'>Program Description:</strong></p><p>Write a program that converts a time given in 12-hour AM/PM format to military (24-hour) time.</p><p> Note: Midnight is 12:00:00AM on a 12-hour clock, and 00:00:00 on a 24-hour clock. Noon is 12:00:00PM on a 12-hour clock, and 12:00:00 on a 24-hour clock.</p><p>Take input the time in 12-hour AM/PM format i.e, 07:05:45PM and convert it into military (24-hour) format i.e, 19:05:45 and print it onto the screen.", 
        testcases : [ "'07:05:45PM'\n", "'11:59:59AM'\n" ],
        output : [ "19:05:45\n",    "11:59:59\n" ], 
        points : 5,
        category: 'Medium'
    },
    {
        title : "Find Angle MBC", 
        description : "<p><strong style='color:#f2bb13'>Program Description:</strong></p><img src='https://s3.amazonaws.com/hr-challenge-images/9668/1440151155-10b2b748ee-rsz_1438840048-2cf71ed69d-findangle.png'><p><em>ABC</em> is a right triangle, 90<sup>o</sup> at <em>B</em>.</p><p>Therefore, <em>angle ABC = 90<sup>o</sup></em><p>Point M is the midpoint of hypotenuse AC</p><p>You are given lengths of AB and BC</p><p> Your task is to find <em> angle MBC </em> (angle <em>0<sup>o</sup></em>, as shown in the figure in degrees</p><p>Take input both sides in separate lines. First line for side AB and second for BC. Print the <em>angle MBC </em> in degrees.", 
        testcases : [ "10\n10\n", "1\n10\n" ],
        output : [ "45\n",    "6\n" ], 
        points : 7,
        category: 'Hard'
    },

    {
        title : "Staircase", 
        description : "<p><strong style='color:#f2bb13'>Program Description:</strong></p><p>Write a program that creates a staircase using '#' symbols</p>Take input an integer and generate a staircase of length and base equal to that input using '#' symbols and the output should be right aligned</p><p>If the input is 4 then the output should be:</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</p><p>&nbsp;&nbsp;&nbsp;&nbsp;##</p><p>&nbsp;&nbsp;###</p><p>####</p>",
        testcases : [ "3\n", "5\n" ],
        output : [ "  #\n ##\n###",    "    #\n   ##\n  ###\n ####\n#####" ], 
        points : 7,
        category: 'Hard'
    },
    {
        title : "Leap Year or Not", 
        description : "<p><strong style='color:#f2bb13'>Program Description:</strong></p><p>Write a program that determines whether a year is a leap year or not.</p><p>Take input an year and check whether its a leap year or not</p><p>For a year to be leap year, following criteria should be met:</p><ul><li>The year can be evenly divided by 4, is a leap year, unless:<ul type='disc'><li>The year can be evenly divided by 100, it is NOT a leap year, unless:<ul><li>The year is also evenly divisible by 400. Then it is a leap year.</></ul></li></ul></li></ul></p><p>This means that in the Gregorian calendar, the years 2000 and 2400 are leap years, while 1800, 1900, 2100, 2200, 2300 and 2500 are NOT leap years<p>Your output should be True if its a leap year and False if its not a leap year.</p>",
        testcases : [ "1900\n", "2400\n" ],
        output : [ "False", "True" ], 
        points : 7,
        category: 'Hard'
    },
    {
        title : "Valid Credit Card or Not", 
        description : "<p><strong style='color:#f2bb13'>Program Description:</strong></p><p>Write a program that determines whether a credit card from ABCD bank is valid or not.</p><p>Take input an credit card number and validate it. Following conditions must be met in order to verify a credit card number:</p><ul type='disc'><li>It must start with a 4, 5 or 6.</li><li> It must contain exactly 16 digits.</li><li>It must only consist of digits (0-9).</li><li>It may have digits in groups of 4, separated by one hyphen '-'. </li><li> It must NOT use any other separator like ' ' , '_', etc. </li><li> It must NOT have 4 or more consecutive repeated digits.</li>",
        testcases : [ "1900\n", "2400\n" ],
        output : [ "False", "True" ], 
        points : 7,
        category: 'Hard'
    },
    {
        title : "Words Score", 
        description : "<p><strong style='color:#f2bb13'>Program Description:</strong></p><p>Write a program that calculates the score based on the number of vowels a word has.</p><p>Take input an integer which is the length of the array</p><p>Then take inputs equal to the length using a loop.</p><p>The score of a single word is 2 if it contains even number of vowels and 1 otherwise. The total score is the sum of all the scores of the words in the array.</p>",
        testcases : [ "3\n'Programming'\n'is'\n'awesome'\n", "2\n'hacker'\n'book'\n" ],
        output : [ "4\n", "4\n" ], 
        points : 7,
        category: 'Hard'
    },
    {
        title : "Find the runner-up", 
        description : "<p><strong style='color:#f2bb13'>Program Description:</strong></p><p>Given the participants' score sheet for your University Sports Day, you are required to find the runner-up score. You are given scores. Store them in a list and find the score of the runner-up.</p><p>In the first line, take input the length of the array. Then using a loop input those numbers of integers and append it to an array. Then calculate the second maximum score in the array and print it on to the console</p>",
        testcases : [ "5\n3\n2\n6\n6\n5\n", "4\n52\n52\n-52\n52\n" ],
        output : [ "5\n", "-52\n" ], 
        points : 7,
        category: 'Hard'
    },
    {
        title : "Nested Lists", 
        description : "<p><strong style='color:#f2bb13'>Program Description:</strong></p><p>Given the names and grades for each student in a Physics class of N students, store them in a nested list and print the name(s) of any student(s) having the second lowest grade.</p><p>The first line contains an integer, <em>N</em> , the number of students. The <em>2N</em> subsequent lines describe each student over 2 lines; the first line contains a student's name, and the second line contains their grade.</p>",
        testcases : [ "5\n'Harry'\n37.21\n'Berry'\n37.21\n'Tina'\n37.2\n'Akriti'\n41\n'Harsh'\n39\n", "4\n'Prashant'\n32\n'Pallavi'\n36\n'Dheeraj'\n39\n'Shivam'\n40\n" ],
        output : [ "Berry\nHarry\n", "Pallavi\n" ], 
        points : 7,
        category: 'Hard'
    },

]

function seedDB(){
    User.find({})
    .exec()
    .then(users => {
        if(users.length >= 1) {
            return;
        } else {
            User.deleteMany({}, err => {
                if(err) {
                    console.log(err);
                } else {
                    console.log('removed all users');
                    userData.forEach(function(seed) {
                        bcrypt.hash(seed.password, 10, (err,hash) => {
                            if(err) {
                               console.log(err);
                            } else {
                                const newUser = new User({
                                    _id: new mongoose.Types.ObjectId(),
                                    username:     seed.username,
                                    firstname:    seed.firstname,
                                    lastname:     seed.lastname,
                                    email:        seed.email,
                                    password:     hash,
                                    points:       seed.points,
                                    country:      seed.country,
                                    EasyPoints:   seed.EasyPoints,
                                    MediumPoints: seed.MediumPoints,
                                    HardPoints:   seed.HardPoints
                                });
                                newUser
                                .save()
                                .then(result => {
                                    console.log(result);
                                
                                })
                                .catch(err => {
                                    console.log(err);  
                                }); 
                            }                   
                        })  
                    })
                }
            });
        }
    })
    Challenge.find({})
    .exec()
    .then(challenges => {
        if(challenges.length >= 1) {
            return;
        } else {
            Challenge.deleteMany({}, err => {
                if(err) {
                    console.log(err);
                } else {
                    console.log('removed all challengess');
                    challengeData.forEach(function(seed) {
                        if(err) {
                            console.log(err);
                        } else {
                            const newChallenge = new Challenge({
                                _id:           new mongoose.Types.ObjectId(),
                                title:         seed.title,
                                description:   seed.description,
                                testcases:     seed.testcases,
                                points:        seed.points,
                                output:        seed.output,
                                category:      seed.category
                            });
                            newChallenge
                            .save()
                            .then(result => {
                                console.log(result);
                            
                            })
                            .catch(err => {
                                console.log(err);  
                            }); 
                        }                   
                    })  
                }
            });
        }
    })
}

module.exports = seedDB;