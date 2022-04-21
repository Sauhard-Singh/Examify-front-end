const data = {
    testId:'456',
    studentId: '123',
    teacherAssigned: 'teacherId124',
    title: 'Compiler Design CT1',
    totalMcq: 10,
    marks: 8,
    totalMarks: 10,
    question:[
        {
            title: 'This is a Question',
            mcqType: false,
            marks: 1,
            answered: [0],
            mcqQuestions:[
                {mcqTitle: 'This is a Option',answer: false},
                {mcqTitle: 'This is a Option 2',answer: true},
                {mcqTitle: 'This is a Option 2',answer: false},
                {mcqTitle: 'This is a Option 2',answer: false},
            ],
        },
        {
            title: 'This is a Question 2',
            mcqType: false,
            marks: 1,
            answered: [2],
            mcqQuestions:[
                {mcqTitle: 'This is a Option',answer: false},
                {mcqTitle: 'This is a Option 2',answer: false},
                {mcqTitle: 'This is a Option 2',answer: true},
                {mcqTitle: 'This is a Option 2',answer: false},
            ],
        },
        {
            title: 'This is a Question 3',
            mcqType: true,
            marks: 1,
            answered: [1,2],
            mcqQuestions:[
                {mcqTitle: 'This is a Option',answer: false},
                {mcqTitle: 'This is a Option 2',answer: true},
                {mcqTitle: 'This is a Option 2',answer: true},
                {mcqTitle: 'This is a Option 2',answer: false},
            ],
        },
        {
            title: 'This is a Question 4',
            mcqType: true,
            marks: 1,
            answered:[2,3],
            mcqQuestions:[
                {mcqTitle: 'This is a Option',answer: true},
                {mcqTitle: 'This is a Option 2',answer: true},
                {mcqTitle: 'This is a Option 2',answer: true},
                {mcqTitle: 'This is a Option 2',answer: false},
            ],
        }
    ],
};

export default data;
